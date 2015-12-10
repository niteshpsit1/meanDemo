var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/home',{
		templateUrl: 'pages/home.html',
		controller: 'authenticationController'
	})
	.when('/login',{
		templateUrl: 'pages/login.html',
		controller: 'authenticationController'
	})
	.when('/contact',{
		templateUrl: 'pages/home.html',
		//controller: 'mainController'
	})
	.when('/registration',{
		templateUrl: 'pages/registration.html',
		controller: 'authenticationController'
	})
	.otherwise({
        redirectTo: '/'
    });
});

app.controller('myController',function($scope, 	$http , $rootScope, $location){
	
	$rootScope.isUserLogin = localStorage.getItem('isMeanDemoUserLogin') ? true :false;
	$scope.logout = function(){
		localStorage.removeItem("isMeanDemoUserLogin");
		localStorage.removeItem("userDetails");
		$rootScope.isUserLogin = false;
		$location.url('/home');
	}
});