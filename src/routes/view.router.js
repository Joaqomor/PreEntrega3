import { Router } from 'express';
import { 
    getProductsController,
    getRealTimeProductsController,
    getProductsForUserController,
    getCartController,
    renderLoginController,
    renderRegisterController,
    renderErrorRegisterController,
    renderErrorLoginController,
} from '../controllers/views.controller.js';

const router = Router();

router.get('/', getProductsController);

router.get('/realTimeProducts', getRealTimeProductsController);

router.get('/products', getProductsForUserController);

router.get('/carts/:cartId', getCartController);

router.get('/login', renderLoginController);

router.get('/register', renderRegisterController);

router.get('/errorRegister', renderErrorRegisterController);

router.get('/errorLogin', renderErrorLoginController);

export default router;