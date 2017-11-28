var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://KennyTruong:applejim@ds163745.mlab.com:63745/heroku_p4pgb3n7';


var bodyParser = require('body-parser');
var path = require('path'); //to work with separators on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencode


module.exports.storeData =  function (req, res) {
/*
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
*/
    mongodb.MongoClient.connect(mongoDBURI, function(err, db) {
        if(err) throw err;

        var customerID = Math.floor((Math.random() * 1000000000000) + 1);
        var billingID = Math.floor((Math.random() * 1000000000000) + 1);
        var shippingID = Math.floor((Math.random() * 1000000000000) + 1);
        var ordersID = Math.floor((Math.random() * 1000000000000) + 1);

        //get collection of orders
        var Orders = db.collection('ORDERS');
        var Customers = db.collection('CUSTOMERS');
        var Billing = db.collection('BILLING');
        var Shipping = db.collection('SHIPPING');


        //customer collection operation
        var customerData = {
            _id: customerID,
            NAME: billingName,
            STREET: billingStreet,
            CITY: billingCity,
            STATE: billingState,
            ZIP: billingZipCode,
            EMAIL: email
        };

        Customers.insertOne(customerData, function (err, result) {
            if (err) throw err;
        });

        //shipping collection operation
        var shippingData = {
            _id: shippingID,
            CUSTOMER_ID: customerID,
            SHIPPING_STREET: shippingStreet,
            SHIPPING_CITY: shippingCity,
            SHIPPING_STATE: shippingState,
            SHIPPING_ZIP: shippingZipCode
        };

        Shipping.insertOne(shippingData, function (err, result) {
            if (err) throw err;
        });

        //billing collection operation
        var billingData = {
            _id: billingID,
            CUSTOMER_ID: customerID,
            CREDITCARDNUM: cardNumber,
            CREDITCARDTYPE: cardType,
            CREDITCARDEXP: expirationDate,
            CREDITCARDSECURITYNUM: securityCode
        };

        Billing.insertOne(billingData, function (err, result) {
            if (err) throw err;
        });

        //orders collection operation
        var date = new Date();
        var current_date = (date.getMonth() + date.getDate() + date.getFullYear());
        var ordersData = {
            _id: ordersID,
            CUSTOMER_ID: customerID,
            BILLING_ID: billingID,
            SHIPPING_ID: shippingID,
            DATE: current_date,
            PRODUCT_VECTOR: product_vector,
            ORDER_TOTAL: product_vector['total']
        };

        Orders.insertOne(ordersData, function (err, result) {
            if (err) throw err;
        });


        //close connection when your app is terminating.
        db.close(function (err) {
            if(err) throw err;
        });
    });//end of connect
};//end function+