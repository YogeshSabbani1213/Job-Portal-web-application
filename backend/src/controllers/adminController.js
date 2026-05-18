import userModel from "../models/userModel.js";
import jobModel from "../models/jobModel.js";
import applicationModel from "../models/applicationModel.js";

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