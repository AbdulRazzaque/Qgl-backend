const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FatherCamelSchema = new Schema({
  camelName: { type: String, required: true },
  microChipId: { type: String }, // microChipId is now optional
  labNO: { type: String },
  breed: { type: String }, // breed is now optional
  category: { type: String }
});

const FatherOwnerSchema = new Schema({
  ownerName: { type: String, required: true, unique: true },
  camels: [FatherCamelSchema]
}, { timestamps: true });

module.exports = mongoose.model("FatherOwner", FatherOwnerSchema);
