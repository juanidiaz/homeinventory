const mongoose = require("mongoose");

const LogEntrySchema = new mongoose.Schema(
  {
    code: { type: String },
    user: { type: String },
    message: { type: String },
    action: { type: String },
    raw: { type: Object }
  },
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true }
);

module.exports = mongoose.models.LogEntry || mongoose.model('LogEntry', LogEntrySchema)