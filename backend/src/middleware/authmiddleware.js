import userModel from "../models/UserModel.js"
import jwt from 'jsonwebtoken'

export function verifyToken(req,res,next){
    if(req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0]==='Bearer'){
        jwt.verify(req.headers.authorization.split(" ")[1],process.env.JWT_SECRETKEY,(err,verifiedToken)=>{
            if(err){
                return res.status(400).json({message:'Invalid Token'})
            }
            else{
                userModel.findById(verifiedToken._id)
                .then((user)=>{
                    if(!user){
                        return res.status(400).json({message:'user not found'});
                    }
                    req.user=user;
                    console.log(req.user);
                    
                    next()
                })
                .catch((error)=>{
                    return res.status(400).json({error:error.message})
                })
            }
        })
    }
    else{
        return res.status(400).json({ "message": "Please Login" })
    }
}