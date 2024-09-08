import { getTokenfromCookies, verifyToken } from "../utils/jwToken"

export const isLoggedIn = (req,res,next) => {
    const token = getTokenfromCookies(req);
    if(!token){
        res.json({
            status:401,
            message:"Unauthorized"
        })
    }

    const decodedUser = verifyToken(token)
    if(!decodedUser){
        res.json({
            status:401,
            message:"Unauthorized"
        })
    }
    req.auth.user 
    
}