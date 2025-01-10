const express = require("express");
const ProductController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleCheckMiddleware = require("../middlewares/roleCheckMiddleware");

const router = express.Router();

// Foydalanuvchilar uchun mahsulotlarni olish
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);

// Faqat admin mahsulot qo'sha olishi uchun middleware qo'shildi
router.post(
  "/",
  authMiddleware,
  roleCheckMiddleware("admin"),
  ProductController.createProduct
);

// Faqat admin mahsulotni yangilashi yoki o'chirishi uchun middleware qo'shildi
router.put(
  "/:id",
  authMiddleware,
  roleCheckMiddleware("admin"),
  ProductController.updateProduct
);

router.delete(
  "/:id",
  authMiddleware,
  roleCheckMiddleware("admin"),
  ProductController.deleteProduct
);

module.exports = router;
