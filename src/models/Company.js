const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, lowercase: true },
  description: { type: String, default: '', trim: true },
  isActive: { type: Boolean, default: true },
  user: { type: String, default: 'automatic', trim: true },
  pictures: { type: Array, default: [] },
  files: { type: Array, default: [] },
  companyFullName: { type: String, unique: true, trim: true, lowercase: true },
  connectInfo: {
    tel: { type: String, trim: true, lowercase: true },
    tel2: { type: String, trim: true, lowercase: true },
    email: { type: String, trim: true, lowercase: true },
    email2: { type: String, trim: true, lowercase: true },
    url: { type: String, trim: true, lowercase: true },
    address: {
      streetNumber: { type: String, trim: true, lowercase: true },
      street: { type: String, trim: true, lowercase: true },
      street2: { type: String, trim: true, lowercase: true },
      city: { type: String, trim: true, lowercase: true },
      province: { type: String, trim: true, lowercase: true },
      country: { type: String, trim: true, lowercase: true }
    },
  }
},
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true }
);

module.exports = mongoose.models.Company || mongoose.model('Company', CompanySchema)