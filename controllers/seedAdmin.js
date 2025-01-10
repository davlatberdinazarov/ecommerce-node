const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const seedAdmin = async () => {
  try {
    // Foydalanuvchini ma'lumotlar bazasida tekshirish
    const existingUser = await User.findOne({ email: "admin@gmail.com" });
    if (!existingUser) {
      // Parolni xesh qilish
      const hashedPassword = await bcrypt.hash("password", 10);
      // Yangi admin foydalanuvchi yaratish
      const adminUser = new User({
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
      await adminUser.save();
      console.log("Admin user created successfully!");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating admin user:", error.message);
  }
};

module.exports = seedAdmin;
