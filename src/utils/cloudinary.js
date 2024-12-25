

import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

(async function()
{

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLUDINARY_CLOUD_NAME, 
        api_key: process.env.CLUDINARY_API_KEY,  
        api_secret: process.env.CLUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uplodOnCludinary = async (localFilePath) =>{
        try {
            if(!localFilePath) return null;


            // file uplode on cloudinary
           const responce = await cloudinary.uploader.upload(localFilePath, {

                resource_type: 'auto'

            })


            //Flie has been uploded successfuly
            console.log("File is uploded on cloudinary",responce.url);
            return responce;

        } catch (error) {
            fs.unlink(localFilePath);
            // remove the localy saved temprary file as the uplode opretion got faild 
            return null;
        }
    }
})

export {uplodOnCludinary}