const mongoose = require("mongoose");
 

const Schema= mongoose.Schema;
const Membership = new Schema({
    membershipno:{type:String,unique: true,require:true},
    ownername:{type:String,require:true},
    nationality:{type:String,require:true},
    nationalid:{type:Number,require:true},
    telephone:{type:Number},
    extratelelphone:{type:Number},

})


module.exports = mongoose.model('Membership', Membership, 'Membership')