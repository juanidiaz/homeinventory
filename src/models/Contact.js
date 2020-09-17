const mongoose = require('mongoose');
const mongodbErrorHandler = require("mongoose-mongodb-errors");

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
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  password: { type: String, required: true, trim: true },
  // password: { type: String, required: true, trim: true, select: false },
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

/* The MongoDBErrorHandler plugin gives us a better 'unique' error, rather than: "11000 duplicate key" */
// ContactSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.models.Contact || mongoose.model('Contact', ContactSchema)