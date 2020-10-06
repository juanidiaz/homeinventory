const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true, lowercase: true },
  description: { type: String, default: "", trim: true },
  isActive: { type: Boolean, default: true },
  user: { type: String, default: "automatic", trim: true },
  pictures: { type: Array, default: [] },
  files: { type: Array, default: [] },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
  }
},
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true }
);

module.exports = mongoose.models.Room || mongoose.model("Room", RoomSchema)