import { useContext } from "react";

import {
  User,
  Mail,
  Briefcase,
  Award,
  GraduationCap,
  FileText,
  Globe,
  BadgeCheck,
} from "lucide-react";

import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-white to-pink-100 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Top Card */}
        <div
          className="
            bg-white rounded-3xl shadow-2xl
            p-6 lg:p-10
            flex flex-col lg:flex-row
            gap-8
            items-center
          "
        >
          {/* Avatar */}
          <div
            className="
              w-36 h-36 rounded-full
              bg-linear-to-r from-indigo-500 to-pink-500
              flex items-center justify-center
              text-white text-5xl font-bold
              shrink-0
            "
          >
            {user?.fullname?.charAt(0)}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800">
              {user?.fullname}
            </h1>

            <p className="text-lg text-gray-500 mt-2">{user?.role}</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Email */}
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                <Mail className="text-indigo-500" />

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <h2 className="font-semibold">{user?.email}</h2>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                <BadgeCheck className="text-pink-500" />

                <div>
                  <p className="text-sm text-gray-500">Skills</p>

                  <h2 className="font-semibold">
                    {user?.skills?.length > 0
                      ? user.skills.join(", ")
                      : "No Skills Added"}
                  </h2>
                </div>
              </div>

              {/* Resume */}
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                <FileText className="text-green-500" />

                <div>
                  <p className="text-sm text-gray-500">Resume</p>

                  {user?.resume ? (
                    <a
                      href={`http://localhost:5005/${user.resume}`}
                      target="_blank"
                      className="text-blue-600 font-semibold"
                    >
                      View Resume
                    </a>
                  ) : (
                    <h2 className="font-semibold">No Resume Uploaded</h2>
                  )}
                </div>
              </div>

              {/* Experience */}
              <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                <Briefcase className="text-orange-500" />

                <div>
                  <p className="text-sm text-gray-500">Experience</p>

                  <h2 className="font-semibold">Fresher</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          {/* Education */}
          <div className="bg-white shadow-xl rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <GraduationCap className="text-indigo-500" />

              <h2 className="text-2xl font-bold">Education</h2>
            </div>

            <p className="text-gray-600">Education details not added yet.</p>
          </div>

          {/* Achievements */}
          <div className="bg-white shadow-xl rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <Award className="text-pink-500" />

              <h2 className="text-2xl font-bold">Achievements</h2>
            </div>

            <p className="text-gray-600">No achievements added yet.</p>
          </div>

          {/* Websites */}
          <div className="bg-white shadow-xl rounded-3xl p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Globe className="text-green-500" />

              <h2 className="text-2xl font-bold">Websites & Portfolio</h2>
            </div>

            <p className="text-gray-600">No websites added yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
