export const error = (err,res,next)=>{
    res.status(500).json({message:err.message})
    next();
}