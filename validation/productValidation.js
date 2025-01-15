const Joi = require("joi");

const productValidationSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.min": "Mahsulot nomi kamida 3 ta belgidan iborat bo'lishi kerak",
    "any.required": "Mahsulot nomi majburiy",
  }),
  price: Joi.number().positive().required().messages({
    "number.positive": "Narx musbat bo'lishi kerak",
    "any.required": "Narx majburiy",
  }),
  description: Joi.string().max(500).messages({
    "string.max": "Mahsulot tavsifi 500 belgidan oshmasligi kerak",
  }),
  stock: Joi.number().min(0).default(0).messages({
    "number.min": "Stok qiymati 0 dan katta bo'lishi kerak",
  }),
  category: Joi.string().required().messages({
    "any.required": "Kategoriya majburiy",
  }),
});

module.exports = productValidationSchema;
