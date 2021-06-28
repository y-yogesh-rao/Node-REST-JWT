const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/orderControllers');
const authenticationRequired = require('../middlewares/check_auth');

router.get('/getOrder/:orderId', orderControllers.getOrderDetails);

router.post('/addOrder', authenticationRequired, orderControllers.addOrder);

router.delete('/deleteOrder/:orderId', authenticationRequired, orderControllers.deleteOrder);

module.exports = router;