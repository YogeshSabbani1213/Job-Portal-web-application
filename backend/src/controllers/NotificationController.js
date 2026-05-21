import notificationModel from "../models/NotificationModel.js";

export const getMyNotifications = async (req, res) => {
    try {
        const notifications = await notificationModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            notifications
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}