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
    .get(productController.getByCategory);

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





// router.use('/:productId/user', userRouter);  //-->שורה 8
// const router = express.Router({ mergeParams: true });  // -->צריך אולי להחזיר לשורה 9