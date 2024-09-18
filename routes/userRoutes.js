import express from "express"
import { deleteuser, fetchallUsers, fetchUserProfile, LoginUser, registerUser, Updateuser, UploadCv, VerifyAccount } from "../controllers/usercontrollers.js"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"
import {FileUpload, ImgUpload} from '../middlewares/multer.js';

const userRouter = express.Router()

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Register a new user by providing necessary details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request, invalid data.
 */
userRouter.post("/user/register", registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     description: Log in using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *       401:
 *         description: Invalid credentials.
 */
userRouter.post("/user/login", LoginUser);

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update a user's profile
 *     tags: [Users]
 *     description: Update the user profile with new information.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilepicture:
 *                 type: string
 *                 format: binary
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *       401:
 *         description: Unauthorized access.
 */
userRouter.put("/user/update", ImgUpload.single('profilepicture'),isLoggedIn, Updateuser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Fetch all users
 *     tags: [Users]
 *     description: Get a list of all registered users.
 *     responses:
 *       200:
 *         description: Successfully retrieved users.
 */
userRouter.get("/users", fetchallUsers);

/**
 * @swagger
 * /users/verify/{token}/{userId}:
 *   post:
 *     summary: Verify user account
 *     tags: [Users]
 *     description: Verify a user account using a token and userId.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The verification token
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: Account verified successfully.
 *       400:
 *         description: Invalid token or user ID.
 */
userRouter.post("/users/verify/:token/:userId", VerifyAccount);

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     description: Delete the logged-in user account.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       401:
 *         description: Unauthorized access.
 */
userRouter.delete("/users/delete", isLoggedIn, deleteuser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Fetch user profile
 *     tags: [Users]
 *     description: Get the profile details of a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User profile fetched successfully.
 *       404:
 *         description: User not found.
 */
userRouter.get("/users/:id", fetchUserProfile);

userRouter.put("/user/update/cv", FileUpload.single('CV'),isLoggedIn, UploadCv);


export default userRouter;
