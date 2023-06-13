import CartManager from '../dao/mongoManagers/cartManager.js';

const cartManager = new CartManager();

export const addCartController = async (req, res) => {
    try {
        const addedCart = await cartManager.addCart();
        res.json({ message: `The cart was created with ID ${addedCart._id}.` })
    } catch (error) {
        console.log(error);
    }
}

export const getCartByIdController = async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await cartManager.getProductsFromCart(cartId);
        if (cart) {
            res.json({ message: 'Cart was found.', cart: cart })
        } else { 
            res.json({ message: "Cart wasn't found." })
        }
    } catch (error) {
        console.log(error);
    }
}

export const addProductToCartController = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const addedProduct = await cartManager.addProductToCart(cartId, productId);
        if (addedProduct) {
            res.json({ message: 'The product was added to the cart.', product: addedProduct })
        } else {
            res.json({ message: "The product wasn't added to the cart." })
        }
    } catch (error) {
        console.log(error);
    }
}

export const deleteProductFromCartController = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const cart = await cartManager.deleteProductInCart(cartId, productId);
        if (cart) {
            res.json({ message: 'The product was deleted to the cart.', cart: cart })
        } else {
            res.json({ message: "The product wasn't deleted to the cart." })
        }
    } catch (error) {
        console.log(error);
    }
}

export const replaceProductsInCartController = async (req, res) => {
    try {
        const { cartId } = req.params;
        const products = req.body;
        const cart = await cartManager.replaceProductsInCart(cartId, products);
        if (cart) {
            res.json({ message: 'The products was updated', cart: cart })
        } else {
            res.json({ message: "The products wasn't updated" })
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateProductInCartController = async (req, res) => {
    try {
        const { cartId, productId } = req.params;
        const { quantity } = req.body;
        const cart = await cartManager.updateProductInCart(cartId, productId, quantity);
        if (cart) {
            res.json({ message: 'The products was updated', cart: cart })
        } else {
            res.json({ message: "The products wasn't updated" })
        }
    } catch (error) {
        console.log(error);
    }
}

export const emptyCartController = async (req, res) => {
    try {
        const { cartId } = req.params;
        const cart = await cartManager.emptyCart(cartId);
        if (cart) {
            res.json({ message: 'The cart is empty', cart: cart })
        } else {
            res.json({ message: "the cart wasn't emptied" })
        }
    } catch (error) {
        console.log(error);
    }
}