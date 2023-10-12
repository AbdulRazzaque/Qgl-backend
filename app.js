import express from "express";
import dotenv from "dotenv";
import errorhandler from "./middlewares/errorhandler";
import mongoose from "mongoose";
import Route from "./routes";
import path from 'path'
import cors from 'cors'
const app = express();
dotenv.config({
  path: "./config/.env",
});

global.appRoot= path.resolve(__dirname);
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use('/api',Route)
app.use('/uploads',express.static('uploads'))


mongoose
  .connect(process.env.BATA_BASE_CONNECTION, {})
  .then((response) => {
    console.log("Connection Successfully.");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(errorhandler);
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
