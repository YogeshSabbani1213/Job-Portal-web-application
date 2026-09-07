import { useNavigate } from "react-router-dom";
import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react";

export default function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/job/${job._id}`)}
      className="group flex h-full cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
          <BriefcaseBusiness size={21} />
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Hiring
        </span>
      </div>

      <h2 className="mt-6 line-clamp-2 text-xl font-bold leading-7 text-slate-900">
        {job.jobtitle}
      </h2>
      <p className="mt-2 font-medium text-slate-600">{job.companyname}</p>

      <div className="mt-5 space-y-2 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-cyan-600" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <BriefcaseBusiness size={16} className="text-cyan-600" />
          <span>{job.jobtype || "Full-time"}</span>
        </div>
      </div>

      <p className="mt-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-500">
        {job.description}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Salary
          </p>
          <p className="mt-1 font-bold text-slate-900">₹ {job.salary}</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-700 transition group-hover:text-cyan-800">
          View details
          <ArrowUpRight size={17} />
        </span>
      </div>
    </article>
  );
}
