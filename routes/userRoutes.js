import express from "express"
import { LoginUser, registerUser } from "../controllers/usercontrollers.js"

const userRouter = express.Router()

userRouter.post("/user/register" ,registerUser)
userRouter.post("/user/login", LoginUser)

export default userRouter