import express from "express"
import{ verifyStripe, placeOrderStripe, allOrders, userOrders, updateStatus } from "../Controllers/orderController.js"
import adminAuth from "../Middleware/adminAuth.js"
import authUser from "../Middleware/auth.js"

const orderRouter = express.Router();

//Admin Features
orderRouter.post("/list",adminAuth, allOrders);
orderRouter.post("/status",adminAuth, updateStatus);

//Payment Features
orderRouter.post("/stripe",authUser, placeOrderStripe);

//User Feature
orderRouter.post("/userorders",authUser, userOrders);

//verify payment
orderRouter.post("/verifyStripe",authUser, verifyStripe);

export default orderRouter;