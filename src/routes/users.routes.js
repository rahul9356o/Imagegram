
import { Router } from "express";
import { registerUser } from "../controllers/user_controller.js"

const router = Router();

router.route("/register").post(
    uplode
    
    ,registerUser);

export default router;