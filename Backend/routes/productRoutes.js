const express = require("express");
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/productController.js");
const { protect } = require("../middleware/authMiddleware.js");
const { admin } = require("../middleware/adminMiddleware.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", getProducts);
router.post("/", protect, admin, upload.single("image"), createProduct);

router.get("/:id", getProductById);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;


