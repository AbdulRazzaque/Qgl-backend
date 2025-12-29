
const mongoose = require("mongoose");


const Schema=mongoose.Schema;
const Receipt = new Schema({
  doc:{type:String,require:true},
  date:{type:Date,require:true},
  name:{type:String,require:true},
  amount:{type:Number,require:true},
  membership:{type:String,require:true},
  cash:{type:String,require:true},
  being:{type:String,require:true},
  category:{type:String,require:true},
  microchip:{type:Date,require:true},
  telephone:{type:String,require:true},
  createdBy: { type: String, required: false },
  createdByRole: { type: String, required: false },
})

// export default mongoose.model('Receipt',Receipt,"Receipt")
module.exports = mongoose.model('Receipt', Receipt, 'Receipt');

