const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// Create Product --- Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 10;
  const productCount = await Product.countDocuments;
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
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
// Create new Review or update review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rew) => rew.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rew) => {
      if ((rew) => rew.user.toString() === req.user._id.toString())
        (rew.rating = rating), (rew.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a Single Product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  const review = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.productId.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
