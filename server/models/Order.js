import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
    },
    
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    shippingAddress: {
      type: String,
      required: true,
      trim: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid", "Failed", "Refunded"],
      default: "Unpaid",
    },
    
    paymentMethod: {
      type: String,
      default: "Stripe",
    },
    
    stripeCheckoutSessionId: {
      type: String,
      default: null,
    },
    
    stripePaymentIntentId: {
      type: String,
      default: null,
    },
    
    paymentFailureMessage: {
      type: String,
      default: null,
    },
    
    paidAt: {
      type: Date,
      default: null,
    },
    
    emailConfirmationSent: {
      type: Boolean,
      default: false,
    },
    
    emailConfirmationSentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Order", orderSchema)