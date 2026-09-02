import userModel from "../models/UserModel.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { OAuth2Client } from 'google-auth-library';




//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWI2OWMxYzE2MTNjZTAwZDRkNzQ2NjAiLCJpYXQiOjE3NzM1ODAzMDd9.lQmXGTBlCY05VInjrCtmolnyyEEcOgXe6oNZq-pkYa4
//yogi

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWI4ZjkwYTE1YWE0ZWI1NTY3MDFhZWYiLCJpYXQiOjE3NzM3MzAxNDN9.g6wjzkkS-BvwwwBpp6CM40sQspEcqG83yR1ZdphYEiw
//keerthi(recruiter)

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWNmYjE2NTRkZWI2Y2NlOTUxOWQ4NjciLCJpYXQiOjE3NzUyMTkxMzl9.AJ_OTQnDhMncJq7cK8oUdSv1brxORuP6oG_yfQRKvDw
//krishna(admin)

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body
        // Step 1: Verify Google Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        // Step 2: Get Google User Details
        const payload = ticket.getPayload()
        const {
            sub: googleId,
            name,
            email,
            picture
        } = payload

        // Step 3: Check if user already exists
        let user = await userModel.findOne({ email })

        // Step 4: If user does not exist, create user
        if (!user) {
            user = await userModel.create({
                fullname: name,
                email,
                googleId,
                picture,

                // Default values for Google users
                role: 'job seeker',
                skills: []
            })
        }

        // Step 5: Generate YOUR application's JWT
        const jwtToken = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRETKEY
        )

        // Step 6: Send JWT and User to Frontend
        return res.status(200).json({
            message: 'Google Login Successful',
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                skills: user.skills,
                resume: user.resume,
                picture: user.picture
            },
            token: jwtToken
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: 'Google Login Failed',
            error: error.message
        })
    }
}

export async function register(req, res) {
    try {
        console.log(req.body);
        console.log(req.file);


        const { fullname, email, password, role, skills } = req.body;
        const resume = req.file ? req.file.path : null;
        if (!fullname || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (role === 'job seeker') {
            if (!skills || !resume) {
                return res.status(400).json({ message: 'skills and resume fields are required for jobseeker' });
            }
        }
        const existeduser = await userModel.findOne({ email })
        if (existeduser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hasedPass = await bcrypt.hash(password, 10);
        const newuser = await userModel.create({
            fullname,
            email,
            password: hasedPass,
            role,
            skills: role === 'job seeker' ? skills : [],
            resume: role === 'job seeker' ? resume : null
        })
        return res.status(201).json({ message: 'User created successfully', newuser })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Please register before login' })
        }
        if (!user.password) {
            return res.status(400).json({
                message: 'Please login using Google'
            })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ message: 'credintials are incorrect' })
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRETKEY)
        return res.status(200).json({
            "message": "Login Successful",
            user: {
                _id: user._id,
                email: user.email,
                fullname: user.fullname,
                role: user.role,
                skills: user.skills,
                resume: user.resume
            },
            token: token
        })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })

    }

}

export async function getAllUsers(req, res) {
    try {
        const users = await userModel.find().select('-password')
        return res.status(200).json({ users })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export async function deleteUser(req, res) {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Deleted Successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

