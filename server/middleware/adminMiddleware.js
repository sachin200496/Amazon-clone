export const adminOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ 
      success: false,
      message: "Only admins can access this resource" 
    });
  }
  next();
};