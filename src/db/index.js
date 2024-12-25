
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// const dbHost = process.env.DB_HOST || 'localhost';

const Connect_DB = async ( )=>{

    try {

        const ConnectionInstence = await mongoose.connect(`${process.env.MOngodb_URL}/${DB_NAME}`);
        
        console.log(`/n Mongodb connected !! Db HOST : ${ConnectionInstence.connection.host}`);
        
        
    } catch (error) {
        console.error(`Mongodb connection errorn ${error}`);
        process.exit(1);
    }
}

 export default Connect_DB;  