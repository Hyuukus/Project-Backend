const errorHandler=(err,req,res,next)=>{
    console.error(err.message);

    res.status(200).json({
        status:'error!',
        message:err.message
    });

}
module.exports=errorHandler;