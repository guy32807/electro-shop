import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);  

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, 'Product name is required']
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    brand: {
      type: String,
      required: [true, 'Brand name is required']
    },
    category: {
      type: String,
      required: [true, 'Product category is required']
    },
    reviews: [reviewSchema],
    price: {
      type: Number,
      required: [true, 'Price is required'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'Number of items in stock is required'],
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;