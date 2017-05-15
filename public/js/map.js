	function userLocation($scope, $http) {
		var getUserCoordinates = function() {
			$scope.locationsArray = [];
			$http.get('/api/me').then(function(response) {
				$scope.user = response.data;
				(function initialize() {
					$http.get('/api/users/get').then(function(response) {
				    	for(var i = 0; i < response.data.length; i++) {
				    		var usersLat = Number(response.data[i].lati);
				    		var usersLng = Number(response.data[i].long);
				    		function location(lat, lng) {
								this.lat = lat;
								this.lng = lng;
							}
							console.log(usersLat, usersLng)
							var newUserLocation = new location(usersLat, usersLng);
							$scope.locationsArray.push(newUserLocation);
				    	}
				    	console.log($scope.locationsArray)
				    	const latlng = new google.maps.LatLng(39.740, -104.960);
				    	const map = new google.maps.Map(document.getElementById('map'), {
					        zoom: 5,
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
							navigator.geolocation.getCurrentPosition(geoSuccess);
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
						$http.post('/api/profile/updateLocation', data).then(function(response){});	
					}

					function geoError() {
					    alert("Geocoder failed.");
					}
				}())
			})
		}
		getUserCoordinates();
	}
angular.module('dream').component('map', {
  templateUrl: 'map.html',
  controller: userLocation
  /*
  bindings: {
    fieldValue: '<',
    fieldType: '@?',
    onUpdate: '&'
  }
  */
});






























