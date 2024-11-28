import $api from "../http";

export default class ProductService{
    static async getProducts() {
        return await $api.get('/products');
    }

    static async createProduct(userId: string, name: string, description: string, price: number, image: string) {
        return await $api.post('/products', {userId, name, description, price, image});
    }

    static async editProduct
    (userId: string, productId: string, name: string, description: string, price: number, image: string) {
        return await $api.put('/products', {userId, productId, name, description, price, image});
    }

    static async deleteProduct(userId: string, productId: string) {
        return await $api.delete(`/products/${productId}`);
    }
}