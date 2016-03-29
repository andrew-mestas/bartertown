var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var User = require('./models/user');
var secret = "mysupersecretpassword";

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost/bartertown", function(err){
	if(err){
		throw err;
	}
	console.log("Connection Sucess!");
});

app.use("/barter/api", expressJWT(
    {
        secret: secret
    }
));
app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({
            message: "You need an authorization token to view this info."
        });
    }
});

app.use('/api', require('./controllers/usercontroller'));
app.use('/barter/api', require('./controllers/bartercontroller'));

app.get("/", function(req, res){
	// var t =  User.findOne({ username: 'ames22' });
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.get("/:id", function(req, res){
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000);