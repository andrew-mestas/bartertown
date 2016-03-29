angular.module('BarteringTownServices', ['ngResource'])
.factory('BarterTown', ['$resource', function($resource) {
  return {
  	Auth: $resource('/api/auth'),
  	Create: $resource('/api/create'),
  	Home: $resource('/barter/api', {}, {
  		save: { method: 'POST', isArray: true } 
  	}),
  	Item: $resource('/barter/api/item', {}, {
  		save: {method: 'POST', isArray: false },
	    delete: {method: 'DELETE', cache: false, isArray: false},
        update: {method: 'PUT', cache: false, isArray: false}
  	}),
  	Offer: $resource('/barter/api/offer'),
  	BidInfo: $resource('/barter/api/myBids', {}, {
  		save: {method: 'POST', isArray:false }
  	}),
  	CurrentOffers: $resource('/barter/api/offersToMe', {}, {
  		save: {method: 'POST', isArray:false }
  	})

    };
}])
.service('Authkey', function(){
  var authkey = "";
  var username = "";
  var id = "";

  return {
    getAuthKey: function(){
        return authkey;
     }, 
    setAuthKey: function(key){
        authkey = key;
     },
    resetAuthKey: function(){
     	authkey = "";
     },
    setUserName: function(name){
		username = name;
	},
	getUserName: function(){
		return username;
	},
	clearUserName: function(){
		username = "";
	},
	setUserId: function(num){
		id = num;
	},
	getUserId: function(){
		return id;
	},
	clearUserId: function(){
		id = "";
	}
 }
});