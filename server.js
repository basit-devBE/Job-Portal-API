import express from "express"
import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"
import logger from "./middlewares/winston.js"
import dbConnect from "./config/dbconnfig.js"
import cors from "cors"
import allowedOptions from "./middlewares/corsOptions.js"

const app = express()
if(process.env.environment == "dev"){
    app.use(morgan("dev"))
}
app.use((req,re)=>{
    logger.info(`${req.method} - ${req.url} - ${req.ip}`)
    
})
app.use(cors(allowedOptions))
dbConnect();
app.use(errorHandler)
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})