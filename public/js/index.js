//(function() {
angular.module('dream', ['ngRoute', 'ngFileUpload'])
angular.module('dream').controller('mainController', [
	'$scope', 
	'$http', 
	'Upload', 
	'$timeout', function($scope, $http, Upload, $timeout) {
		
	var getCurrentUserInfo = function() {
		$http.get('/api/me').then(function(response) {
			$scope.user = response.data;
		});
	};
	var updateInfo = function() {
		$scope.updateFirstName = function() {
			var request = {
				userId: $scope.user._id,
				firstName: $scope.user.firstName
			}
			$http.post('/api/profile/updateFirstName', request).then(function() {
				getCurrentUserInfo();
			});
		};
		$scope.updateLastName = function() {
			var request = {
				userId: $scope.user._id,
				lastName: $scope.user.lastName
			}
			$http.post('/api/profile/updateLastName', request).then(function() {
				getCurrentUserInfo();
			});
		};
		$scope.updateLastName = function() {
			var request = {
				userId: $scope.user._id,
				lastName: $scope.user.lastName
			}
			$http.post('/api/profile/updateLastName', request).then(function() {
				getCurrentUserInfo();
			});
		};
		$scope.updateCity = function() {
			var request = {
				userId: $scope.user._id,
				city: $scope.user.city
			}
			$http.post('/api/profile/updateCity', request).then(function() {
				getCurrentUserInfo();
			});
		};
		$scope.updateState = function() {
			var request = {
				userId: $scope.user._id,
				state: $scope.user.state
			}
			$http.post('/api/profile/updateState', request).then(function() {
				getCurrentUserInfo();
			});
		};
		$scope.updateDream = function() {
			var request = {
				userId: $scope.user._id,
				dream: $scope.user.dream
			}
			$http.post('/api/profile/updateDream', request).then(function() {
				getCurrentUserInfo();
			});
		};
		$scope.$watch(function() {
			return $scope.file
		}, function() {
			$scope.upload($scope.file);
		});
		$scope.upload = function(file) {
			if(file) {
				file.upload = Upload.upload({
					url: '/api/profile/updatePhoto',
					method: 'POST',
					data: {file: file, userId: $scope.user._id}
				});
				file.upload.then(function(response) {
					file.result = response.data;
				});
			};
			getCurrentUserInfo();	
		};
	};
	updateInfo();
	var currentUserItems = function(id) {
		var data = {}
		$http.get('/api/items/get/' + $scope.userId, data).success(function(response) {
			$scope.userItemsArray = response;
			$scope.item = "";
		});
	};
	currentUserItems();
	var userItems = function() {
		var data = {}
		$http.get('/api/items/get', data).success(function(response) {
			$scope.itemsArray = response;
			$scope.item = "";
		});
	};
	userItems();
	
	$scope.addItem = function() {
		$scope.itemsArray = [];
		$scope.userItemsArray = [];
		var request = {
			name: $scope.item.name,
			timeStamp: $scope.item.timeStamp,
			rating: $scope.item.rating,
			usersRated: $scope.item.usersRated,
			userSubmitted: $scope.user._id,
			userId: $scope.user._id
		}
		$http.post('/api/items/post', request).success(function(response) {
			$scope.itemsArray.push(response);
			$scope.userItemsArray.push(response);
			userItems()
			currentUserItems()
		}).error(function(error) {
			console.log(error);
		});
	};
	
	/*
	$scope.addItem = function(file) {
		$scope.itemsArray = [];
		$scope.userItemsArray = [];
		if(file) {
			$scope.itemsArray = [];
			file.upload = Upload.upload({
		      	url: '/api/items/post',
		      	data: {
		      		name: $scope.item.name,
					timeStamp: $scope.item.timeStamp,
					rating: $scope.item.rating,
					usersRated: $scope.item.usersRated,
					userSubmitted: $scope.user._id,
					userId: $scope.user._id
		      	},
		      	method: 'POST'
		    });
		    file.upload.then(function (response) {
		      	$timeout(function () {
			        file.result = response.data;
			        $scope.itemsArray.push(response.data)
			        $scope.userItemsArray.push(response.data);
			        userItems()
			        currentUserItems()
		      	});
		    })
	    }
	    if(!file) {
	    	var request = {
	    		name: $scope.item.name,
	    		timeStamp: $scope.item.timeStamp,
	    		rating: $scope.item.rating,
	    		usersRated: $scope.item.usersRated,
	    		userSubmitted: $scope.item.userSubmitted,
	    		userId: $scope.user._id
	    	}
	    	$http.post('/api/items/post', request).success(function(response) {
				$scope.itemsArray.push(response);
				$scope.userItemsArray.push(response);
				userItems()
				currentUserItems()
			}).error(function(error) {
				console.log(error);
			});
	    }
	}
	*/
	$scope.deleteItem = function(id) {
		$http.delete('/api/items/delete/' + id).success(function(response) {
			userItems();
		});	
	};
	$scope.submitRating = function(item, scoreSelect) {
		$http.post('/api/rate', {
			itemId: item._id, x: parseInt(scoreSelect)
		})
		userItems();	
	};
	


	$scope.belongsToUser = function(item) {
		return item.userSubmitted._id !== $scope.user._id;
	}
	$scope.isLoggedIn = function() {
		return typeof $scope.user === "object"; 
	}

	
	
	
	
	
	
}]);
angular.module('dream')
.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/html/main.html', 
			controller: 'mainController'
		})
		.when('/main', {
			templateUrl: '/html/main.html', 
			controller: 'mainController'
		})
		.when('/profile', {
			templateUrl: '/html/profile.html', 
			controller: 'mainController'
		})
		.when('/editProfile', {
			templateUrl: '/html/editProfile.html', 
			controller: 'mainController'
		})
		.when('/main', {
			templateUrl: '/html/main.html', 
			controller: 'mainController'
		})
		.when('/map', {
			templateUrl: '/html/map.html', 
			controller: 'mainController'
		})
	}]);
//}());
















