const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.get("/", getAllProducts);
router.get("/product-details/:id", getProductDetails);
router.post(
  "/admin/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  createProduct
);
router.put("/review", isAuthenticatedUser, createProductReview);
router.get("/reviews", getProductReviews);
router.delete("/reviews", isAuthenticatedUser, deleteReview);
router.put(
  "/admin/update/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);
router.delete(
  "/admin/delete/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

module.exports = router;
