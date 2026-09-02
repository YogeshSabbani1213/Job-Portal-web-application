import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,

    },
    password: {
        type: String,
        minlength: [6, 'password must be 6 characters']
    },
    role: {
        type: String,
        required: true,
        enum: ['job seeker', 'recruiter', 'admin'],
        default: "jobseeker"
    },
    skills: {
        type: [String],
        default: [],
        required: true,
    },
    resume: {
        type: String,
    },
    savedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]

})

// const userModel = mongoose.model('User',userSchema)
export default mongoose.models.User || mongoose.model("User", userSchema);