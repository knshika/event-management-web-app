const mongoose = require("mongoose")

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
})

module.exports = mongoose.model("Club", clubSchema)
