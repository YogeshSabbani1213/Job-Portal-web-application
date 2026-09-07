import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import JobCard from "../components/JobCard";
import LoadingState from "../components/LoadingState";

export default function Jobs({ searchQuery, locationQuery }) {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        let url = `/job/getJobs?page=${page}&limit=6`;
        // Keyword search
        if (searchQuery) {
          url += `&search=${searchQuery}`;
        }

        // Location filter
        if (locationQuery) {
          url += `&location=${locationQuery}`;
        }
        const { data } = await API.get(url);
        setJobs(data.jobs);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [searchQuery, locationQuery, page]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, locationQuery]);

  function handlebutton() {
    navigate("/appliedJobs");
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
              Opportunities for you
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Find your next role
            </h1>
            <p className="mt-2 text-slate-500">
              Explore roles that match your experience and career goals.
            </p>
          </div>

          <button
            onClick={handlebutton}
            className="w-full rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700 sm:w-auto"
          >
            My applications
          </button>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {loading ? (
            <LoadingState
              fullScreen={false}
              className="col-span-full"
              label="Finding the right opportunities"
              description="We are updating the latest jobs for your search."
            />
          ) : jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <h2 className="text-xl font-semibold text-slate-800">
                No jobs found
              </h2>
              <p className="mt-2 text-slate-500">
                Try adjusting your search or location filters.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="min-w-20 text-center text-sm font-semibold text-slate-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
