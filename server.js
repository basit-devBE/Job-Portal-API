import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import logger from "./middlewares/winston.js";
import dbConnect from "./config/dbconnfig.js";
import cors from "cors";
import allowedOptions from "./middlewares/corsOptions.js";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/globalerrorhandler.js";
import userRouter from "./routes/userRoutes.js";
import JobRouter from "./routes/jobroutes.js";
import limit from "./middlewares/ratelimit.js";

const app = express();

// Middleware
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use((req, res, next) => {
    logger.info(`${req.method} - ${req.url} - ${req.ip}`);
    next(); 
});

app.use(limit)
app.use(cors({
    origin: allowedOptions
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

// Routes
app.use(userRouter);
app.use(JobRouter)
// Error Handling Middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
