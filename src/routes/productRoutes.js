const express = require('express');
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(productController.getAllProduct)
    .post(authController.protect,
        authController.restrictTo('user'),
        productController.createProduct
    );
    router
    .route('/getByCategory')
    .get( productController.getAllLocation);

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
        authController.restrictTo('user', 'admin'),
        productController.deleteProduct
    );
module.exports = router;






// router
//     .route('/tours-within/:distance/center/:latlng/unit/:unit')
//     .get(tourController.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

// router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);



// router.use('/:productId/user', userRouter);  //-->שורה 8
// const router = express.Router({ mergeParams: true });  // -->צריך אולי להחזיר לשורה 9