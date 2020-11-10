const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(productController.getAllProduct)
    .post(
        authController.protect,
        productController.createProduct,
    );

router
    .route('/getByCategory')
    .get(productController.getByCategory)
router
    .route('/getByUserId/:id')           //authController.protect,
    .get(productController.getProductByIdUser);

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(
        authController.protect,
        authController.restrictTo('user', 'admin'),
        productController.updateProduct
    )
    .delete(
        authController.protect,
        productController.deleteProduct
    );
module.exports = router;

// authController.protect,
// authController.restrictTo('user', 'admin'),





