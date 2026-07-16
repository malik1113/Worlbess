import mongoose from "mongoose"
import Order from "../models/Order.js"
import Product from "../models/Product.js"

export const createOrder = async (req, res) => {
  const session = await mongoose.startSession()

  try {
    const {
      customerName,
      email,
      phone,
      shippingAddress,
      items,
    } = req.body

    if (
      !customerName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !shippingAddress?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all customer and shipping information.",
      })
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The order must contain at least one product.",
      })
    }

    let createdOrder

    await session.withTransaction(async () => {
      const orderItems = []
      let orderTotal = 0

      for (const item of items) {
        const productId = item.product || item._id
        const quantity = Number(item.quantity)

        if (
          !mongoose.Types.ObjectId.isValid(productId) ||
          !Number.isInteger(quantity) ||
          quantity < 1
        ) {
          const error = new Error("The order contains an invalid product.")
          error.statusCode = 400
          throw error
        }

        const product = await Product.findOneAndUpdate(
          {
            _id: productId,
            stock: { $gte: quantity },
          },
          {
            $inc: { stock: -quantity },
          },
          {
            new: true,
            session,
          }
        )

        if (!product) {
          const existingProduct = await Product.findById(productId).session(
            session
          )

          const error = new Error(
            existingProduct
              ? `Not enough stock is available for ${existingProduct.name}.`
              : "One of the selected products no longer exists."
          )

          error.statusCode = existingProduct ? 409 : 404
          throw error
        }

        orderItems.push({
          product: product._id,
          name: product.name,
          price: product.price,
          quantity,
        })

        orderTotal += product.price * quantity
      }

      const orders = await Order.create(
        [
          {
            user: req.user._id,
            customerName: customerName.trim(),
            email: email.trim().toLowerCase(),
            phone: phone.trim(),
            shippingAddress: shippingAddress.trim(),
            items: orderItems,
            total: Number(orderTotal.toFixed(2)),
          },
        ],
        { session }
      )

      createdOrder = orders[0]
    })

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order: createdOrder,
    })
  } catch (error) {
    console.error(`Create order failed: ${error.message}`)

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Unable to create the order.",
    })
  } finally {
    await session.endSession()
  }
}
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("user", "name email")
      .populate("items.product", "name image category")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    })
  } catch (error) {
    console.error(`Get customer orders failed: ${error.message}`)

    res.status(500).json({
      success: false,
      message: "Unable to retrieve your orders.",
    })
  }
}
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email role")
      .populate("items.product", "name image category stock")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    })
  } catch (error) {
    console.error(`Get all orders failed: ${error.message}`)

    res.status(500).json({
      success: false,
      message: "Unable to retrieve customer orders.",
    })
  }
}
export const updateOrderStatus = async (req, res) => {
  const session = await mongoose.startSession()

  try {
    const { status } = req.body

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Completed",
      "Cancelled",
    ]

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid order status.",
      })
    }

    let updatedOrder

    await session.withTransaction(async () => {
      const order = await Order.findById(req.params.id).session(session)

      if (!order) {
        const error = new Error("Order not found.")
        error.statusCode = 404
        throw error
      }

      if (order.status === "Completed") {
        const error = new Error("Completed orders cannot be changed.")
        error.statusCode = 409
        throw error
      }

      if (order.status === "Cancelled") {
        const error = new Error("Cancelled orders cannot be changed.")
        error.statusCode = 409
        throw error
      }

      if (order.status === status) {
        updatedOrder = order
        return
      }

      if (status === "Cancelled") {
        for (const item of order.items) {
          await Product.findByIdAndUpdate(
            item.product,
            {
              $inc: { stock: item.quantity },
            },
            { session }
          )
        }
      }

      updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
          $set: { status },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      )
    })

    await updatedOrder.populate("user", "name email role")
    await updatedOrder.populate(
      "items.product",
      "name image category stock"
    )

    res.status(200).json({
      success: true,
      message: `Order status updated to ${updatedOrder.status}.`,
      order: updatedOrder,
    })
  } catch (error) {
    console.error(`Update order status failed: ${error.message}`)

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Unable to update the order status.",
    })
  } finally {
    await session.endSession()
  }
}