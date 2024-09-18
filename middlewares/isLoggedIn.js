import { decrypt } from "dotenv";
import { getTokenfromCookies, verifyToken } from "../utils/jwToken.js";
import User from "../models/Users.js";

export const isLoggedIn = async (req, res, next) => {
    const token = getTokenfromCookies(req);
    // console.log(token);
    
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

   try{
    const verifiedToken = verifyToken(token)
    if(!verifiedToken){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
    // console.log(verifiedToken)

    const  decodedUser = await User.findById(verifiedToken.userId.userId)
    if(!decodedUser){
        res.json({
            status:400,
            message:"User does not exist"
        })
    }

    req.auth = decodedUser // Initialize req.auth if it doesn't exist
    next()
    // console.log(req.auth);
    
   } catch(error){
    next(error)}// Call next() to proceed to the next middleware or route handler
};
