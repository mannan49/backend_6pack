const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter product name"] },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: { type: Number, default: 0 },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
    maxLength: [4, "Price cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    deafult: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
