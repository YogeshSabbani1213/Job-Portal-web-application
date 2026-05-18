import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    }
)
// const NotificationModel =  mongoose.model('Notification',notificationSchema);
// export default NotificationModel

export default mongoose.models.Notification || mongoose.model("Notification", notificationSchema);