const mongoose = require('mongoose');

const camelSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
  camelName: String,
  microChip: { type: String },
  labNo: String,
  breed: String,
  category: String,
});

module.exports = mongoose.model('Camel', camelSchema);
