import { v2 as cloudinary } from 'cloudinary'
import  dotenv  from 'dotenv';
import path, { resolve } from "path"
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadfiletocloudinary = (filename) =>{
    const filepath = path.join('../uploads', filename)
    return new Promise ((resolve,reject)=>{
        cloudinary.uploader.upload(filepath,(error,result)=>{
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
    })
}