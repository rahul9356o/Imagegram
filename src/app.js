
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors(
   {
    origin: process.env.CORSE_ORIGIN, 
    credentials: true
   }
));

app.use(express.json({limit: "16kb"}));

app.use(express.urlencoded({limit:"16kb", extended: true}));

app.use(express.static("public"));


app.use(cookieParser());

//IMPORT ROUTES

import userRouter from "./routes/users_routes.js";

// app.use("api/v1/users",userRouter);
app.use("/api/v1/users", userRouter);

// http://localhost:800/api/v1/users/register


export default app;