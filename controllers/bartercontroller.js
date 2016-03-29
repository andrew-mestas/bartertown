var express = require('express');
var Item = require('../models/item');
var User = require('../models/user');
var Offer = require('../models/offer');
var router = express.Router();



router.route("/")
.post(function(req, res){
 User.findOne({_id: req.body.id}, function(err, person){

  Item.find({ownedBy: person.username}, function(err, item){
   res.send(item);
  });    
  });
})
.get(function(req, res){
  Item.find({}, function(err, items){
      res.send(items);
    });
});

router.route("/offer")
.post(function(req, res){
  // console.log(req.body);
  var offer = new Offer(req.body);
  Offer.findOne({itemOfferedId: req.body.itemOfferedId, itemWantedId: req.body.itemWantedId}, function(err, theOffer){
    if(err){
      res.send({status: "Error", message: "I think this is a duplicate."});
    } else if(theOffer){
      res.send({status: "Error", message: "I think this is a duplicate."});
    } else {
      offer.save(function(err){
         res.send({status: "OK", message: "Saved Offer"});
       }); 
    }
  });
});

router.route("/myBids")
.post(function(req, res){
  Offer.find({ownedById: req.body.id}, function(err, offers){
    if(err){
       res.send({status: "Error", message: "No offers found"});
    } else if(offers){
      var offered = offers.map(function(i){ return i.itemOfferedId; });
      var wanted = offers.map(function(i){ return i.itemWantedId; });
      var status = offers.map(function(i){return i.accepted; });
      console.log(offered, wanted);

      Item.find({_id: {$in: offered}}, function(err, itemsOffered){
        Item.find({_id: {$in: wanted}}, function(err, itemsWanted){
            res.send({Offered: itemsOffered, Wanted: itemsWanted, Status: status});
        });
      });
      // res.send(offers)
    } else {
     res.send({status: "Error", message: err});
    }
  })  
});

router.route("/offersToMe")
.post(function(req, res){
Offer.find({offerTo: req.body.id}, function(err, offers){
    if(err){
       res.send({status: "Error", message: "No offers found"});
    } else if(offers){
      var offered = offers.map(function(i){ return i.itemOfferedId; });
      var wanted = offers.map(function(i){ return i.itemWantedId; });
      var status = offers.map(function(i){return i.accepted; });
      console.log(offered, wanted,"HERE");
      if(offers.length > 0 || offered.length > 0){

      Item.find({_id: {$in: offered}}, function(err, itemsOffered){
        Item.find({_id: {$in: wanted}}, function(err, itemsWanted){
            res.send({Offered: itemsOffered, Wanted: itemsWanted, Status: status});
        });
      });
     } else {
       res.send({status: "Error", message: "No offers yet"})
     }
      // res.send(offers)
    } else {
     res.send({status: "Error", message: err});
    }
  })  
});

router.route("/item")
.post(function(req, res){
    var t = new Item(req.body);
    Item.findOne({name: req.body.name, description: req.body.description}, function(err, item){
      if(item){
        res.send({status: "Error", message: "I think this is a duplicate."});
      } else if (err){
        res.send({status: "Error", message: "I think this is a duplicate."});
      } else{ 
       t.save(function(err){
         res.send({status: "OK", message: "Saved Item"});
       }); 
      }
    });
})
.put(function(req, res){
    // res.send({"QUERY": req.query, "PARAMS": req.params, "REQ BODY": req.body.item.id});
    Item.findOne({_id: req.body.item.id}, function(err, item){

      item.name = req.body.item.name;
      item.location = req.body.item.location;
      item.tradeFor = req.body.item.tradeFor;
      item.description = req.body.item.description;
      item.tradedCount = item.tradedCount;


      item.save(function(err){
        if(err){
         res.send(err);
        } else {
          res.send({status: "OK", message: "Updated Item" + item.name});
        }
      })
    });

})
.delete(function(req, res){
   Item.remove({_id: req.query.id}, function(err, item){
      res.send({status: "OK", message: "Deleted Item"});
   });  
});



module.exports = router;
