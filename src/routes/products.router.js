import { Router } from 'express';
import {
    getProductsController,
    getProductByIdController,
    addProductController,
    updateProductController,
    deleteProductController
} from '../controllers/products.controller.js';

const router = Router();

router.get('/', getProductsController);

router.get('/:productId', getProductByIdController);

router.post('/', addProductController);

router.put('/:productId', updateProductController);

router.delete('/:productId', deleteProductController);

export default router;