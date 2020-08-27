const mongoose = require('mongoose');
const ConditionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: false, trim: true },
  isActive: { type: Boolean, default: true }
})

module.exports = mongoose.models.Condition || mongoose.model('Condition', ConditionSchema)