// const express = require('express');
const User = require('../models/userModel')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const sendResponse = (response, data, msg, statusCode) => {

  return response.status(statusCode).json({
    msg: msg,
    data,
  });
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});
exports.getCurrentUser = async (req, res, next) => {
  const getCurrentUser = await User.findOne({ _id: req.user.id }).exec();

  res.status(200).json({
    status: 'success',
    data: {
      user: getCurrentUser
    }
  });
};


exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getUser = async (req, res) => {

  //  let query = Model.findById(req.params.id);
  // if (popOptions) query = query.populate(popOptions);
  const doc = await User.findById(req.params.id);
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
exports.createUser = async (req, res) => {
  const newProfile = req.body;
  try {
    const user = await User.create(newProfile);
    return sendResponse(res, user, 'create base obj user', 200);
  } catch (e) {
    return sendResponse(res, e, 'cant create base obj user', 400);
  }
};
exports.updateUser =async (req, res) => {
  const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
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
exports.deleteUser = async(req, res) => {
  const doc = await User.findByIdAndUpdate(req.user.id, { active: false });
 
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


// exports.getUser = factory.getOne(User);
// exports.getAllUsers = factory.getAll(User);

// // Do NOT update passwords with this!
// exports.updateUser = factory.updateOne(User);
// exports.deleteUser = factory.deleteOne(User);