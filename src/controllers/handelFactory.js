const AppError = require('../utils/appError');


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
    const doc = await Model.findById(req.params.id);;

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


exports.deleteOne = Model => async (req, res, next) => {
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

exports.createOne = Model => async (req, res, next) => {
    const doc = await Model.create(req.body);

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
