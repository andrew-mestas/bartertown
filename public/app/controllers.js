angular.module("allInfoNearbyCtrls", [])
.controller('loginCtrl', ['$scope', 'BarterTown', 'Authkey', '$http', function($scope, BarterTown, Authkey, $http){
	$scope.name = ""; 
	$scope.p1 = "";
	$scope.p2 = "";
	$scope.Message = "";
	$scope.message = "";
	$scope.status = "";
	$scope.MyName = Authkey.getUserName();
	$scope.items = null;

	if(Authkey.getUserId() != ""){
		BarterTown.Home.save([], {id: Authkey.getUserId()} , function(items){
			$scope.items = items;
		});
	}
 
 	$scope.save = function(){
 		BarterTown.Item.update({item: this.item}, function(res){
 			$scope.message = res.message;
 		});
 	};

	$scope.del = function(){
		BarterTown.Item.delete({id: this.item.id}, function(res){
			$scope.message = res.message;
		});
		for(var i=0; i<$scope.items.length;i++){
			if($scope.items[i].id == this.item.id){
				$scope.items.splice(i, 1);
			}
		}
	};

	$scope.check = function(){
	if($scope.p1 !== $scope.p2){
		$scope.Message = "Passwords Don't Match";
		return false;
	} else if($scope.p1.length == 0 || $scope.p2.length == 0){
		$scope.Message = "Please Fill Out Passwords";
		return false;
	} else {
		$scope.Message = "Passwords Good To Go";
		return true;
	}
	}

	$scope.getAuth = function(){
		if($scope.check()){
			console.log("Starting Auth");
			$scope.data = {username: $scope.name, password: $scope.p1};
			BarterTown.Auth.save([], $scope.data, function(data){
			  $scope.MyName = $scope.name;
			  Authkey.setAuthKey(data.token);
			  Authkey.setUserName($scope.name);
			  Authkey.setUserId(data.user.id);
			  var id = "Bearer " + Authkey.getAuthKey();
   			  $http.defaults.headers.common['Authorization'] = id;
   			  $scope.dataP = {id: Authkey.getUserId()};
				BarterTown.Home.save([], $scope.dataP, function(items){
				   $scope.items = items;
			    });
			});
		}
	}
	$scope.isLoggedIn = function(){
		if(Authkey.getAuthKey() != ""){
			return true;
		}
		else {
			return false;
		}
	};

	$scope.logInOut = function(){
		if($scope.isLoggedIn()){
		Authkey.resetAuthKey();
		Authkey.clearUserName();
		Authkey.clearUserId();
		} 
	};

}])
.controller('homeCtrl', ['$scope', 'BarterTown', 'Authkey', '$http', function($scope, BarterTown, Authkey, $http){ 

}])
.controller('offerCtrl', ['$scope', 'BarterTown', 'Authkey', '$http', function($scope, BarterTown, Authkey, $http){ 
	$scope.offers = [];

		BarterTown.CurrentOffers.save([], {id: Authkey.getUserId() },function(res){
			if(res.status != "Error"){
			for(var i =0; i< res.Offered.length; i++){
				var inner = {Offered: "", Wanted: "", Status: ""};
				inner.Offered = res.Offered[i];
				inner.Wanted = res.Wanted[i];
				inner.Status = res.Status[i];
				$scope.offers.push(inner);
			}
		  }
		});
}])
.controller('bidCtrl', ['$scope', 'BarterTown', 'Authkey', '$http', function($scope, BarterTown, Authkey, $http){ 
	$scope.offers = [];

	BarterTown.BidInfo.save([], {id: Authkey.getUserId() },function(res){
		for(var i =0; i< res.Offered.length; i++){
			var inner = {Offered: "", Wanted: "", Status: ""};
			inner.Offered = res.Offered[i];
			inner.Wanted = res.Wanted[i];
			inner.Status = res.Status[i];
			$scope.offers.push(inner);
		}
	});
}])
.controller('allItems', ['$scope', 'BarterTown', 'Authkey', '$http', function($scope, BarterTown, Authkey, $http){ 
	$scope.items = [];
	$scope.filters = "";
	$scope.me = Authkey.getUserName();
	$scope.myItems = [];
	$scope.dataP = {id: Authkey.getUserId()};
	$scope.modalP = "";
	$scope.modalD = "";
	$scope.ownedId = "";
	$scope.offerTo = "";
	$scope.itemWanted = "";
	$scope.itemOffered = "";

	BarterTown.Home.save([], $scope.dataP, function(items){
	   $scope.myItems = items;
	});

	BarterTown.Home.query( function(items){
	  $scope.items = items;
	});
	$scope.bidBegin = function(){
		console.log(this.item);
		$scope.modalD = this.item.description;
		$scope.modalP = this.item.ownedBy;
		$scope.offerTo = this.item.ownedId;
		$scope.itemWanted = this.item.id;
	} 
	$scope.bid = function(){
		console.log(this.item);
		$scope.ownedId = this.item.ownedId;
		$scope.itemOffered = this.item.id;
		$scope.data = {offerTo: $scope.offerTo, ownedById: $scope.ownedId, itemWantedId: $scope.itemWanted, itemOfferedId: $scope.itemOffered};
		console.log($scope.myItems);
		BarterTown.Offer.save([], $scope.data, function(res){
			console.log(res);
		});
		$scope.myItems

	};

}])
.controller('signup', ['$scope', 'BarterTown', 'Authkey', '$http', function($scope, BarterTown, Authkey, $http){ 
	$scope.signup = {
			username: "", 
			password: "",
			location: "",
			email: ""};
	$scope.p1 = "";
	$scope.p2 = "";
	$scope.Message = "";


	$scope.check = function(){
	if($scope.p1 !== $scope.p2){
		$scope.Message = "Passwords Don't Match";
		return false;
	} else if($scope.p1.length == 0 || $scope.p2.length == 0){
		$scope.Message = "Please Fill Out Passwords";
		return false;
	} else {
		$scope.Message = "Passwords Good To Go";
		return true;
	}
	}

	$scope.createUser = function(){
		$scope.Message = "";

		if($scope.check()){
			$scope.signup.password = $scope.p1;

			BarterTown.Create.save([], $scope.signup, function(res){
				$scope.Message = res.message;
			});
		}
	};


}]).controller('addItem', ['$scope', 'BarterTown', 'Authkey', '$http', function($scope, BarterTown, Authkey, $http){ 

	 $scope.item = {
	 				name: "",
                    location: "",
                    tradeFor: "",
                    tradedCount: 0,
                    description: "",
                    ownedBy: Authkey.getUserName(),
                    ownedById: Authkey.getUserId(),
                    created: Date.now()
    };
    $scope.message = "";

    $scope.submit = function(){
    	var id = "Bearer " + Authkey.getAuthKey();
  	    $http.defaults.headers.common['Authorization'] = id;
    	BarterTown.Item.save([], $scope.item, function(res){
 			$scope.message = res.message;
    		if(res.status == "OK"){
 				$scope.message = res.message;
    		};
    	});

    };

    // new Item(




// 	$scope.item.save(function(err){
//     if(err){
//       console.log("err", err);
//     }
// }
	 


}]);