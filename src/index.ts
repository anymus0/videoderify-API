import { env } from 'process';
import 'dotenv/config'
import express from "express";
import compression from "compression";
import mongoose from "mongoose";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import { checkMediaDir } from "./global/storage.js";
// routes
import userRoute from "./user/routes/index.js";
import seriesRoute from "./series/routes/Series.js";
import commentRoute from './comment/routes/index.js';
import defaultRoutes from "./global/routes/defaultRoutes.js";

// define port
const port = env.PORT || 3000;
// init express app
const app = express();
// use cors
const origin = env.ORIGIN || "http://localhost:3000";
app.use(cors({ origin: origin, credentials: true }));
// compress every request
app.use(compression());
// add set of security features
app.use(helmet());
// sanitize user-supplied data to prevent MongoDB Operator Injection
app.use(ExpressMongoSanitize());
// parse JSON
app.use(express.json());
// parse cookies
app.use(cookieParser());
// user route
app.use("/user", userRoute);
// series routes
app.use("/series", seriesRoute);
// comment routes
app.use("/comment", commentRoute);
// load default routes last
app.use("/", defaultRoutes);

const start = async () => {
  try {
    // determine mediaDir on server start
    await checkMediaDir();
    // MongoDB server connection setup
    const mongoDB = process.env.DB_URI;
    if (!mongoDB) throw new Error("MongoDB connection URI is missing!");
    mongoose.connect(mongoDB);
    const db = mongoose.connection;
    // Bind connection to error event (to get notification of connection errors)
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    console.log(`Server is listening on port ${port}`);
    app.listen(port);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// start server
start();
