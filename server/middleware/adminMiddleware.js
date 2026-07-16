export const adminOnly = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, user authentication required",
      })
    }
  
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden, administrator access required",
      })
    }
  
    next()
  }