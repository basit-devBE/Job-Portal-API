import crypto from "crypto"
const createVerifyToken = () =>{
    return crypto.randomBytes(64).toString('hex');
}

export default createVerifyToken;