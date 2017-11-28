var express = require('express');
var router = express.Router();
var mongodb = require('mongodb')
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://KennyTruong:applejim@ds163745.mlab.com:63745/heroku_p4pgb3n7';

/*
var bodyParser = require('body-parser');
var path = require('path');
var querystring = require('querystring');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
*/
//LOAD the various controllers
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb

router.post('/', function (req, res) {
    res.send('Order Successful');
})

//CODE to route /storeData to appropriate  Controller function
router.post('/storeData', controllerMongoCollection.storeData);

module.exports = router;
