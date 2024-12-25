
import asynchandelar from "../utils/asynchandelar.js"

const registerUser = asynchandelar( async(req, res ) =>{
    req.status(200).json({
        message : "ok"
    })
})

export  {registerUser}