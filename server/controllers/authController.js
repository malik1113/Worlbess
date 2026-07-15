import User from "../models/User.js"
import generateToken from "../utils/generateToken.js"

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      })
    }

    const user = await User.create({
      name,
      email,
      password,
    })

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
} // <-- registerUser ENDS HERE

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    const passwordMatches = await user.comparePassword(password)

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
export const getProfile = async (req, res) => {
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    })
  }