(function() {
angular.module('dream', ['ngRoute', 'ngFileUpload'])
angular.module('dream').controller('mainController', [
	'$scope', 
	'$http', 
	'Upload', 
	'$timeout', function($scope, $http, Upload, $timeout) {
	$scope.allGoalsArray = [];
	(function initialize() {
		(function getAllUsers() {
			$http.get('/api/users/get').then(function(response) {
			});
		}());
		var getSessionUser = function() {
			$http.get('/api/me').then(function(response) {
				$scope.user = response.data;
			});
		};
		getSessionUser();
	}());
	(function userInfo() {
		$scope.updateFirstName = function() {
			var data = {
				userId: $scope.user._id,
				firstName: $scope.user.firstName
			};
			$http.post('/api/profile/updateFirstName', data).then(function(){});
		};
		$scope.updateLastName = function() {
			var data = {
				userId: $scope.user._id,
				lastName: $scope.user.lastName
			};
			$http.post('/api/profile/updateLastName', data).then(function(){});
		};
		$scope.updateCity = function() {
			var data = {
				userId: $scope.user._id,
				city: $scope.user.city
			};
			$http.post('/api/profile/updateCity', data).then(function(){});
		};
		$scope.updateState = function() {
			var data = {
				userId: $scope.user._id,
				state: $scope.user.state
			};
			$http.post('/api/profile/updateState', data).then(function(){});
		};
		$scope.updateDream = function() {
			var data = {
				userId: $scope.user._id,
				dream: $scope.user.dream
			};
			$http.post('/api/profile/updateDream', data).then(function(){});
		};
	}());
	(function goals() {
		var data = {}
		var getUserGoals = function(id) {
			$http.get('/api/goals/get/' + $scope.userId, data).then(function(response) {
				$scope.userGoalsArray = response.data;
			});
		};
		var getAllGoals = function() {
			$http.get('/api/goals/get', data).then(function(response) {
				$scope.allGoalsArray = response.data;
			});
		}
		$scope.postGoal = function(goal) {
			$scope.goal = goal;
			$scope.allGoalsArray = [];
			$scope.userGoalsArray = [];
			var data = {
				content: $scope.goal.content,
				timeStamp: $scope.goal.timeStamp,
				rating: $scope.goal.rating,
				usersRated: $scope.goal.usersRated,
				userSubmitted: $scope.user._id,
				userId: $scope.user._id
			}
			$http.post('/api/goals/post', data).then(function(response) {
				$scope.allGoalsArray.push(response);
				$scope.userGoalsArray.push(response);
				getAllGoals();
				getUserGoals();
				$scope.goal.content = "";
			});
		};
		$scope.deleteGoal = function(id) {
			$http.delete('/api/goals/delete/' + id).then(function(response) {
				getUserGoals();
				getAllGoals();
			})
		}
		$scope.rateGoal = function(goal, scoreSelect) {
			$http.post('/api/rate', {
				goalId: goal._id, x: parseInt(scoreSelect)
			})
			getAllGoals();	
		};
		$scope.belongsToUser = function(goal) {
			return goal.userSubmitted._id !== $scope.user._id;
		};
		getUserGoals();
		getAllGoals();
	}());
	
	(function userLocation() {
		var getUserCoordinates = function() {
			$scope.locationsArray = [];
			$http.get('/api/me').then(function(response) {
				$scope.user = response.data;
				if(typeof $scope.user === "object") {
				(function initialize() {
					$http.get('/api/users/get').then(function(response) {
				    	for(var i = 0; i < response.data.length; i++) {
				    		var usersLat = Number(response.data[i].lati);
				    		var usersLng = Number(response.data[i].long);
				    		function location(lat, lng) {
								this.lat = lat;
								this.lng = lng;
							}
							console.log(usersLat)
							var newUserLocation = new location(usersLat, usersLng);
							$scope.locationsArray.push(newUserLocation);
				    	}
				    	console.log($scope.locationsArray)
				    	var latlng = new google.maps.LatLng(39.740, -104.960);
				    	var map = new google.maps.Map(document.getElementById('map'), {
					         zoom: 5,
					         //center: {lat: 39.740, lng: -104.960},
					         center: latlng,
							styles: [
						            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
						            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
						            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
						            {
						              featureType: 'administrative.locality',
						              elementType: 'labels.text.fill',
						              stylers: [{color: '#d59563'}]
						            },
						            {
						              featureType: 'poi',
						              elementType: 'labels.text.fill',
						              stylers: [{color: '#d59563'}]
						            },
						            {
						              featureType: 'poi.park',
						              elementType: 'geometry',
						              stylers: [{color: '#263c3f'}]
						            },
						            {
						              featureType: 'poi.park',
						              elementType: 'labels.text.fill',
						              stylers: [{color: '#6b9a76'}]
						            },
						            {
						              featureType: 'road',
						              elementType: 'geometry',
						              stylers: [{color: '#38414e'}]
						            },
						            {
						              featureType: 'road',
						              elementType: 'geometry.stroke',
						              stylers: [{color: '#212a37'}]
						            },
						            {
						              featureType: 'road',
						              elementType: 'labels.text.fill',
						              stylers: [{color: '#9ca5b3'}]
						            },
						            {
						              featureType: 'road.highway',
						              elementType: 'geometry',
						              stylers: [{color: '#746855'}]
						            },
						            {
						              featureType: 'road.highway',
						              elementType: 'geometry.stroke',
						              stylers: [{color: '#1f2835'}]
						            },
						            {
						              featureType: 'road.highway',
						              elementType: 'labels.text.fill',
						              stylers: [{color: '#f3d19c'}]
						            },
						            {
						              featureType: 'transit',
						              elementType: 'geometry',
						              stylers: [{color: '#2f3948'}]
						            },
						            {
						              featureType: 'transit.station',
						              elementType: 'labels.text.fill',
						              stylers: [{color: '#d59563'}]
						            },
						            {
						              featureType: 'water',
						              elementType: 'geometry',
						              stylers: [{color: '#17263c'}]
						            },
						            {
						              featureType: 'water',
						              elementType: 'labels.text.fill',
						              stylers: [{color: '#515c6d'}]
						            },
						            {
						              featureType: 'water',
						              elementType: 'labels.text.stroke',
						              stylers: [{color: '#17263c'}]
						            }
						          ]
					       });
				    	var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
				    	var markers = $scope.locationsArray.map(function(location, i) {
					         return new google.maps.Marker({
					           position: location,
					           label: labels[i % labels.length]
					        });
					    });
					    var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
						
						markerCluster.addListener('click', function() {
							alert("lkajfkj")
						})

				    })

				    var getLocation = function() {
					    if(navigator.geolocation) {
							navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
					    } 
					    else {
					        alert("Geolocation is not supported by this browser.");
					    }
					}
					getLocation()	
					function geoSuccess(position) {
						var testArray = [];
					    var lat = position.coords.latitude;
					    var lng = position.coords.longitude;
						var data = {
							userId: $scope.user._id,
							lati: lat,
							long: lng
						}
						$http.post('/api/profile/updateLocation', data).then(function(response) {
						});	
					}

					function geoError() {
					    alert("Geocoder failed.");
					}
				}())
				//google.maps.event.addDomListener(window, 'load', initialize);
				
				}
				else {
					console.log(false)
				}
			})
		}
		getUserCoordinates();
	}())
	
}]);
angular.module('dream')
.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: '/html/main.html', 
		})
		.when('/main', {
			templateUrl: '/html/main.html', 
		})
		.when('/profile', {
			templateUrl: '/html/profile.html', 
		})
		.when('/editProfile', {
			templateUrl: '/html/editProfile.html', 
		})
		.when('/main', {
			templateUrl: '/html/main.html', 
		})
		.when('/map', {
			templateUrl: '/html/map.html', 
		})
	}]);
}());
















