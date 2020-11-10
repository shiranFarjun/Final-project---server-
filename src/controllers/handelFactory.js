const { SchemaType } = require('mongoose');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.getAll = Model => async (req, res, next) => {
    // const doc = await features.query.explain();
    const doc = await Model.find();

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: doc.length,
        data: {
            data: doc
        }
    });
};

exports.getOne = (Model, popOptions) => async (req, res, next) => {
    // let query = Model.findById(req.params.id);
    // if (popOptions) query = query.populate(popOptions);
    const doc = await Model.findById(req.params.id);
    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
};

// '5fa942a5630316bda845302c' ziv
//5fa942bc630316bda845302d ziv location

//5fa95017b014b64c0c69ad9a //shiran&avi


exports.deleteOne = Model => async (req, res, next) => {
    User.findByIdAndUpdate(req.user._id,
        { $pull: { productsID: req.params.id } },
        { safe: true, upsert: true },
        function (err) {
            if (err) {
                console.log(err);

            } else {
                console.log('Remove product from productsID in user');
            }
        }
    );
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
};

exports.updateOne = Model => async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
};

exports.createOne = (Model, typeModel = null) => async (req, res, next) => {
    if (typeModel === 'Product') {
        req.body.user = req.user.id;
    }
    const doc = await Model.create(req.body);

    // find by document id and update and push item in array
    User.findByIdAndUpdate(req.user.id,
        { $push: { productsID: doc._id } },
        { safe: true, upsert: true },
        function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('success update productsID in user');
            }
        }
    );

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
};






////////////////////////////////////////
// exports.getAll = Model => async (req, res, next) => {
//     let filter = {};
//     if (req.params.tourId) filter = { tour: req.params.tourId };

//     const features = new APIFeatures(Model.find(filter), req.query)
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate();

//     // const doc = await features.query.explain();
//     const doc = await features.query;

//     // SEND RESPONSE
//     res.status(200).json({
//         status: 'success',
//         results: doc.length,
//         data: {
//             data: doc
//         }
//     });
// };



// exports.getOne = (Model, popOptions) => async (req, res, next) => {
//     let query = Model.findById(req.params.id);
//     if (popOptions) query = query.populate(popOptions);
//     const doc = await query;

//     if (!doc) {
//         return next(new AppError('No document found with that ID', 404));
//     }

//     res.status(200).json({
//         status: 'success',
//         data: {
//             data: doc
//         }
//     });
// };
