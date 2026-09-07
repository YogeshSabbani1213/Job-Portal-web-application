import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.74-.07-1.45-.2-2.13H12v4.03h5.39a4.6 4.6 0 0 1-1.99 3.02v2.5h3.22c1.89-1.74 2.98-4.31 2.98-7.42Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.61-2.44l-3.22-2.5c-.9.6-2.05.96-3.39.96-2.61 0-4.82-1.76-5.6-4.12H.7v2.6A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 19.9c-.5-.94-.8-1.96-.8-3.1s.3-2.16.8-3.1V9.1H2.86A9.98 9.98 0 0 0 1.9 12c0 1.62.39 3.15 1.1 4.5L6.4 19.9Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.98c1.47 0 2.8.51 3.84 1.5l2.88-2.88A9.97 9.97 0 0 0 12 2a10 10 0 0 0-10.1 8.1l3.54 2.76c.78-2.36 2.99-4.08 5.56-4.08Z"
      />
    </svg>
  );
}

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", formData);
      login(data.user, data.token);
      toast.success("Login Successfully");
      navigate("/Dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const googleToken = credentialResponse.credential;
      const { data } = await API.post("/auth/google", {
        token: googleToken,
      });

      login(data.user, data.token);
      toast.success("Google Login Successful");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Google Login Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/60 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Welcome back
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Login
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-300"
              >
                Password
              </label>
              <button
                type="button"
                className="text-xs font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                Forgot password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:opacity-95 hover:shadow-cyan-500/30"
          >
            Login
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-[0.25em] text-slate-400">
            <span className="bg-slate-900 px-3">or</span>
          </div>
        </div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.log("Google Login Failed");
          }}
          render={({ onClick }) => (
            <button
              type="button"
              onClick={onClick}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-700 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-500 hover:bg-slate-100"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          )}
        />
      </div>
    </div>
  );
}
