import NotificationModel from "../models/NotificationModel.js"
export async function getMyNotifications(req,res){
    try{
        const notifications = await NotificationModel.find({
            user:req.user._id //Give me all notifications that belong to THIS user
            .populate("user","fullname email role")
        }).sort({createdAt:-1});
        return res.status(200).json(notifications)
    }
    catch(error){
        return res.status(500).json({error:error.messsage})
    }
}