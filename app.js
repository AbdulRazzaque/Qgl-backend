
const express = require("express");
const dotenv = require("dotenv");
const errorhandler = require("./middlewares/errorhandler.js");
const mongoose = require("mongoose");
const Route = require("./routes/index.js");
const path = require('path');
const cors = require('cors');
const camelRoutes = require("./routes/camelRoutes.js")
const geneticRoutes = require("./routes/geneticRoutes.js")


const app = express();

dotenv.config({
  path: "./config/.env",
});

// global.appRoot= path.resolve(__dirname);
app.use(cors({
  origin: "http://localhost:3000", // frontend ka origin
  credentials: true,               // allow cookies/auth headers
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
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
app.use('/api/camels', camelRoutes);
app.use('/api/genetic', geneticRoutes);
app.use(errorhandler);
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
