import ProductManager from '../dao/mongoManagers/productManager.js';

const productManager = new ProductManager();

export const getProductsController = async (req, res) => {
    try {
        const results = await productManager.getProducts(req.query);
        if (results) {
            res.json({ message: "Products does found.", results })
        } else {
            res.json({ message: "there aren't products." })
        }
    } catch (error) {     
        res.status(500).json({ message: error.message })
    }
}

export const getProductByIdController = async (req, res) => { 
    try {
        const { productId } = req.params;
        const productFound = await productManager.getProductById(productId);
        if (productFound) {
            res.json({ message: 'Product was found.', product: productFound })
        } else {
            res.json({ message: "Product wasn't found." })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addProductController = async (req, res) => { 
    try {
        const newProduct = req.body;
        const addedProduct = await productManager.addProduct(newProduct);
        if (addedProduct) {
            res.json({ message: 'The product was added', product: addedProduct })
        } else {
            res.json({ message: "The product wasn't added" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { productId } = req.params;
        const newValuesObject = req.body;
        const updatedProduct = await productManager.updateProduct(productId, newValuesObject);
        if (updatedProduct) {
            res.json({ message: 'The product was updated.', product: updatedProduct })
        } else {
            res.json({ message: "The product wasn't updated." })  
        }    
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProductController =  async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await productManager.deleteProduct(productId);
        if (deletedProduct) {
            res.json({ message: 'The product was deleted.', product: deletedProduct })
        } else {
            res.json({ message: "The product wasn't deleted." })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}