app.controller('authenticationController',function($scope, $http, $location, $rootScope){
	$scope.userDetail = {};
	var userDetails =  localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : {} ;
	$scope.userDetail['name'] = userDetails.name || "";
	$scope.userDetail['email'] = userDetails.email || "";
	$scope.userDetail['gender'] =  userDetails.gender || "";
	$scope.userDetail['age'] =  userDetails.age || "";
	$scope.userDetail['picture'] =  userDetails.picture || "";
	$scope.userDetail['address'] =  userDetails.address || "";
	$scope.userDetail['contact'] =  userDetails.contact  || "";
	$scope.login =function (){
		var data = {
			email: $scope.login.email,
			password: $scope.login.password
		};
		$http.post('login',data).then(function(response){
			if(response.data.message == "ok"){
				localStorage.setItem('isMeanDemoUserLogin','true');
				$rootScope.isUserLogin = true;
				localStorage.setItem('userDetails', JSON.stringify(response.data.data));
				$location.url('/home');
			}else{
				$scope.login.message = response.data.message;
			}
		});
	};
	
	$scope.registration = function(){
		var	data = { 
			name: $scope.user.name,
			email: $scope.user.email,
			password: $scope.user.password,
			con_password: $scope.user.con_password,
			contact: $scope.user.contact,
			gender: $scope.user.gender
		}

		$http.post('register',data).then(function(response){
			console.log(response);
			if(response.data.message == 'ok')
				$location.url("/login");
			else
				alert(response.data.message);
		});
	}
});