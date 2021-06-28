const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userSignUp = (req, res) => {
    User
        .findOne({email: req.body.email})
        .then(user => {
            if (user) return res.status(409).json({success: false, message: 'Email Already Exists!'})
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) return res.status(500).json({success: false, message: 'Unable to Sign-Up!', errorDetails: err});
                let user = new User({
                    email: req.body.email,
                    password: hashedPassword
                })
                user
                    .save()
                    .then(user => res.status(201).json({success: true, message: 'Successfully Signed Up!', user: user.email}))
                    .catch(error => res.status(500).json({success: false, message: 'Unable to Sign-Up!!', errorDetails: error}))
            });
        })
}

exports.userLogin = (req, res) => {
    User
        .findOne({email: req.body.email})
        .then(user => {
            if (!user) return res.status(401).json({success: false, message: 'User Doesn\'t Exist!'});
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (!result) return res.status(401).json({success: false, message: 'Authentication Failed!'})

                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h'
                })
                res.status(200).json({success: true, message: 'Successfully Logged-In!', token: token});
            });
        })
        .catch(error => res.status(500).json({success: false, message: 'Something Went Wrong!', errorDetails: error}));
}