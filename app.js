// import express from "express";
// import dotenv from "dotenv";
// import errorhandler from "./middlewares/errorhandler.js";
// import mongoose from "mongoose";
// import Route from "./routes/index.js";
// import path from 'path'
// import cors from 'cors'
const express = require("express");
const dotenv = require("dotenv");
const errorhandler = require("./middlewares/errorhandler.js");
const mongoose = require("mongoose");
const Route = require("./routes/index.js");
const path = require('path');
const cors = require('cors');

const app = express();

dotenv.config({
  path: "./config/.env",
});

// global.appRoot= path.resolve(__dirname);
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json());7
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
