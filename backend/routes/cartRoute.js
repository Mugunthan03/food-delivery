const express = require('express');
const { addToCart, removeFromCart, fetchCart } = require('../controllers/cartController.js');
const authMiddleWare = require('../middleware/auth.js');

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleWare, addToCart);
cartRouter.post('/remove', authMiddleWare, removeFromCart);
cartRouter.post('/get', authMiddleWare, fetchCart);

module.exports = cartRouter;
