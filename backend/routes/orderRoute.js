const express = require('express');
const authMiddleWare = require('../middleware/auth.js');
const { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } = require('../controllers/orderController.js');

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleWare, placeOrder);
orderRouter.post('/verify', verifyOrder);
orderRouter.post('/userorders', authMiddleWare, userOrders);
orderRouter.get('/list', listOrders);
orderRouter.post('/status', updateStatus);

module.exports = orderRouter;
