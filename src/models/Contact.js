const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, lowercase: true },
  description: { type: String, default: '', trim: true },
  isActive: { type: Boolean, default: true },
  user: { type: String, default: 'automatic', trim: true },
  pictures: { type: Array, default: [] },
  thumbnail: { type: String, default: 'thumbnail.png' },
  files: { type: Array, default: [] },
  type: { type: String, required: true, trim: true, lowercase: true },
  permissions: { type: Array, default: [] },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  connectInfo: {
    tel: { type: String, trim: true, lowercase: true },
    tel2: { type: String, trim: true, lowercase: true },
    email: { type: String, trim: true, lowercase: true },
    email2: { type: String, trim: true, lowercase: true },
    url: { type: String, trim: true, lowercase: true },
  },
  address: {
    streetNumber: { type: String, trim: true, lowercase: true },
    street: { type: String, trim: true, lowercase: true },
    street2: { type: String, trim: true, lowercase: true },
    city: { type: String, trim: true, lowercase: true },
    province: { type: String, trim: true, lowercase: true },
    country: { type: String, trim: true, lowercase: true }
  },
},
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true }
);

module.exports = mongoose.models.Contact || mongoose.model('Contact', ContactSchema)