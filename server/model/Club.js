const mongoose = require("mongoose")

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      max: 255,
      min: 6,
    },
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Club", clubSchema)
