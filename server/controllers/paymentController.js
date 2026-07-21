import Order from "../models/Order.js";
import stripe from "../config/stripe.js";
import { sendOrderConfirmationEmail } from "../services/emailService.js";

const fulfillCheckoutSession = async (sessionId) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return {
      paid: false,
      order: null,
    };
  }

  const orderId = session.metadata?.orderId;

  if (!orderId) {
    throw new Error("Stripe Checkout Session is missing an order ID.");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error(`Order ${orderId} was not found.`);
  }
  order.paymentStatus = "Paid";
  order.paidAt = new Date();
  order.paymentFailureMessage = null;

  if (session.payment_intent) {
    order.stripePaymentIntentId = session.payment_intent;
  }

  await order.save();

  // Stripe can retry webhook deliveries. This makes fulfillment idempotent.
  // Send the order confirmation only once.
  if (!order.emailConfirmationSent) {
    const emailResult = await sendOrderConfirmationEmail(order);

    if (!emailResult.skipped) {
      order.emailConfirmationSent = true;
      order.emailConfirmationSentAt = new Date();

      await order.save();

      console.log(`Order confirmation email sent for order ${order._id}`);
    }
  }

  return {
    paid: true,
    order,
  };
};

export const createCheckoutSession = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to pay for this order",
      });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Cancelled orders cannot be paid",
      });
    }

    if (order.paymentStatus === "Paid") {
      return res.status(400).json({
        success: false,
        message: "This order has already been paid",
      });
    }

    if (!order.items || order.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "This order does not contain any items",
      });
    }

    const lineItems = order.items.map((item) => ({
      price_data: {
        currency: "usd",

        product_data: {
          name: item.name,
        },

        unit_amount: Math.round(item.price * 100),
      },

      quantity: item.quantity,
    }));

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: order.email,
      line_items: lineItems,

      metadata: {
        orderId: order._id.toString(),
        userId: req.user._id.toString(),
      },

      payment_intent_data: {
        metadata: {
          orderId: order._id.toString(),
          userId: req.user._id.toString(),
        },
      },

      success_url:
        `${clientUrl}/payment-success` + "?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: `${clientUrl}/checkout?payment=cancelled`,
    });

    order.stripeCheckoutSessionId = session.id;
    order.paymentStatus = "Unpaid";

    await order.save();

    return res.status(201).json({
      success: true,
      message: "Stripe Checkout Session created successfully",
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Create Checkout Session error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create Stripe Checkout Session",
    });
  }
};

export const stripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return res.status(500).json({
      success: false,
      message: "Webhook secret is not configured",
    });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature error:", error.message);

    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;

        const result = await fulfillCheckoutSession(session.id);

        console.log(`Stripe payment confirmed for session ${session.id}`);

        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          await Order.findByIdAndUpdate(orderId, {
            paymentStatus: "Failed",
            stripeCheckoutSessionId: session.id,
            paymentFailureMessage: "Stripe reported that the payment failed.",
          });
        }

        console.log(`Stripe payment failed for session ${session.id}`);

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata?.orderId;

        if (orderId) {
          await Order.findByIdAndUpdate(orderId, {
            paymentStatus: "Failed",
            stripePaymentIntentId: paymentIntent.id,
            paymentFailureMessage:
              paymentIntent.last_payment_error?.message ||
              "The payment was unsuccessful.",
          });
        }

        console.log(`Stripe PaymentIntent failed: ${paymentIntent.id}`);

        break;
      }

      default:
        console.log(`Unhandled Stripe event: ${event.type}`);
    }

    return res.status(200).json({
      received: true,
    });
  } catch (error) {
    console.error("Stripe webhook processing error:", error);

    return res.status(500).json({
      received: false,
      message: "Webhook processing failed",
    });
  }
};

export const verifyCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Checkout Session ID is required",
      });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const sessionUserId = session.metadata?.userId;
    const orderId = session.metadata?.orderId;

    if (!sessionUserId || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Stripe Session metadata is incomplete",
      });
    }

    if (sessionUserId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this payment",
      });
    }

    const result = await fulfillCheckoutSession(sessionId);

    if (!result.paid) {
      return res.status(200).json({
        success: true,
        paid: false,
        message: "Payment has not been confirmed",
      });
    }

    return res.status(200).json({
      success: true,
      paid: true,
      message: "Payment confirmed",
      order: {
        _id: result.order._id,
        customerName: result.order.customerName,
        email: result.order.email,
        total: result.order.total,
        paymentStatus: result.order.paymentStatus,
        paidAt: result.order.paidAt,
        itemCount: result.order.items.reduce(
          (total, item) => total + item.quantity,
          0
        ),
      },
    });
  } catch (error) {
    console.error("Stripe webhook processing error:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });

    return res.status(500).json({
      received: false,
      message: error.message,
    });
  }
};
