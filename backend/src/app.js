import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import recruiterRoutes from './routes/recruiterRoutes.js';

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRoutes)
app.use('/api/job',jobRoutes)
app.use('/api/application',applicationRoutes)
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/admin',adminRoutes)

export default app;