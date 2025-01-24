// const { Schema } = rpasswordequire("mongoose");

import mongoose, {Schema} from "mongoose";

import bcript from "bcrypt";

import jwt from "jsonwebtoken";

const UserSchema = new Schema(
    {
        username:{
            type : String,
            required : true,
            trim : true,
            unique : true,
            index : true,
            lowercase : true
        },

        email:{
            type : String,
            required : true,
            trim : true,
            unique : true,
            lowercase : true
        },

        fullname:{
            type : String,
            required : true,
            trim : true,
            index: true
        },

        avatar:{
            type: String, // cloudinary  url
            requeired : true
        }, 

        coverimage: {
            type: String
        },

        watchhistory :{
            type : Schema.Types.ObjectId,
            ref : "video"

        }, 

         password: {
            type: String,
            requeired: [true," password is requeired"]
        },

        refreshTocken :{
            type : String
        }
    },

    {
        timeseries: true
    }
)

//password bcript

UserSchema.pre("save", async function(next) {

    if(!this.isModified("password")) return next();

    this.password = bcript.hash(this.password, 10);
    next();
})



//methods

UserSchema.method.isPasswordCorrect = async function(password){

    return await bcript.compare(password, this.password);

}


UserSchema.method.generateAccessToken = function(){

    jwt.sign(
    {
        _id : this._id,
        email : this.email,
        username : this.username,
        fullname : this.username
    },
    process.env.ACCESS_TOKEN ,
    {
         expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
    )


}

// UserSchema.method.generateAccessToken = function(){

//     jwt.sign(
//     {
//         _id : this._id,
//         email : this.email,
//         username : this.username,
//         fullname : this.username
//     },
//     process.env.REFRESH_TOKEN ,
//     {
//          expiresIn : process.env.REFRESH_TOKEN_EXPIRY
//     }
//     )
// }

UserSchema.method.generateRefreshToken = function(){

    jwt.sign(
        {
            _id : this._id,
           
        },
        process.env.REFRESH_TOKEN ,
        {
             expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
        )
}


export const Usermodel = mongoose.model("User", UserSchema);