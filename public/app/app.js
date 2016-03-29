var app = angular.module('BarteringTown', ['ngRoute', 'allInfoNearbyCtrls', 'BarteringTownServices']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/views/home.html',
    controller: 'homeCtrl'
  })
  .when('/login', {
    templateUrl: 'app/views/login.html',
    controller: 'loginCtrl'
  })
  .when('/all', {
  	templateUrl: 'app/views/all.html',
  	controller: 'allItems'
  })
  .when('/add', {
  	templateUrl: 'app/views/add.html',
  	controller: 'addItem'
  })
  .when('/offerItems', {
  	templateUrl: 'app/views/offer.html',
  	controller: 'offerCtrl'
  })
   .when('/bid', {
  	templateUrl: 'app/views/bid.html',
  	controller: 'bidCtrl'
  })
  .when('/signup', {
  	templateUrl: 'app/views/signup.html',
  	controller: 'signup'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}]);
