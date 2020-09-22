const mongoose = require('mongoose');
const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, lowercase: true },
  description: { type: String, default: '', trim: true },
  isActive: { type: Boolean, default: true },
  user: { type: String, default: 'automatic', trim: true }
},
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true }
);

module.exports = mongoose.models.SubCategory || mongoose.model('SubCategory', SubCategorySchema)