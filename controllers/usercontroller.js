var express = require('express');
var User = require('../models/user');
var router = express.Router();
var jwt = require("jsonwebtoken");
var secret = "mysupersecretpassword";

router.route("/")
.get(function(req, res){
  res.send("Yo");
});

router.route('/create')
  .post(function(req, res) {
    var NewUser = new User(req.body);

    NewUser.save(function(err) { if (err) {
      res.send({message: "A User with that name already exists", err: err}) 
      } else {
     User.findOne({ username: NewUser.username }, function(err, user) { 
      res.send(user);
     });
    }
   });
  });

  router.route('/auth')
  .post(function(req, res) {
    console.log(req.body.username, " logged in.");
   User.findOne({ username: req.body.username }, function(err, user) {
    if(err || user == null){ return res.status(500).send({error: err, message: "No User Found", }); }
        // test a matching password
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (err) {return res.status(500).send(err);} 
          if(isMatch) {
             var token = jwt.sign(user, secret);
            res.send({user: user, token: token});
          } else {
            res.send({message: "Password Incorrect"})
          }

        });
    

    });
  });
  // .put(function(req, res) {
  //   User.findByIdAndUpdate(req.params.id, req.body, function(err) {
  //     if (err) return res.status(500).send(err);
  //     res.send({'message': 'success'});
  //   });
  // })
  // .delete(function(req, res) {
  //   User.findByIdAndRemove(req.params.id, function(err) {
  //     if (err) return res.status(500).send(err);
  //     res.send({'message': 'success'});
  //   });
  // });

module.exports = router;