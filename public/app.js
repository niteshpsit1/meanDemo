var app = angular.module('myApp',[]);

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