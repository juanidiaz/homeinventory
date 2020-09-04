const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, lowercase: true },
  description: { type: String, default: '', trim: true },
  isActive: { type: Boolean, default: true },
  user: { type: String, default: 'automatic', trim: true },
  pictures: { type: Array, default: [] },
  files: { type: Array, default: [] },
  subCategories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory',
  }],

},
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true }
);

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema)