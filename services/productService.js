const Product = require("../models/productModel");

class ProductService {
    static async getAllProducts() {
        return await Product.find({});
    }

    // ID boyicha
    static async getProductById(id) {
        return await Product.findById(id);
    }

    static async createProduct(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    static async updateProduct(id, updatedProductData) {
        return await Product.findByIdAndUpdate(id, updatedProductData, { new: true });
    }

    // Delete products
    static async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = ProductService;