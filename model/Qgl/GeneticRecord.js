const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: String,
    id: String, // microchip
    age: String,
    sex: { type: String, enum: ["male", "female", ""] },
    breed: String,
    owner: String,
    labNo: String,
  },
  { _id: false }
);

const animalSchema = new mongoose.Schema(
  {
    camel: { type: personSchema, required: true },
    father: { type: personSchema },
    mother: { type: personSchema },
  },
  { _id: false }
);

const geneticRecordSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      tel: { type: String, required: true },
      submissionDate: Date,
      sampleType: {
        type: String,
        enum: ["Blood", "Hair", "Others"],
        default: "Blood",
      },
      processing: {
        type: String,
        enum: ["Normal", "Urgent"],
        default: "Normal",
      },
    },
    animals: {
      type: [animalSchema],
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("GeneticRecord", geneticRecordSchema);
