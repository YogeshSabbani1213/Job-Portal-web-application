import userModel from "../models/UserModel.js";
import jobModel from "../models/JobModel.js";
import applicationModel from "../models/ApplicationModel.js";

export const getAdminDashboard=async(req,res)=>{
    try{

        const totalUsers=await userModel.countDocuments();

        const totalRecruiters=await userModel.countDocuments({
            role:'recruiter'
        });

        const totalJobSeekers=await userModel.countDocuments({
            role:'job seeker'
        });

        const totalJobs=await jobModel.countDocuments();

        const totalApplications=await applicationModel.countDocuments();

        res.status(200).json({
            success:true,
            dashboard:{
                totalUsers,
                totalRecruiters,
                totalJobSeekers,
                totalJobs,
                totalApplications
            }
        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:'Server Error'
        });
    }
}