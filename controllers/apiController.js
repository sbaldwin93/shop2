var User = require('../models/user');
var Item = require('../models/item');
var fs = require('fs-extra');
var path = require('path');

module.exports = {
	getAllUsers: function(req, res) {
		User.find({}).exec(function(err, allUsers) {
			if(err) {
				res.error(err);
			}
			else {
				res.json(allUsers)
			}
		})
	},
	updatePhoto: function(req, res) {
		var file = req.files.file;
		var userId = req.body.userId;
		console.log("user " + userId + " fs submitting ", file);
		var uploadDate = new Date();
		var tempPath = file.path;
		var targetPath = path.join(__dirname, "../uploads/" + userId + uploadDate + file.name);
		var savePath = "/uploads/" + userId + uploadDate + file.name;
		fs.rename(tempPath, targetPath, function(err) {
			if(err) {
				console.log(err)
			}
			else {
				User.findById(userId, function(err, userData) {
					var user = userData;
					user.image = savePath;
					user.save(function(err) {
						if(err) {
							console.log("failed save");
							res.json({status: 500})
						}
						else {
							console.log("save successful");
							res.json({status: 200})
						}
					})
				})
			}
		})
	},
	updateFirstName: function(req, res) {
		var firstName = req.body.firstName;
		var userId = req.body.userId;
		User.findById(userId, function(err, userData) {
			var user = userData;
			user.firstName = firstName;
			user.save(function(err) {
				if(err) {
					console.log("fail");
					res.json({status: 500});
				}
				else {
					console.log("success");
					res.json({status: 200});
				}
			})
		})
	},
	updateLastName: function(req, res) {
		var lastName = req.body.lastName;
		var userId = req.body.userId;
		User.findById(userId, function(err, userData) {
			var user = userData;
			user.lastName = lastName;
			user.save(function(err) {
				if(err) {
					console.log("fail");
					res.json({status: 500});
				}
				else {
					console.log("success");
					res.json({status: 200});
				}
			})
		})
	},
	updateCity: function(req, res) {
		var city = req.body.city;
		var userId = req.body.userId;
		User.findById(userId, function(err, userData) {
			var user = userData;
			user.city = city;
			user.save(function(err) {
				if(err) {
					console.log("fail");
					res.json({status: 500});
				}
				else {
					console.log("success");
					res.json({status: 200});
				}
			})
		})
	},
	updateState: function(req, res) {
		var state = req.body.state;
		var userId = req.body.userId;
		User.findById(userId, function(err, userData) {
			var user = userData;
			user.state = state;
			user.save(function(err) {
				if(err) {
					console.log("fail");
					res.json({status: 500});
				}
				else {
					console.log("success");
					res.json({status: 200});
				}
			})
		})
	},
	updateDream: function(req, res) {
		var dream = req.body.dream;
		var userId = req.body.userId;
		User.findById(userId, function(err, userData) {
			var user = userData;
			user.dream = dream;
			user.save(function(err) {
				if(err) {
					console.log("fail");
					res.json({status: 500});
				}
				else {
					console.log("success");
					res.json({status: 200});
				}
			})
		})
	},
	updateLocation: function(req, res) {
		//var location = req.body.location;
		var lati = req.body.lati;
		var long = req.body.long;
		var userId = req.body.userId;
		User.findById(userId, function(err, userData) {
			var user = userData;
			user.lati = lati;
			user.long = long;
			//user.location = location;
			user.save(function(err) {
				if(err) {
					console.log("fail");
					res.json({status: 500});
				}
				else {
					console.log("success");
					res.json({status: 200});
				}
			})
		})
	},
	
	
	postItem: function(req, res) {
		var items = new Item({
			name: req.body.name,
			timeStamp: new Date(),
			rating: 0,
			usersRated: 0,
			userSubmitted : req.user._id,
			userId: req.user._id
		});
		items.save(function(err, allItems) {
			if(err) {
				res.error(err);
			}
			else {
				res.json(allItems);
			}
		})
	},
	getItems: function(req, res) {
		Item.find({userId: req.user._id}).exec(function(err, allItems) {
			if(err) {
				res.error(err);
			}
			else {
				res.json(allItems)
			}
		}
	)},
	getAllItems: function(req, res) {
		Item.find({}).populate('userSubmitted').exec(function(err, allItems) {
			if(err) {
				res.error(err);
			}
			else {
				res.json(allItems)
			}
		}
	)},
	deleteItems: function(req, res) {
		var id = req.params.id;
		Item.findOneAndRemove({_id: req.body.itemId}, function(err, doc) {
			if(err) {
				console.log(err);
			}
			else {
				res.json(doc);
			}
		})
	},
	rate : function(req, res) {
		Item.findOne({_id: req.body.itemId}, function(err, doc) {
			var newRating;
			newRating = ((doc.usersRated * doc.rating) + req.body.x) / (doc.usersRated + 1)

			Item.update({ _id: doc._id },
				{ $set: {
					rating: newRating,
					usersRated: doc.usersRated + 1
				}}, function(err, doc) {
					if (err) {
						res.send(false);
					} else {
						res.send({ newRating: newRating });
					}
				});
		})
	}
	
	/*
	postItem: function(req, res) {
		var item = new Item({
			name: req.body.name,
			timeStamp: new Date(),
			rating: 0,
			usersRated: 0,
			userSubmitted : req.user._id,
			image: req.body.image,
			userId: req.user._id
		});
		var file = req.files.file;
		console.log("user " + " fs submitting ", file);
		var uploadDate = new Date();
		var tempPath = file.path;
		var targetPath = path.join(__dirname, "../itemUploads/" + uploadDate + file.name);
		var savePath = "/itemUploads/" + uploadDate + file.name;
		fs.rename(tempPath, targetPath, function(err) {
			if(err) {
				console.log(err)
			}
			else {
				item.image = savePath;
				item.save(function(err, allItems) {
					if(err) {
						res.error(err);
					}
					else {
						res.json(allItems);
					}
				})
			}
		})	
	},
	*/
		
};










