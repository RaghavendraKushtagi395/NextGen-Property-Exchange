import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';


dotenv.config();


mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connection with MongoDB Successful');
}).catch((err) =>{
    console.log("!!!Failed to connect with MongoDB!!!-->" + err);
})

const app = express();

app.listen(3000, () =>{
    console.log("Server running on port 3000...")

});


app.use("/api/user", userRouter);