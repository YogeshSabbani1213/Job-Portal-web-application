import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import recruiterRoutes from './routes/recruiterRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import aiRoute from "./routes/ai.route.js";

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads',express.static('uploads'))

app.use('/api/auth',authRoutes)
app.use('/api/job',jobRoutes)
app.use('/api/application',applicationRoutes)
app.use('/api/notification',notificationRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/admin',adminRoutes)
app.use("/api/ai", aiRoute);

export default app;