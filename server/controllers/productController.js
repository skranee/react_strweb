import productService from "../services/product-service.js";

class ProductController{
    async getProducts(req, res, next) {
        try {
            return res.json(await productService.getProducts());
        } catch(e) {
            next(e);
        }
    }

    async createProduct(req, res, next) {
        try {
            const {userId, name, description, price, image} = req.body;
            const newProduct = await productService.createProduct(userId, name, description, price, image);
            return res.json(newProduct);
        } catch(e) {
            next(e);
        }
    }

    async editProduct(req, res, next) {
        try {
            const {userId, productId, name, description, price, image} = req.body;
            const edit = await productService.editProduct(userId, productId, name, description, price, image);
            return res.json(edit);
        } catch(e) {
            next(e);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const {productId} = req.params;
            const deleteP = await productService.deleteProduct(productId);
            return deleteP;
        } catch(e) {
            next(e);
        }
    }
}

export default new ProductController();
