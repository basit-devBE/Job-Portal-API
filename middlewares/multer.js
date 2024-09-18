import multer from "multer"
import fs from "fs"
import path from "path"

if(!fs.existsSync("../uploads")){
    fs.mkdirSync("../uploads")
}

if(!fs.existsSync("../cv")){
    fs.mkdirSync("../cv")
}

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../cv')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
 export  const ImgUpload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        
        if (ext !== ".jpeg" && ext !== ".png" && ext !== ".jpg") {
            return cb(new Error("File format not supported"), false);
        }
        
        cb(null, true); 
    }
});

 export  const FileUpload = multer({
    storage:fileStorage,
    limits:{fileSize: 1024 * 1024},
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        
        if (ext !== ".pdf" && ext !== ".docx" && ext !== ".doc") {
            return cb(new Error("File format not supported"), false);
        }
        
        cb(null,true)
      }
  })

 