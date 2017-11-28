var express = require('express');
var router = express.Router();
var mongodb = require('mongodb')
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://KennyTruong:applejim@ds163745.mlab.com:63745/heroku_p4pgb3n7';

var bodyParser = require('body-parser');
var path = require('path');
var querystring = require('querystring');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var multer = require('multer');
var upload = multer();

//LOAD the various controllers
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb

router.post('/', function (req, res) {
    console.log(req.body);
    var body = JSON.stringify(req.body);
    var params = JSON.stringify(req.params);
    var billingName = req.body.billingName;
    var billingStreet = req.body.billingAddress;
    var billingCity = req.body.billingCity;
    var billingState = req.body.billingState;
    var billingZipCode = req.body.billingZipCode;
    var shippingStreet = req.body.shippingAddress;
    var shippingCity = req.body.shippingCity;
    var shippingState = req.body.shippingState;
    var shippingZipCode = req.body.shippingZipCode;
    var email = req.body.email;
    var product_vector = req.body.products;
    var cardNumber = req.body.cardNumber;
    var expirationDate = req.body.expirationDate;
    var securityCode = req.body.securityCode;
    var cardType = req.body.CCcompany;
})

//CODE to route /storeData to appropriate  Controller function
router.post('/storeData', controllerMongoCollection.storeData);

module.exports = router;
