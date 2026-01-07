const express = require("express");
const GeneticController = require("../controllers/Qgl/geneticController");

const Route = express.Router(); 
Route.post("/createGeneticRecord", GeneticController.createGeneticRecord);
Route.get("/getGeneticRecords", GeneticController.getGeneticRecords);
Route.put("/updateGeneticRecord/:id", GeneticController.updateGeneticRecord);
Route.delete("/deleteGeneticRecord/:id", GeneticController.deleteGeneticRecord);
module.exports = Route;