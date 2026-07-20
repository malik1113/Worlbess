import { getResendClient } from "../config/resend.js"

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

function buildOrderItemsHtml(items) {
  return items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #333;">
            ${item.name}
          </td>

          <td style="padding: 12px; border-bottom: 1px solid #333; text-align: center;">
            ${item.quantity}
          </td>

          <td style="padding: 12px; border-bottom: 1px solid #333; text-align: right;">
            ${formatCurrency(item.price * item.quantity)}
          </td>
        </tr>
      `
    )
    .join("")
}

export async function sendOrderConfirmationEmail(order) {
    if (!resend) {
        console.warn(
          "Order confirmation email skipped: Resend client is unavailable."
        )

    return {
      skipped: true,
    }
  }

  const fromEmail =
    process.env.ORDER_EMAIL_FROM ||
    "Worlbess Orders <onboarding@resend.dev>"

  const orderNumber = order._id.toString().slice(-8).toUpperCase()

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: order.email,
    subject: `Worlbess Order Confirmation #${orderNumber}`,

    html: `
      <div style="margin: 0; padding: 32px; background-color: #0a0a0a; color: #ffffff; font-family: Arial, sans-serif;">
        <div style="max-width: 640px; margin: 0 auto; background-color: #111111; border: 1px solid #333333; border-radius: 16px; overflow: hidden;">
          <div style="padding: 32px; border-bottom: 1px solid #333333;">
            <p style="margin: 0 0 8px; color: #eab308; letter-spacing: 3px; font-size: 12px;">
              WORLBESS
            </p>

            <h1 style="margin: 0; font-size: 28px;">
              Thank you for your order
            </h1>
          </div>

          <div style="padding: 32px;">
            <p>Hello ${order.customerName},</p>

            <p style="color: #cccccc; line-height: 1.6;">
              Your payment has been confirmed. We are preparing your order
              and will update you when its status changes.
            </p>

            <p>
              <strong>Order number:</strong> #${orderNumber}
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
              <thead>
                <tr>
                  <th style="padding: 12px; text-align: left; border-bottom: 1px solid #555;">
                    Product
                  </th>

                  <th style="padding: 12px; text-align: center; border-bottom: 1px solid #555;">
                    Quantity
                  </th>

                  <th style="padding: 12px; text-align: right; border-bottom: 1px solid #555;">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody>
                ${buildOrderItemsHtml(order.items)}
              </tbody>
            </table>

            <p style="margin-top: 24px; font-size: 20px; text-align: right;">
              <strong>Total: ${formatCurrency(order.total)}</strong>
            </p>

            <div style="margin-top: 32px; padding: 20px; background-color: #1a1a1a; border-radius: 12px;">
              <p style="margin-top: 0;">
                <strong>Shipping address</strong>
              </p>

              <p style="margin-bottom: 0; color: #cccccc; line-height: 1.6;">
                ${order.shippingAddress}
              </p>
            </div>

            <p style="margin-top: 32px; color: #999999; font-size: 14px;">
              This message confirms your payment and order details.
            </p>
          </div>
        </div>
      </div>
    `,
  })

  if (error) {
    throw new Error(
      error.message || "Unable to send the order confirmation email."
    )
  }

  return {
    skipped: false,
    emailId: data?.id || null,
  }
}
// Builds a branded HTML receipt.
//Skips sending safely when the API key is missing.
//Throws an error when Resend reports a delivery problem.