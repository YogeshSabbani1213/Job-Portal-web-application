import jobModel from "../models/JobModel.js";
import NotificationModel from "../models/NotificationModel.js";
import applicationModel from "../models/ApplicationModel.js";

let jobCache = null;
export async function CreateJob(req, res) {
    jobCache = null
    try {
        const { jobtitle, companyname, location, jobtype, description, salary, experiencelevel, skillsrequired } = req.body;
        if (!jobtitle || !companyname || !location || !skillsrequired || !jobtype) {
            return res.status(400).json({ message: 'all the fields must be filled' })
        }
        const job = await jobModel.create({
            jobtitle,
            companyname,
            location,
            jobtype,
            description,
            salary,
            experiencelevel,
            skillsrequired,
            createdBy: req.user._id
        })
        await job.populate("createdBy", "fullname email role")
        return res.status(201).json({ message: 'job created successfully', job })
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const getMyJobs = async (req, res) => {
    try {

        const jobs = await jobModel.find({
            createdBy: req.user.id
        });

        return res.status(200).json({
            success: true,
            jobs
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const updateJob = async (req, res) => {
  try {

    const job = await jobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const updatedJob = await jobModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      updatedJob
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const deleteOwnJob = async (req, res) => {
  try {

    const job = await jobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const closeJob = async (req, res) => {
  try {

    const job = await jobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    job.status = "closed";

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job closed successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const reopenJob = async (req, res) => {
  try {

    const job = await jobModel.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    job.status = "active";

    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job reopened successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export async function getJobs(req, res) {
    try {
        const { keyword, experiencelevel, location, jobtype, minSalary } = req.query
        let query = {};
        if (keyword) {
            query.$or = [
                { jobtitle: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                { skillsrequired: { $in: [keyword] } }
            ]
        }
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }
        if (experiencelevel) {
            query.experiencelevel = { $gte: Number(experiencelevel) };
        }
        if (minSalary) {
            query.salary = { $gte: Number(minSalary) }
        }
        if (jobtype) {
            query.jobtype = jobtype
        }
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 50;
        //page 1:1-10 page2:11-20 page 3:21-30
        const skip = (page - 1) * limit               //Skip first N records
        const totalJobs = await jobModel.countDocuments(query)

        const jobs = await jobModel
            .find(query)
            .skip(skip)         //Skip previous records
            .limit(limit)
            .populate("createdBy", "fullname email")

        return res.status(200).json({
            pageNumber: page,
            limitNumber: limit,
            TotalJobs: totalJobs,
            count: jobs.length,
            jobs
        })

    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
export async function getAllJobs(req, res) {
    try {
        if (jobCache) {
            return res.status(200).json({ source: "cache", jobs: jobCache })
        }
        const jobs = await jobModel.find().populate("createdBy", "fullname email");
        jobCache = jobs;
        return res.status(200).json({ source: "db", jobs: jobs })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function getAllJobsAdmin(req, res) {
    try {
        const jobs = await jobModel.find().populate("createdBy", "fullname email")
        return res.status(200).json({ jobs: jobs })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function deleteAnyJob(req, res) {
    try {
        const job = await jobModel.findById(req.params.id)
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }
        await jobModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Job deleted by admin" })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const recruiterDashboardStats = async (req, res) => {
    try {

        const recruiterId = req.user.id;

        const totalJobs = await jobModel.countDocuments({ createdBy: recruiterId });

        const activeJobs = await jobModel.countDocuments({
            createdBy: recruiterId,
            status: "active"
        });

        const closedJobs = await jobModel.countDocuments({
            createdBy: recruiterId,
            status: "closed"
        });

        const recruiterJobs = await jobModel.find({ createdBy: recruiterId });

        const jobIds = recruiterJobs.map(job => job._id);

        const totalApplications = await applicationModel.countDocuments({
            job: { $in: jobIds }
        });

        const shortlisted = await applicationModel.countDocuments({
            job: { $in: jobIds },
            status: "shortlisted"
        });

        const rejected = await applicationModel.countDocuments({
            job: { $in: jobIds },
            status: "rejected"
        });

        return res.status(200).json({
            success: true,
            stats: {
                totalJobs,
                activeJobs,
                closedJobs,
                totalApplications,
                shortlisted,
                rejected
            }
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

