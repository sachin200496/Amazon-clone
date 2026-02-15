import mongoose from "mongoose";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import { success, error } from "../utils/apiResponse.js";
import { jwt } from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return error(res, "User already exists", 400);
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    if (user) {
      success(res, {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    error(res, err.message, 500);
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      success(res, {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      error(res, "Invalid email or password", 401);
    }
  } catch (err) {
    error(res, err.message, 500);
  }
};