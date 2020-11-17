const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: "", trim: true },
  isActive: { type: Boolean, default: true },
  user: { type: String, default: "automatic", trim: true },
  pictures: { type: Array, default: [] },
  files: { type: Array, default: [] },
  status: { type: String, default: "in use", trim: true, lowercase: true },
  address: {
    streetNumber: { type: String, trim: true },
    street: { type: String, trim: true },
    street2: { type: String, trim: true },
    city: { type: String, trim: true, lowercase: true },
    province: { type: String, trim: true, lowercase: true },
    country: { type: String, trim: true, lowercase: true }
  },
},
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true }
);

module.exports = mongoose.models.Location || mongoose.model("Location", LocationSchema)