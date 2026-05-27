import { useState } from "react";

import API from "../services/api";

const AIResumeAnalyzer = () => {
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        try {
            setLoading(true);
            console.log("Starting analysis...");
            
        const formData = new FormData();

            formData.append("resume", resumeFile);

            // STEP 1 → Upload Resume
            const uploadResponse = await API.post(
                "/ai/upload-resume",
                formData
            );
            console.log("Upload Response:", uploadResponse.data);

            const resumeText = uploadResponse.data.text;

            // STEP 2 → Analyze Resume
            const analysisResponse = await API.post(
                "/ai/analyze-resume",
                {
                    resumeText,
                    jobDescription,
                }
            );
            console.log("Analysis Response:", analysisResponse.data);

            setAnalysis(analysisResponse.data.analysis);
        } catch (error) {
            console.log("ERROR:", error);
            console.log(error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const score = analysis?.score || 0;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    AI Resume Analyzer
                </h1>

                <div className="mb-5">
                    <label className="font-semibold block mb-3 text-lg">
                        Upload Resume PDF
                    </label>

                    <label
                        className="
            flex items-center justify-between
            border-2 border-dashed border-cyan-400
            bg-cyan-50
            hover:bg-cyan-100
            transition-all duration-300
            rounded-2xl
            px-5 py-5
            cursor-pointer
        "
                    >

                        <div>
                            <p className="font-semibold text-gray-700">
                                {resumeFile
                                    ? resumeFile.name
                                    : "Choose Resume PDF"}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Upload your resume for AI analysis
                            </p>
                        </div>

                        <div
                            className="
                bg-cyan-500
                hover:bg-cyan-600
                text-white
                px-5 py-2
                rounded-xl
                font-semibold
                transition
            "
                        >
                            Browse
                        </div>

                        <input
                            type="file"
                            accept=".pdf"
                            hidden
                            onChange={(e) =>
                                setResumeFile(e.target.files[0])
                            }
                        />
                    </label>
                </div>

                <div className="mb-5">
                    <label className="font-semibold block mb-2">
                        Paste the Job Description of Your Job
                    </label>

                    <textarea
                        rows="8"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste job description here..."
                        className="w-full border p-3 rounded-lg"
                    />
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            AI Analyzing...
                        </div>
                    ) : (
                        "Analyze Resume"
                    )}
                </button>
                {analysis && (
                    <div className="mt-10 space-y-6">

                        {/* SCORE */}
                        <div className="bg-linear-to-r from-black to-gray-800 text-white p-8 rounded-3xl shadow-xl">
                            <h2 className="text-2xl font-bold mb-5">
                                AI Match Score
                            </h2>

                            <div className="flex items-center gap-6">

                                <div className="w-28 h-28 rounded-full border-4 border-white flex items-center justify-center text-3xl font-bold">
                                    {score}%
                                </div>

                                <div className="flex-1">
                                    <p className="mb-3 text-lg">
                                        Resume compatibility with job role
                                    </p>

                                    <div className="w-full bg-gray-600 rounded-full h-4 overflow-hidden">
                                        <div
                                            className="bg-green-400 h-full"
                                            style={{ width: `${score}%` }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* MISSING SKILLS */}
                        <div className="bg-white p-6 rounded-3xl shadow-lg">
                            <h3 className="text-xl font-bold text-red-500 mb-4">
                                Missing Skills
                            </h3>

                            <div className="flex flex-wrap gap-3">
                                {analysis.missingSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-red-100 text-red-600 px-4 py-2 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* STRENGTHS */}
                        <div className="bg-white p-6 rounded-3xl shadow-lg">
                            <h3 className="text-xl font-bold text-green-500 mb-4">
                                Strengths
                            </h3>

                            <div className="space-y-3">
                                {analysis.strengths.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-green-50 p-4 rounded-xl"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SUGGESTIONS */}
                        <div className="bg-white p-6 rounded-3xl shadow-lg">
                            <h3 className="text-xl font-bold text-yellow-500 mb-4">
                                Suggestions
                            </h3>

                            <div className="space-y-3">
                                {analysis.suggestions.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-yellow-50 p-4 rounded-xl"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default AIResumeAnalyzer;
