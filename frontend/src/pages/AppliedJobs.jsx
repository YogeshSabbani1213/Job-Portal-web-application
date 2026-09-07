import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { MapPin, Building2, CircleCheckBig } from "lucide-react";

const AppliedJobs = () => {
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function gettingAppliedJobs() {
      try {
        const { data } = await API.get("/application/getmyapplications");

        console.log(data);
        setAppliedJobs(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    gettingAppliedJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>

        {/* Text */}
        <h2 className="mt-5 text-xl font-semibold text-gray-800">
          Loading Applications...
        </h2>

        <p className="mt-2 text-gray-500">
          Please wait while we fetch your applications
        </p>
      </div>
    );
  }

  const withdrawApplication = async (applicationId, e) => {
    e.stopPropagation();

    const confirmWithdraw = window.confirm(
      "Are you sure you want to withdraw this application?",
    );

    if (!confirmWithdraw) return;

    try {
      const { data } = await API.delete(
        `/application/withdraw/${applicationId}`,
      );

      toast.success(data.message);

      // Remove the application from the UI immediately
      setAppliedJobs((prevJobs) =>
        prevJobs.filter((item) => item._id !== applicationId),
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to withdraw application",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800 lg:text-5xl">
            Applied Jobs
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Track all your job applications
          </p>
        </div>

        <div className="space-y-6">
          {appliedJobs.length > 0 ? (
            appliedJobs.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/job/${item.job._id}`)}
                className="cursor-pointer rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl lg:p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                      {item.job.jobtitle}
                    </h2>

                    <div className="mt-4 flex items-center gap-2 text-gray-600">
                      <Building2 size={20} />
                      <h3 className="text-lg">{item.job.companyname}</h3>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-gray-500">
                      <MapPin size={20} />
                      <p>{item.job.location}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-4 lg:items-end">
                    <div
                      className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold ${
                        item.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : item.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <CircleCheckBig size={18} />
                      {item.status}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* View Details */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/job/${item.job._id}`);
                        }}
                        className="rounded-2xl bg-black px-5 py-3 text-white transition hover:bg-gray-800"
                      >
                        View Details
                      </button>

                      {/* Withdraw */}
                      <button
                        onClick={(e) => withdrawApplication(item._id, e)}
                        className="rounded-2xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
                <h2 className="text-3xl font-bold text-gray-700">
                  No Applications Yet
                </h2>
                <p className="mt-4 text-gray-500">
                  Start applying for jobs today
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
