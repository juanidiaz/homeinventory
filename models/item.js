const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema({

  // NON-VISUAL INFO
  isActive: { type: Boolean, default: true },
  user: { type: String, default: "automatic", trim: true },

  // BASIC INFO
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: "", trim: true },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  // ADDITIONAL INFO
  pictures: { type: Array, default: [] },
  files: { type: Array, default: [] },

  // ADVANCED INFO
  condition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Condition",
  },
  notes: { type: String, default: "", trim: true },
  estimatedValue: { type: Number, trim: true },
  model: { type: String, trim: true },
  brand: { type: String, trim: true },
  serialNumber: { type: String, trim: true },
  purchaseInfo: {
    purchaseDate: { type: Date },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    cost: { type: Number, trim: true },
    waranty: { type: Boolean, default: true },
    contract: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract",
    },
    invoiceImage: { type: String, trim: true },
    purchaseNotes: { type: String, default: "", trim: true }
  }
},
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true }
);

module.exports = mongoose.models.Item || mongoose.model("Item", ItemSchema)