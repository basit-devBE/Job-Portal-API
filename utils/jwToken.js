import jwt from "jsonwebtoken"

export const generateToken = (userId, role) => {
    const token = jwt.sign({ userId , role}, process.env.SECRET_KEY, {
        expiresIn: "1h"
    });
    return token;
}

export const verifyToken = (token) => {
   const verifiedtoken = jwt.verify(token,process.env.SECRET_KEY)
    return verifiedtoken

}
//get token from cookies
export const getTokenfromCookies = (req) =>{
    const token = req.cookies.token
    return token
}