const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// Create Product

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query).search();
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// Update PRODUCT --- Admin Babu

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Products Not Found",
    });
  }
  prduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product ----Admin

exports.deleteProduct = catchAsyncErrors(async (req, res) => {
  let productToDelete = await Product.findById(req.params.id);
  if (!productToDelete) {
    return res.status(500).json({
      success: false,
      message: "Products Not Found",
    });
  }
  await Product.deleteOne({ _id: productToDelete._id });
  res.status(200).send({
    success: true,
    message: "Product Deleted Successfully",
  });
});

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});
