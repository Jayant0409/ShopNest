const express = require("express");
const { addOrderItems, getOrders, getMyOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const router = express.Router()


router.post("/",protect, addOrderItems);
router.get("/",protect, admin,getOrders);
router.get("/myOrders",protect,getMyOrders);
router.put("/:id/status",protect,admin, updateOrderStatus)


module.exports = router;