const mongoose = require("mongoose");
 

const Schema= mongoose.Schema;
const MotherCamel = new Schema({
    ownerName:{type:String,unique: true,require:true},
    camelName:{type:String,require:true},
    microChipId:{type:Number,require:true},
    labNO:{type:String},
    breed:{type:String,require:treu},
    category:{type:String},

},{timestamps:true})

MotherCamel.index({ ownerName: 1 }, { unique: true });
module.exports = mongoose.model('MotherCamel', FatherCamel, 'MotherCamel')