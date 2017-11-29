var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var mongoDBURI = process.env.MONGODB_URI || 'mongodb://KennyTruong:applejim@ds163745.mlab.com:63745/heroku_p4pgb3n7';
var multer = require('multer');
var upload = multer();

var bodyParser = require('body-parser');
var path = require('path'); //to work with separators on any OS including Windows
var querystring = require('querystring'); //for use in GET Query string of form URI/path?name=value
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencode
router.use(upload.array());

//LOAD the controller
var controllerMongoCollection = require('../controllers/database'); //load controller code dealing with database mongodb

//CODE to route /storeData to appropriate  Controller function
router.post('/storeData', controllerMongoCollection.storeData);

module.exports = router;
