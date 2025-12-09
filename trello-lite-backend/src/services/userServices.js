const User = require("../models/User");

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.createUser = async (data) => {
  const { name, email } = data;

  if (!name) {
    const err = new Error("Name is required");
    err.statusCode = 400;
    throw err;
  }

  if (!email) {
    const err = new Error("Email is required");
    err.statusCode = 400;
    throw err;
  }

  if (!isValidEmail(email)) {
    const err = new Error("Invalid email format");
    err.statusCode = 400;
    throw err;
  }

  // check if email already exists
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error("Email already exists");
    err.statusCode = 409; // conflict
    throw err;
  }

  const user = await User.create({ name, email });
  return user;
};

exports.getAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

exports.getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }
  return user;
};

exports.updateUser = async (id, data) => {
  const { name, email } = data;

  if (!name && !email) {
    const err = new Error("Nothing to update");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findById(id);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  if (email) {
    if (!isValidEmail(email)) {
      const err = new Error("Invalid email format");
      err.statusCode = 400;
      throw err;
    }
    const exists = await User.findOne({ email });
    if (exists && exists._id.toString() !== id) {
      const err = new Error("Email already in use by another account");
      err.statusCode = 409;
      throw err;
    }
    user.email = email;
  }

  if (name) user.name = name;

  await user.save();
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  await User.findByIdAndDelete(id);
};
