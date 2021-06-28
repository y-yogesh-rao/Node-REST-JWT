const Order = require('../models/orderSchema');

exports.getOrderDetails = (req, res) => {

    Order.findById(req.params.orderId)
        .populate('productId')
        .then(order => res.status(200).json({
            success: true,
            message: 'Search Successful!',
            orderDetails: order ? order : 'Order Not Found!'
        }))
        .catch(error => res.status(500).json({
            success: false,
            message: 'Something Went Wrong!',
            errorDetails: error
        }));
}

exports.addOrder = (req, res) => {
    let order = new Order({
        productId: req.body.productId,
        quantity: req.body.quantity
    });
    order
        .save()
        .then(order => res.status(201).json({
            success: true,
            message: 'Order Created Successfully!',
            orderDetails: order
        }))
        .catch(err => res.status(500).json({
            success: false,
            message: 'Something Went Wrong!',
            errorDetails: err
        }));
}

exports.deleteOrder = (req, res) => {
    Order
        .deleteOne({_id: req.params.orderId})
        .then(deletedOrderDetails => res.status(200).json({
            success: true,
            message: deletedOrderDetails.n != 0 ? 'Order Deleted Successfully!' : 'Order Not Found!',
            deletionDetails: deletedOrderDetails
        }))
        .catch(error => res.status(500).json({
            success: false,
            message: 'Deletion Unsuccessful!',
            errorDetails: error
        }));
}