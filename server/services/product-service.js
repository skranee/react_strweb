import productModel from "../models/product-model.js";
import userModel from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";
import ProductModel from "../models/product-model.js";

class ProductService {
    async createProduct(userId, name, description, price, image) {
        const user = await userModel.findById(userId);
        if(!user || user.role !== 'admin') {
            throw ApiError.BadRequest('Not enough rights');
        }
        const product = await productModel.create({
            name: name,
            description: description,
            price: price,
            image: image
        })
        return product;
    }

    async getProducts() {
        return await ProductModel.find();
    }

    async editProduct(userId, productId, name, description, price, image) {
        const user = await userModel.findById(userId);
        if(!user || user.role !== 'admin') {
            throw ApiError.BadRequest('Not enough rights');
        }
        const product = await productModel.findByIdAndUpdate({_id: productId}, {
            name: name,
            description: description,
            price: price,
            image: image
        })
        return product;
    }

    async deleteProduct(productId) {
        return await productModel.deleteOne({_id: productId})
    }
}

export default new ProductService();
