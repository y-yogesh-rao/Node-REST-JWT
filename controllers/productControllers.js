const Product = require('../models/productShema');

exports.getProductDetails = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => res.status(200).json({
            success: true,
            message: 'Search Successful!',
            productDetails: product ? product : 'Product Not Found!'
        }))
        .catch(error => res.status(500).json({
            success: false,
            message: 'Something Went Wrong!',
            errorDetails: error
        }));
}

exports.addPrduct = (req, res) => {
    console.log(req.file);
    let product = new Product({
        productName: req.body.productName,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(product => res.status(201).json({
            message: 'Successfully Created Product!',
            productDetails: product
        }))
        .catch(error => res.status(500).json({error}));
}

exports.updateProduct = (req, res) => {
    const updateOptions = {}
    for (const options of req.body) {
        updateOptions[options.propName] = options.propValue;
    }
    Product
        .updateOne({_id: req.params.productId}, {$set: updateOptions})
        .then(updatedProductDetails => res.status(200).json({
            success: true,
            message: updatedProductDetails.n != 0 ? 'Product Updated Successfully!' : 'Product Not Found!',
            updateDetails: updatedProductDetails
        }))
        .catch(error => res.status(500).json({
            success: false,
            message: 'Updation Unsuccessful!',
            errorDetails: error
        }));
}

exports.deleteProduct = (req, res) => {
    Product
        .deleteOne({_id: req.params.productId})
        .then(deletedProductDetails => res.status(200).json({
            success: true,
            message: deletedProductDetails.n != 0 ? 'Product Deleted Successfully!' : 'Product Not Found!',
            deletionDetails: deletedProductDetails
        }))
        .catch(error => res.status(500).json({
            success: false,
            message: 'Deletion Unsuccessful!',
            errorDetails: error
        }));
}