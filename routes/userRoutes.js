import express from "express"
import { fetchallUsers, LoginUser, registerUser, Updateuser } from "../controllers/usercontrollers.js"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"
import ImgUpload from '../middlewares/multer.js';

const userRouter = express.Router()

userRouter.post("/user/register" ,registerUser)
userRouter.post("/user/login", LoginUser)
userRouter.put("/user/update", ImgUpload.single('profilepicture'), isLoggedIn,Updateuser)
userRouter.get("/users", fetchallUsers)

export default userRouter