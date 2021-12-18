const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      max: 255,
      min: 4,
    },
    description: {
      type: String,
      required: true,
      max: 255,
      min: 6,
    },
    eventDetails: {
      eventType: {
        //technical, cultural , social
        type: String,
        max: 1024,
        min: 8,
      },
      isFreeEvent: {
        type: Boolean,
        default: true,
      },
      // judges: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      participationType: {
        //solo ,groupOf
        type: String,
        max: 1024,
        min: 8,
      },
    },
    eventDates: {
      registrationStart: {
        type: Date,
        required: true,
      },
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
      result: {
        type: Date,
      },
    },
    prizes: [
      {
        type: {
          //1st 2nd, 3rd
          type: String,
          required: true,
          max: 255,
          min: 3,
        },
        winner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },
        amount: {
          type: Number,
          required: true,
          length: 7,
        },
      },
    ],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("Event", eventSchema)
