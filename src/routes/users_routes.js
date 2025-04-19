
import { Router } from "express";
import { registerUser } from "../controllers/user_controller.js"

import { upload } from "../middlewares/multer.middelware.js"


const router = Router();

// router.route("/register").post(
//     upload.fields([
//         {
//             name: "avatar",
//             maxCount:1
//         },
 
//         {
//             name: "avatar",
//             maxCount: 1
//         }
//     ]),
    
//     registerUser);


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverimage",
            maxCount: 1
        }
    ]),
    registerUser
    )

export default router;


