import { LoaderCircle } from "lucide-react";

const LoadingState = ({
  label = "Loading",
  description = "Please wait while we prepare this page.",
  fullScreen = true,
  compact = false,
  className = "",
}) => {
  if (compact) {
    return (
      <span className="inline-flex items-center justify-center gap-2">
        <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
        <span>{label}</span>
      </span>
    );
  }

  return (
    <div
      className={`flex w-full items-center justify-center px-4 py-12 ${
        fullScreen ? "min-h-[calc(100vh-5rem)]" : "min-h-64"
      } ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <LoaderCircle
          className="mx-auto h-10 w-10 animate-spin text-slate-700"
          aria-hidden="true"
        />
        <h2 className="mt-4 text-lg font-semibold text-slate-800 sm:text-xl">
          {label}
        </h2>
        <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
};

export default LoadingState;
