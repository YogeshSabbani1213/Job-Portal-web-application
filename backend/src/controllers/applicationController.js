import applicationModel from "../models/ApplicationModel.js";
import notificationModel from '../models/NotificationModel.js';
import jobModel from '../models/JobModel.js';

export async function ApplyJob(req, res) {
  try {
    const { jobId } = req.body;

    // Check if resume is uploaded
    if (!req.file.path) {
      return res.status(400).json({
        message: "Resume is required"
      });
    }
    const existingApplication = await applicationModel.findOne({
      job: jobId,
      applicant: req.user._id,
    })
    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for the Job' })
    }
    const appliedJob = await applicationModel.create({
      job: jobId,
      applicant: req.user._id,
      resumeURL: req.file.path 
    })
    await appliedJob.populate("applicant", "fullname email")
    const job = await jobModel.findById(jobId);

    await notificationModel.create({
      user: job.createdBy,
      message: `New application received for ${job.title}`
    });

    return res.status(200).json({ message: 'Applied Successfully', appliedJob })
  }
  catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

// Get all applications for a job (Recruiter)
export const getjobApplications = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const jobId = req.params.jobId;
    // Find the job
    const job = await jobModel.findById(jobId);
    // Check if job exists
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    // Verify recruiter owns this job
    if (job.createdBy.toString() !== recruiterId) {
      return res.status(403).json({
        success: false,
        message: 'You can only view applications for your own jobs'
      });
    }

    // Get applications
    const applications = await applicationModel
      .find({ job: jobId })
      .populate('applicant', 'fullname email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalApplications: applications.length,
      applications
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

//Get jobs applied by a user
export async function getMyApplications(req, res) {
  try {
    const applications = await applicationModel.find({ applicant: req.user._id }).populate("job", "jobtitle companyname location")
    return res.status(200).json(applications);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Update application status (Recruiter)
export const updateApplicationStatus = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const applicationId = req.params.applicationId;
    const { status } = req.body;
    const allowedStatuses = ['pending', 'shortlisted', 'rejected', 'hired'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const application = await applicationModel
      .findById(applicationId)
      .populate('job');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    if (!application.job) {
      return res.status(404).json({
        success: false,
        message: 'Related job not found'
      });
    }

    if (application.job.createdBy.toString() !== recruiterId) {
      return res.status(403).json({
        success: false,
        message: 'You can only update applications for your own jobs'
      });
    }

    application.status = status;
    await application.save();
    await notificationModel.create({
      user: application.applicant,
      message: `Your application status was updated to ${status}`
    });
    return res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      application
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
}

export const withdrawApplication = async (req, res) => {
  try {

    const application = await applicationModel.findById(req.params.applicationId);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    if (application.applicant.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    await application.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Application withdrawn successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const shortlistCandidate = async (req, res) => {
  try {

    const application = await applicationModel
      .findById(req.params.applicationId)
      .populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    application.status = "shortlisted";

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Candidate shortlisted"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const rejectCandidate = async (req, res) => {
  try {

    const application = await applicationModel
      .findById(req.params.applicationId)
      .populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });
    }

    if (application.job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    application.status = "rejected";

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Candidate rejected"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};