import app from "./src/app.js";
import dotenv from 'dotenv'

import connectDB from "./src/config/db.js";
dotenv.config();

connectDB()
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})

app.get('/',(req,res)=>{
    res.send('server is runninggggg')
})