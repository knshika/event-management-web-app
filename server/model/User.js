const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      max: 255,
      min: 6,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 8,
    },
    rollNo: {
      type: Number,
      unique: true,
      required: true,
      length: 7,
    },
    branch: {
      type: String,
      required: true,
      max: 255,
      min: 3,
    },
    batch: {
      type: Number,
      required: true,
      length: 4,
    },
    mobileNo: {
      type: Number,
      unique: true,
      required: true,
      length: 10,
    },
    superAdmin: {
      type: Boolean,
      default: false,
    },
    participatedEvents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    ],
    adminOfClub: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)
