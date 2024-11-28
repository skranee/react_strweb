import { Router } from 'express';
import userController from "../controllers/userController.js";
import reviewController from "../controllers/reviewController.js";
import productController from "../controllers/productController.js";

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/reviews', reviewController.getReview)
router.post('/review', reviewController.createReview)
router.get('/products', productController.getProducts)
router.post('/products', productController.createProduct)
router.put('/products', productController.editProduct)
router.delete('/products/:productId', productController.deleteProduct)

export default router;