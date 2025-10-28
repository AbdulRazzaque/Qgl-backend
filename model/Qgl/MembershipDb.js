const mongoose = require("mongoose");
 

const Schema= mongoose.Schema;
const Membership = new Schema({
    membershipno:{type:String,unique: true,require:true,index:true},
    ownername:{type:String,require:true},
    nationalid:{type:String},
    nationality:{type:String},
    telephone:{type:String},
    extratelelphone:{type:String},

},{timestamps:true})

Membership.index({ membershipno: 1 }, { unique: true });
module.exports = mongoose.model('Membership', Membership, 'Membership')