const mongoose = require("mongoose");

const Mobile = new mongoose.Schema(
    {
        devicename:{
            type: String,
            required: [true,"Enter full name"],
            trim: true
        },
        price:{
            type: String,
            required: [true,"Enter price"],
        },
        devicetype:{
            type: String,
            required: [true,"Select Gender"],
            trim: true
        },
        description:{
            type: String,
            required: [true,"Enter description"],
            trim: true
        },
        photo: {
            type: String,
            default: "no-photo.jpg",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    }
);

module.exports = mongoose.model("Mobile",Mobile);
