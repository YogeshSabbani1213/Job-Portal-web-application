import jobModel from '../models/JobModel.js';
import applicationModel from '../models/ApplicationModel.js';

export const getRecruiterDashboard = async (req, res) => {
    try {
        // Logged in recruiter id
        const recruiterId = req.user.id;

        // Find jobs created by recruiter
        const jobs = await jobModel.find({ createdBy: recruiterId });
        const jobIds = jobs.map(job => job._id);

        // Find applications for those jobs
        const applications = await applicationModel.find({job: { $in: jobIds }});

        // Counts
        const totalJobs = jobs.length;
        const totalApplications = applications.length;

        const pending = applications.filter(app => app.status === 'pending').length;

        const shortlisted = applications.filter(app => app.status === 'shortlisted').length;

        const rejected = applications.filter(app => app.status === 'rejected').length;

        return res.status(200).json({
            success: true,
            dashboard: {
                totalJobs,
                totalApplications,
                pending,
                shortlisted,
                rejected
            }
        });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const getRecruiterJobs = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const jobs = await jobModel
            .find({ createdBy: recruiterId })
            .sort({ createdAt: -1 });
        const jobsWithCounts = await Promise.all(
            jobs.map(async (job) => {
                const applicationsCount =
                    await applicationModel.countDocuments({
                        job: job._id
                    });
                return {
                    ...job._doc,
                    applicationsCount
                };
            })
        );

        return res.status(200).json({
            success: true,
            totalJobs: jobs.length,
            jobs: jobsWithCounts
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const deleteRecruiterJob = async (req, res) => {
    try {

        const recruiterId = req.user.id;
        const jobId = req.params.id;

        // Find job
        const job = await jobModel.findById(jobId);

        // Check job exists
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        // Check ownership
        if (job.createdBy.toString() !== recruiterId) {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own jobs'
            });
        }

        // Delete related applications first (recommended)
        await applicationModel.deleteMany({
            job: jobId
        });

        // Delete job
        await job.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Job deleted successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

export const updateRecruiterJob=async(req,res)=>{
    try{

        const recruiterId=req.user.id;
        const jobId=req.params.id;

        const {
            title,
            company,
            location,
            salary,
            description,
            requirements
        }=req.body;

        const job=await jobModel.findById(jobId);

        if(!job){
            return res.status(404).json({
                success:false,
                message:'Job not found'
            });
        }

        if(job.createdBy.toString()!==recruiterId){
            return res.status(403).json({
                success:false,
                message:'You can only update your own jobs'
            });
        }

        job.title=title || job.title;
        job.company=company || job.company;
        job.location=location || job.location;
        job.salary=salary || job.salary;
        job.description=description || job.description;
        job.requirements=requirements || job.requirements;

        await job.save();

        res.status(200).json({
            success:true,
            message:'Job updated successfully',
            job
        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:'Server Error'
        });
    }
}