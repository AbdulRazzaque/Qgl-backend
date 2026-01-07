// import GeneticRecord from "../../model/Qgl/GeneticRecord";
const GeneticRecord = require("../../model/Qgl/GeneticRecord");

const geneticController ={
 async createGeneticRecord(req, res) {
  try {
    const { receiptId, animals, sampleType, processing } = req.body;

    if (!receiptId) {
      return res.status(400).json({ message: "Receipt ID is required" });
    }

    if (!Array.isArray(animals) || animals.length === 0) {
      return res.status(400).json({
        message: "At least one animal record is required",
      });
    }

    const record = await GeneticRecord.create({
      receiptId,
      animals,
      sampleType,
      processing,
    });

    return res.status(201).json({
      message: "Genetic record created successfully",
      data: record,
    });
  } catch (error) {
    console.error("Create Genetic Record Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
},

async getGeneticRecords(req, res) {
  try {
    const records = await GeneticRecord.find()
      .populate("receiptId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error("Get Genetic Records Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
},

async updateGeneticRecord(req, res) {
  try {
    const { id } = req.params;
    const { animals, sampleType, processing } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Record id is required" });
    }

    if (!Array.isArray(animals) || animals.length === 0) {
      return res.status(400).json({
        message: "At least one animal record is required",
      });
    }

    const updated = await GeneticRecord.findByIdAndUpdate(
      id,
      { animals, sampleType, processing },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Genetic record not found" });
    }

    return res.status(200).json({
      message: "Genetic record updated successfully",
      data: updated,
    });
  } catch (error) {
    console.error("Update Genetic Record Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
},
async deleteGeneticRecord(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Record id is required" });
    }
    const deleted = await GeneticRecord.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Genetic record not found" });
    }
    return res.status(200).json({ message: "Genetic record deleted successfully" });
  } catch (error) {
    console.error("Delete Genetic Record Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
},
}
module.exports = geneticController;