const express = require("express");
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middlewares/auth");

const router = express.Router();

router.get("/", isAuthenticatedUser, authorizeRoles("admin"), getAllProducts);
router.get("/product-details/:id", getProductDetails);
router.post("/new", isAuthenticatedUser, createProduct);
router.put("/update/:id", isAuthenticatedUser, updateProduct);
router.delete("/delete/:id", isAuthenticatedUser, deleteProduct);

module.exports = router;
