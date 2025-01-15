const Joi = require("joi");

const userValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "To'g'ri email manzil kiriting",
      "any.required": "Email majburiy",
    }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Parol uzunligi kamida 6 ta belgidan iborat bo'lishi kerak",
    "any.required": "Parol majburiy",
  }),
  role: Joi.string().valid("admin", "user").default("user").messages({
    "any.only": "Rol faqat 'admin' yoki 'user' bo'lishi mumkin",
  }),
  refreshToken: Joi.string().optional().default(null),
});

module.exports = userValidationSchema;
