const mongoose = require("mongoose");
const PolicySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: "", trim: true },
  isActive: { type: Boolean, default: true },
  user: { type: String, default: "automatic", trim: true },
  pictures: { type: Array, default: [] },
  files: { type: Array, default: [] },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  contact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contact"
  },
  policyNumber: { type: String, trim: true },
  type: { type: String, trim: true, lowercase: true },
  subType: { type: String, trim: true, lowercase: true },
  inCaseOfEmergency: { type: String, trim: true },
  dateStart: { type: Date },
  dateEnd: { type: Date },
  dateRenewal: { type: Date },
  dateRenewalReminder: { type: Date },
  cost: { type: Number, trim: true },
  paymentType: { type: String, trim: true, lowercase: true }
},
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true }
);

module.exports = mongoose.models.Policy || mongoose.model("Policy", PolicySchema)