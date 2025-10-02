import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    //ge user data from fronend
    //validation
    //already exit
    //check for image and avtar
    //upload in clodinary
    //check in clodinary
    //create user object for db
    //remove password and refresh token field from response
    //check for user creation
    //reurn response


    const {fullName, email, username, password}=req.body;
    // console.log(fullName);
    console.log(email);
    // console.log(password);
    if ([fullName, email, username, password].some((field)=> field?.trim() === "")) {
        throw new ApiError(400,"All fields are required"); 
    }
    
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })
    if (existedUser) {
        throw new ApiError(409, "User with user or email already exists");
        
    }

   const avtarLocalPath = req.files?.avatar[0]?.path;
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if (!avtarLocalPath) {
        throw new ApiError(400,"Avatar file is required")
   }
   const avatar = await uploadOnCloudinary(avtarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
        throw new ApiError(400,"Avatar file is required")
   }

   const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
   })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if (!createdUser) {
        throw new ApiError(500,"Somehing went wrong while regisering user")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "Use register successfuly")
  )

})

export {
    registerUser,
}
