// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const annualsettelmentSchema = new Schema(
//   {
//     //-----------endofServicesSchema---------------------
//     name: { type: String, require: true },
//     subject: { type: String, require: true },
//     date: { type: Date, require: true },
//     employeeNumber: { type: Number, require: true },
//     to: { type: String, require: true },
//     from: { type: String, require: true },
//     vacationStartDate: { type: Date, require: true },
//     joiningDate: { type: Date, require: true },
//     resumingVacation: { type: Number, require: true },

//     //---------------Prepared-----------------------
//     preparedName: { type: String, require: true },
//     preparedDate: { type: Date, require: true },
//     //-----------------HR--------------------
//     hrName: { type: String, require: true },
//     hrDate: { type: Date, require: true },
//     //--------------------Diretor------------------
//     diretorName: { type: String, require: true },
//     diretorDate: { type: Date, require: true },
//   },
//   { timestamps: true, toJSON: { getters: true } }
// );

// export default mongoose.model(
//   "Annualsettelment",
//   annualsettelmentSchema,
//   "annualsettelments"
// );

// import { string } from "joi";
// import mongoose from "mongoose";
const mongoose = require("mongoose");


const Schema=mongoose.Schema;
const Receipt = new Schema({
  doc:{type:Number,require:true},
  date:{type:Date,require:true},
  name:{type:String,require:true},
  amount:{type:Number,require:true},
  membership:{type:String,require:true},
  cash:{type:String,require:true},
  being:{type:String,require:true},
  category:{type:String,require:true},
  microchip:{type:Date,require:true},
})

// export default mongoose.model('Receipt',Receipt,"Receipt")
module.exports = mongoose.model('Receipt', Receipt, 'Receipt');

