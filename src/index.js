

import dotenv from "dotenv";
import app from "./app.js"
import Connect_DB from "./db/index.js"


dotenv.config({

        path: './.env'

    });

    Connect_DB()
    .then(()=>{
        app.listen(process.env.PORT || 5000,() => {

            console.log(`Server is running on : ${process.env.PORT}`);
            
        })
    })


    .catch((error)=>{

        console.log("Database connection is failed !!", error);
        
    })











































/*import mongoose from "mongoose";

import {DB_NAME} from "./constants"

import express from "express";

const app = express();

(async() =>{

    try {

        await mongoose.connect(`${MOngodb_URL}/${DB_NAME}`);

        app.on("error",(error)=>{
            console.error("ERROR",error);
            throw error
        
        })

        app.listen(prosses.env.PORT,()=>{
            console.log(`App is listioning on port : ${prosses.env.PORT}`);
            
        })

        
    } catch (error) {
        console.error("ERROR",error);
        throw error
        
        
    }

})()

*/























































// import express from 'express';

// const app = express();

// const port = 6000;



// app.get('/',(req, res)=>{

//     return res.send('hellow');

// });


// app.get('/ping',(req, res)=>{

//     return res.json({massage:'pong'});

// });


// app.get('/hello',(req, res)=>{


//     return res.json({message:'hellow'});


// });

// app.post('/hello', (req, res)=>{

//     return res.json({message:'post: hellow world'});


// });

// app.put('/hello', (req, res)=>{

//     return res.json({message:'put: hellow world'});


// });



// app.delete('/hello', (req, res)=>{

//     return res.json({message:'delete: hellow world'});


// });



// app.listen(port,()=>{

//     console.log(`Server is running on : ${port}`);
    
// });