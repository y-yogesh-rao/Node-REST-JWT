const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const productControllers = require('../controllers/productControllers');
const multer = require('multer');
const authenticationRequired = require('../middlewares/check_auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        uploadDestination = path.join(require.main.path, 'uploads')
        if (!fs.existsSync(uploadDestination)) fs.mkdirSync(uploadDestination);
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname.replace(' ', '_'));
    }
});

const uploads = multer({
    storage: storage
});

router.get('/getProduct/:productId', productControllers.getProductDetails);

router.post('/addProduct', authenticationRequired, uploads.single('productImage'), productControllers.addPrduct);

router.patch('/updateProduct/:productId', authenticationRequired, productControllers.updateProduct);

router.delete('/deleteProduct/:productId', authenticationRequired, productControllers.deleteProduct);

module.exports = router;