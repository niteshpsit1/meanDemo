var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'pages/home.html',
		//controller: 'mainController'
	})
	.when('/login',{
		templateUrl: 'pages/login.html',
		//controller: 'mainController'
	})
	.when('/contact',{
		templateUrl: 'pages/contact.html',
		//controller: 'mainController'
	})
	.when('/register',{
		templateUrl: 'pages/register.html',
		//controller: 'mainController'
	})
	.otherwise({
        redirectTo: '/'
    });
});

app.controller('myController',function($scope, 	$http){
	
	$scope.userLogin = false;

	$http.get('/users').then(function(response){
		$scope.users = response.data;
	});

	$scope.register = function(){
		alert('ok');
		var	data = { 
			name: $scope.name,
			email: $scope.email,
			password: $scope.password,
			con_password: $scope.con_password,
			contact: $scope.contact,
			gender: $scope.gender
		}
		$http.post('users/register',data).then(function(response){
			console.log('posted');
			console.log(response);
		});
	}
});