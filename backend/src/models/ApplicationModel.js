import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    resume: { type: String },
    status: {
      type: String,
      enum: ["pending", "shortlisted", "rejected", "hired"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);
// const applicationModel = mongoose.model('Application', applicationSchema);
// export default applicationModel;
export default mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
