export const success = (res, data, message = "Success") => {
    return res.json({ success: true, data, message });
};

export const error = (res,message,code=500)=>{
    return res.status(code).json({success:false,message})
}