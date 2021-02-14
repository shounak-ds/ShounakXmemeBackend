const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },

    Caption: {
      type: String,
      required: true,
    },

    src: {
      type: String,
      required: true,
    },

    PostDate: {
      type: Date,
      required: false,
    },

    _id: {
      type: Number,
      required: true,
    }
  }

);

 module.exports = mongoose.model("Image", ImageSchema);