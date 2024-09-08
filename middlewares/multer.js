import multer from "multer"
import fs from "fs"
import path from "path"

if(!fs.existsSync("../uploads")){
    fs.mkdirSync("../uploads")
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const ImgUpload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        // Extract the file extension
        const ext = path.extname(file.originalname).toLowerCase();
        
        // Check if the file extension is allowed
        if (ext !== ".jpeg" && ext !== ".png" && ext !== ".jpg") {
            return cb(new Error("File format not supported"), false);
        }
        
        cb(null, true); // If the file format is allowed, continue with the upload
    }
});

export default ImgUpload;