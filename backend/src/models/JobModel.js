import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    jobtitle: {
        type: String,
        unique: true
    },
    companyname: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String,
    },
    salary: {
        type: Number,
    },
    jobtype: {
        type: String,
        enum:['Full time','part time','remote','contract','Internship'],
    },
    skillsrequired: {
        type: [String],
    },
    experiencelevel:{
        type:Number,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},
    {
        timestamps: true
    }
)

const jobModel = mongoose.model('Job',jobSchema)
export default jobModel;