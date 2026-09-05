import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    totalJobs: 0,
    totalApplications: 0,
    shortlisted: 0,
    rejected: 0,
  });
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const dashboardRes = await api.get("/recruiter/dashboard");

      const jobsRes = await api.get("/recruiter/myjobs");
      console.log("dashboardRes:", dashboardRes);

      setDashboard(dashboardRes.data.dashboard);
      console.log(dashboard);

      setJobs(jobsRes.data.jobs);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const deleteJob = async (jobId) => {
    try {
      const confirmDelete = window.confirm("Delete this job ?");

      if (!confirmDelete) return;

      const res = await api.delete(`/recruiter/deletejob/${jobId}`);

      toast.success(res.data.message);

      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.log(error);

      toast.error("Failed to delete job");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold">Loading...</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-5 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Jobs</p>
              <h2 className="text-3xl font-bold">{dashboard.totalJobs}</h2>
            </div>

            <FaBriefcase className="text-3xl text-blue-500" />
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Applications</p>
              <h2 className="text-3xl font-bold">
                {dashboard.totalApplications}
              </h2>
            </div>

            <FaUsers className="text-3xl text-purple-500" />
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Shortlisted</p>
              <h2 className="text-3xl font-bold">{dashboard.shortlisted}</h2>
            </div>

            <FaCheckCircle className="text-3xl text-green-500" />
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Rejected</p>
              <h2 className="text-3xl font-bold">{dashboard.rejected}</h2>
            </div>

            <FaTimesCircle className="text-3xl text-red-500" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-5 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-5">My Jobs</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Job</th>

              <th className="p-3">Location</th>

              <th className="p-3">Salary</th>

              <th className="p-3">Applications</th>

              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-b">
                <td className="p-3">{job.jobtitle}</td>

                <td className="p-3">{job.location}</td>

                <td className="p-3">₹{job.salary}</td>

                <td className="p-3">{job.applicationsCount}</td>

                <td className="p-3 flex gap-3">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteJob(job._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => navigate(`/recruiter/applicants/${job._id}`)}
                  >
                    Applicants
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
