const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

router.post("/new", isAuthenticatedUser, newOrder);
router.get("/me", isAuthenticatedUser, myOrders);
router.get("/:id", isAuthenticatedUser, getSingleOrder);
router.get(
  "/admin/orders",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllOrders
);
router.put(
  "/admin/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateOrderStatus
);
router.delete(
  "/admin/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteOrder
);

module.exports = router;
