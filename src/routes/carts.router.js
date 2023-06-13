import { Router } from 'express';
import {
    addCartController,
    addProductToCartController,
    deleteProductFromCartController,
    emptyCartController,
    getCartByIdController,
    replaceProductsInCartController,
    updateProductInCartController,

} from '../controllers/carts.controller.js';

const router = Router();

router.post('/', addCartController);

router.get('/:cartId', getCartByIdController);

router.post('/:cartId/products/:productId', addProductToCartController);

router.delete('/:cartId/products/:productId', deleteProductFromCartController);

router.put('/:cartId', replaceProductsInCartController);

router.put('/:cartId/products/:productId', updateProductInCartController);

router.delete('/:cartId', emptyCartController);

export default router;