const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  camels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Camel' }]
});

module.exports = mongoose.model('Owner', ownerSchema);
