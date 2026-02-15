import Order from "../models/orderModel.js";
import { success, error } from "../utils/apiResponse.js";

export const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        success(res, order);}
    catch (err) {
        error(res, err.message, 500);
    }};

export const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({user: req.user._id}).populate("user", "name email").populate("orderItems.product", "name price"); 
        success(res, orders);}
    catch (err) {
        error(res, err.message, 500);
    }}

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("orderItems.product", "name price"); 
    success(res, orders);}
        catch (err) {
        error(res, err.message, 500);
    }}