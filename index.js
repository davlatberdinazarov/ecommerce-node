const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const logger = require("./logger");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes")
const seedAdmin = require("./controllers/seedAdmin");
// const seedAdmin = require("./controllers/seedAdmin");

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim()),
  }
}));

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use('/api/users', userRoutes);

// MongoDB bilan ulanish
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB ga muvaffaqiyatli ulandik!");
    await seedAdmin(); // Admin foydalanuvchini yaratish
  })
  .catch((err) => {
    console.error("MongoDB bilan ulanishda xato yuz berdi:", err.message);
  });

// Serverni ishga tushirish
const port = process.env.PORT || 4001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
