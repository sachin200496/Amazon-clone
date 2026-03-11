import jwt from "jsonwebtoken";

// Accepts either (userId, isAdmin) and returns the signed token
const generateToken = (userId, isAdmin = false) => {
  // Allow either env var name (JWT_SECRET) or legacy jwt_secret
  const secret = process.env.JWT_SECRET || process.env.jwt_secret;
  return jwt.sign({ id: userId, isAdmin }, secret, { expiresIn: "1d" });
};

export default generateToken;