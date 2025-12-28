const mongoose = require("mongoose");
 

const Schema= mongoose.Schema;
const childCamel = new Schema({
    ownerName:{type:String,unique: true,require:true},
    camelName:{type:String,require:true},
    microChipId:{type:Number,require:true},
    labNO:{type:String},
    breed:{type:String,require:treu},
    category:{type:String},

},{timestamps:true})

childCamel.index({ ownerName: 1 }, { unique: true });
module.exports = mongoose.model('childCamel', childCamel, 'childCamel')