import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BadgeIndianRupee,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  FileText,
  MapPin,
  UploadCloud,
} from "lucide-react";

import API from "../services/api";
import LoadingState from "../components/LoadingState";

export default function JobDetails() {
  const { id } = useParams();
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [resume, setResume] = useState(null);
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchSingleJob() {
      try {
        const { data } = await API.get("/job/getJobs?limit=100");
        const foundJob = data.jobs.find((item) => item._id === id);
        setJob(foundJob);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSingleJob();
  }, [id]);

  async function applyJob() {
    if (!resume) {
      toast.error("Please Upload the resume");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobId", job._id);

      const { data } = await API.post("/application/applyjob", formData);

      toast.success(data.message);

      setShowResumeModal(false);
      setResume(null);
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  }

  if (!job) {
    return (
      <LoadingState
        label="Loading job details"
        description="We are preparing the role and application information."
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-8 sm:px-8 lg:px-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700">
              <CheckCircle2 size={16} />
              Open position
            </div>

            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  {job.jobtitle}
                </h1>
                <div className="mt-3 flex items-center gap-2 text-lg font-medium text-slate-600">
                  <Building2 size={20} className="text-cyan-600" />
                  {job.companyname}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500">
                <FileText size={17} />
                Apply with your resume
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                <MapPin size={17} className="text-cyan-600" />
                {job.location}
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                <BriefcaseBusiness size={17} className="text-cyan-600" />
                {job.jobtype}
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                <Clock3 size={17} className="text-cyan-600" />
                {job.experiencelevel} years experience
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-3 lg:p-10">
            <div className="space-y-8 lg:col-span-2">
              <section>
                <h2 className="text-xl font-bold text-slate-900">
                  Job description
                </h2>
                <p className="mt-4 whitespace-pre-line leading-8 text-slate-600">
                  {job.description}
                </p>
              </section>

              <section className="border-t border-slate-200 pt-8">
                <h2 className="text-xl font-bold text-slate-900">
                  Responsibilities
                </h2>
                <ul className="mt-5 space-y-3 text-slate-600">
                  {[
                    "Develop scalable applications",
                    "Collaborate with cross-functional teams",
                    "Write clean maintainable code",
                    "Participate in code reviews",
                    "Optimize performance and UI",
                  ].map((responsibility) => (
                    <li key={responsibility} className="flex items-start gap-3">
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-cyan-600"
                      />
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 lg:sticky lg:top-6">
                <p className="text-sm font-medium text-slate-500">
                  Compensation
                </p>
                <div className="mt-2 flex items-center gap-2 text-3xl font-bold text-slate-900">
                  <BadgeIndianRupee size={27} className="text-cyan-600" />
                  {job.salary}
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Salary listed by the recruiter
                </p>

                <button
                  onClick={() => setShowResumeModal(true)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-cyan-700"
                >
                  <UploadCloud size={19} />
                  Apply now
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h2 className="font-bold text-slate-900">Skills required</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skillsrequired.map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-cyan-50 px-3 py-1.5 text-sm font-medium text-cyan-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <h2 className="font-bold text-slate-900">Posted by</h2>
                <p className="mt-3 font-medium text-slate-700">
                  {job.createdBy?.fullname}
                </p>
                <p className="mt-1 break-all text-sm text-slate-500">
                  {job.createdBy?.email}
                </p>
              </div>
            </aside>
          </div>
        </div>

        {showResumeModal && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center bg-slate-950/60 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">
                Upload your resume
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Upload a PDF resume to complete your application.
              </p>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                className="mt-5 w-full rounded-lg border border-slate-300 p-2 text-sm"
              />

              {resume && (
                <p className="mt-3 break-all text-sm text-slate-600">
                  Selected: {resume.name}
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => {
                    setShowResumeModal(false);
                    setResume(null);
                  }}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={applyJob}
                  className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-cyan-700"
                >
                  Submit application
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
