import jobModel from '../models/jobModel.js';
import applicationModel from '../models/applicationModel.js';

export const getRecruiterDashboard = async (req, res) => {
    try {

        // Logged in recruiter id
        const recruiterId = req.user.id;

        // Find jobs created by recruiter
        const jobs = await jobModel.find({ createdBy: recruiterId });

        const jobIds = jobs.map(job => job._id);

        // Find applications for those jobs
        const applications = await applicationModel.find({
            job: { $in: jobIds }
        });

        // Counts
        const totalJobs = jobs.length;
        const totalApplications = applications.length;

        const pending = applications.filter(
            app => app.status === 'pending'
        ).length;

        const shortlisted = applications.filter(
            app => app.status === 'shortlisted'
        ).length;

        const rejected = applications.filter(
            app => app.status === 'rejected'
        ).length;

        res.status(200).json({
            success: true,
            dashboard: {
                totalJobs,
                totalApplications,
                pending,
                shortlisted,
                rejected
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};