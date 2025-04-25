// import asynchandelar from "../utils/asynchandelar.js";
import { asyncHandler } from "../utils/asynchandelar.js";
import { ApiError } from "../utils/ApiError.js";
import { Usermodel } from "../models/users_model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponce.js";

const generateAccesTokenAndRefreshToken = async (userid) => {
  try {
    const user = Usermodel.findById(userid);
    const accesToken = Usermodel.generateAccessToken();
    const refreshToken = Usermodel.generateRefreshToken();

    user.refreshToken = refreshToken;

    user.save({ validateBeforeSave: false });

    return { accesToken, refreshToken };
    
  } catch (error) {
    throw new ApiError(
      500,
      "Smething went wrong while generating refresh token and acces token"
    );
  }
};






const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { fullname, email, username, password } = req.body;
  console.log("email:", email);
  console.log("username:" , username);
  console.log("fullName:", fullname);
  console.log("password:", password);



  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await Usermodel.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await Usermodel.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await Usermodel.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});












const loginUser = asyncHandler(async (req, res) => {
  // req body => data
  // Username or email
  // Fide the user from databse
  // Password chack
  // Creat acces token and refresh token
  // send cookis

  const { email, username, password } = req.body;

  if (!email || !username) {
    throw new ApiError(400, "Username and password is required");
  }

  const user = await Usermodel.findOne({
    $or: [
      {
        email,
      },

      {
        username,
      },
    ],
  });

  if (!user) {
    throw new ApiError(400, "User dos not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user creation");
  }

  const { accesToken, refreshToken } = generateAccesTokenAndRefreshToken(
    user._id
  );

  const loggedUser = Usermodel.findById(user._id).select(
    "-accesToken -refreshToken"
  );

  const Option = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accesToken", accesToken, Option)
    .cookie("refreshToken", refreshToken, Option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedUser,
          accesToken,
          refreshToken,
        },

        "User loggde in succesfully "
      )
    );
});

export {
  registerUser,
  loginUser

 };
