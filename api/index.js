import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connection with MongoDB Successful');
  })
  .catch((err) => {
    console.log("!!!Failed to connect with MongoDB!!!-->" + err);
  });

const app = express();

// Add middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req,res,next) =>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "INTERNAL SERVER ERROR";
  return res.status(statusCode).json({
    success: false,
    statusCode : statusCode,
    message : message,
  });
});
