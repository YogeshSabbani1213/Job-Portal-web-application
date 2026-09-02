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

    googleId: {
        type: String,
        unique: true,
        sparse: true
    },

    picture: {
        type: String
    },

    role: {
        type: String,
        required: true,
        enum: ['job seeker', 'recruiter', 'admin'],
        default: 'job seeker'
    },

    skills: {
        type: [String],
        default: []
    },

    resume: {
        type: String
    },

    savedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]

})

export default mongoose.models.User || mongoose.model('User', userSchema)