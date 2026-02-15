export const sucess = (res,data, message="Sucess")=>{
    res.json({success:true,message,data})
};

export const error = (res,message,code=500)=>{
    res.status(code).json({success:false,message})
}