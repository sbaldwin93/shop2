(function() {
angular.module('shop2', ['ngRoute', 'ngFileUpload'])
angular.module('shop2')
	.controller('mainController', ['$scope', '$http', 'Upload', function($scope, $http, Upload) {
	var itemsArray = [];
	$http.get('/api/me').then(function(returnData) {
		$scope.user = returnData.data;
	});
	$scope.$watch(function() {
		return $scope.file
	}, function() {
		$scope.upload($scope.file);
	});

	$scope.upload = function(file) {
		if(file) {
			file.upload = Upload.upload({
				url: '/api/profile/editPhoto',
				method: 'POST',
				data: {file: file, userId: $scope.user._id}
			});
			file.upload.then(function(response) {
				file.result = response.data;
			});
		};	
	};
	var refresh = function(id) {
		var data = {}
		$http.get('/api/items/get/' + $scope.userId, data).success(function(response) {
			$scope.itemsArray = response;
			$scope.item = "";
			$scope.count = $scope.itemsArray.length.toString();
			$scope.user.image = $scope.user.image || 'https://s-media-cache-ak0.pinimg.com/236x/8e/29/f2/8e29f2925bc2e7d5a05fa21f369ab80f.jpg';
		});
	};
	refresh();
	$scope.addProduce = function() {
		$scope.itemsArray = [];
		var request = {
			name: $scope.item.name,
			quantity: $scope.item.quantity,
			type: 'produce',
			userId: $scope.user._id
		}
		$http.post('/api/items/post', request).success(function(response) {
			$scope.itemsArray.push(response);
			refresh()
		}).error(function(error) {
			console.log(error);
		});
	};
	$scope.addMeat = function() {
		$scope.itemsArray = [];
		var request = {
			name: $scope.item.name,
			quantity: $scope.item.quantity,
			type: 'meat',
			userId: $scope.user._id
		}
		$http.post('/api/items/post', request).success(function(response) {
			$scope.itemsArray.push(response);
			refresh()
		}).error(function(error) {
			console.log(error);
		});
	};
	$scope.addDairy = function() {
		$scope.itemsArray = [];
		var request = {
			name: $scope.item.name,
			quantity: $scope.item.quantity,
			type: 'dairy',
			userId: $scope.user._id
		}
		$http.post('/api/items/post', request).success(function(response) {
			$scope.itemsArray.push(response);
			refresh()
		}).error(function(error) {
			console.log(error);
		});
	};
	$scope.addOther = function() {
		$scope.itemsArray = [];
		var request = {
			name: $scope.item.name,
			quantity: $scope.item.quantity,
			type: 'other',
			userId: $scope.user._id
		}
		$http.post('/api/items/post', request).success(function(response) {
			$scope.itemsArray.push(response);
			refresh()
		}).error(function(error) {
			console.log(error);
		});
	};
	$scope.delete = function(id) {
		$http.delete('/api/items/delete/' + id).success(function(response) {
			refresh();
		});	
	};
}]);
angular.module('shop2')
.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/html/items.html',
			controller : 'mainController'
		})
		.when('/items', {
			templateUrl: '/html/items.html',
			controller : 'mainController'
		})
		.when('/produce', {
			templateUrl: '/html/produce.html',
			controller : 'mainController'
		})
		.when('/meat', {
			templateUrl: '/html/meat.html',
			controller : 'mainController'
		})
		.when('/dairy', {
			templateUrl: '/html/dairy.html',
			controller : 'mainController'
		})
		.when('/other', {
			templateUrl: '/html/other.html',
			controller : 'mainController'
		})		
	}]);
}());