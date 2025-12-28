const express = require("express");
const CamelController = require("../controllers/Qgl/camelController");

const Route = express.Router();

Route.post("/importFathersCamel", CamelController.importFathersCamel);
Route.get("/getFathersCamels", CamelController.getFathersCamels);
module.exports = Route;
