import express from "express"
import { deleteuser, fetchallUsers, fetchUserProfile, LoginUser, registerUser, Updateuser, VerifyAccount } from "../controllers/usercontrollers.js"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"
import ImgUpload from '../middlewares/multer.js';

const userRouter = express.Router()

userRouter.post("/user/register" ,registerUser)
userRouter.post("/user/login", LoginUser)
userRouter.put("/user/update", ImgUpload.single('profilepicture'), isLoggedIn,Updateuser)
userRouter.get("/users", fetchallUsers)
userRouter.post("/users/verify/:token/:userId", VerifyAccount)
userRouter.delete("/users/delete", isLoggedIn,deleteuser)
userRouter.get("/users/:id", fetchUserProfile)

export default userRouter