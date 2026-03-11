import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    // Try to get token from cookies first, then from Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ success: false, message: "No token found" });
    }
    
    const secret = process.env.JWT_SECRET || process.env.jwt_secret;
    req.user = jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};