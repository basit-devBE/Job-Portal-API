import { decrypt } from "dotenv";
import { getTokenfromCookies, verifyToken } from "../utils/jwToken.js";

export const isLoggedIn = (req, res, next) => {
    const token = getTokenfromCookies(req);
    console.log(token);
    
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    const verifiedToken = verifyToken(token)
    if(!verifiedToken){
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
    console.log(verifiedToken)


    req.auth = req.auth || {}; // Initialize req.auth if it doesn't exist
    req.auth.id = verifiedToken.userId.userId;
    req.auth.role = verifiedToken.userId.role;

    console.log(req.auth);
    next(); // Call next() to proceed to the next middleware or route handler
};
