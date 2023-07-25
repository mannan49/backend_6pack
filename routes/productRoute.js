const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
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
