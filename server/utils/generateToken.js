import jwt from "jsonwebtoken";

 const generateToken = (user) =>{
  jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.jwt_secret,{expiresIn:"1d"})
}

export default generateToken;