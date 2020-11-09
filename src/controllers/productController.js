// const multer = require('multer');
// const sharp = require('sharp');
const Product = require('../models/productModel');
const factory = require('./handelFactory');
var mongoose = require('mongoose');



exports.getAllProduct = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);   //exports.getProduct = factory.getOne(Product, { path: 'reviews' });
exports.createProduct = factory.createOne(Product,'Product');
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);

exports.getProductByIdUser=async (req, res, next) => {
    console.log(' in getProductByIdUser server side',req.params.id);

    // const query = req.user.id; 
    // console.log('i am in getByUserId',query);

//     const o_id = new ObjectId(query);
// console.log('o_id',o_id);
    const productsByCategory = await Product.find({ user: mongoose.Types.ObjectId(req.params.id)})
    if (!productsByCategory) {
      return res.status(404).send()
    }
    res.status(200).json({
        status: 'success to get by id user',
        result: productsByCategory.length,
        productsByCategory
        
    });
}
exports.getByCategory =async (req, res, next) => {
    console.log('you in get all location ');
    const { category } = req.query; 
    try {
    const productsByCategory = await Product.find({ category: category })
    if (!productsByCategory) {
      return res.status(404).send()
    }
   
    res.status(200).json({
        status: 'success',
        result: productsByCategory.length,
        data: {
            data: productsByCategory
        }
    });
    //second option 
    // const resNumber = await Restaurant.countDocuments({ cuisine: _cuisine })
    // console.log(resNumber);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.updateUserFieldProductID=async (req, res, next) => {
    console.log('res data');
    // const { category } = req.query; 
    // try {
    // const productsByCategory = await Product.find({ category: category })
    // if (!productsByCategory) {
    //   return res.status(404).send()
    // }
   
    // res.status(200).json({
    //     status: 'success',
    //     result: productsByCategory.length,
    //     data: {
    //         data: productsByCategory
    //     }
    // });
    //second option 
    // const resNumber = await Restaurant.countDocuments({ cuisine: _cuisine })
    // console.log(resNumber);
//   } catch (error) {
//     res.status(500).send(error);
//   }
}

   
// const AppError = require('../utils/appError');

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image! Please upload only images.', 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter
// });

// exports.uploadTourImages = upload.fields([
//   { name: 'imageCover', maxCount: 1 },
//   { name: 'images', maxCount: 3 }
// ]);

// upload.single('image') req.file
// upload.array('images', 5) req.files

// exports.resizeTourImages = async (req, res, next) => {
//   if (!req.files.imageCover || !req.files.images) return next();

//   // 1) Cover image
//   req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
//   await sharp(req.files.imageCover[0].buffer)
//     .resize(2000, 1333)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/tours/${req.body.imageCover}`);

//   // 2) Images
//   req.body.images = [];

//   await Promise.all(
//     req.files.images.map(async (file, i) => {
//       const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

//       await sharp(file.buffer)
//         .resize(2000, 1333)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/tours/${filename}`);

//       req.body.images.push(filename);
//     })
//   );

//   next();
// };




// /tours-within/:distance/center/:latlng/unit/:unit
// /tours-within/233/center/34.111745,-118.113491/unit/mi
// exports.getToursWithin = async (req, res, next) => {
//   const { distance, latlng, unit } = req.params;
//   const [lat, lng] = latlng.split(',');

//   const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

//   if (!lat || !lng) {
//     next(
//       new AppError(
//         'Please provide latitutr and longitude in the format lat,lng.',
//         400
//       )
//     );
//   }

//   const tours = await Product.find({
//     startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
//   });

//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       data: tours
//     }
//   });
// };

// exports.getDistances = async (req, res, next) => {
//   const { latlng, unit } = req.params;
//   const [lat, lng] = latlng.split(',');

//   const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

//   if (!lat || !lng) {
//     next(
//       new AppError(
//         'Please provide latitutr and longitude in the format lat,lng.',
//         400
//       )
//     );
//   }

//   const distances = await Product.aggregate([
//     {
//       $geoNear: {
//         near: {
//           type: 'Point',
//           coordinates: [lng * 1, lat * 1]
//         },
//         distanceField: 'distance',
//         distanceMultiplier: multiplier
//       }
//     },
//     {
//       $project: {
//         distance: 1,
//         name: 1
//       }
//     }
//   ]);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       data: distances
//     }
//   });
// };