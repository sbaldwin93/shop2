var Item = require('../models/items');
var User = require('../models/user');
var fs = require('fs-extra');
var path = require('path');

module.exports = {
	postItems: function(req, res) {
		var items = new Item({
			name: req.body.name,
			quantity: req.body.quantity,
			type: req.body.type,
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
	deleteItems: function(req, res) {
		var id = req.params.id;
		Item.findOneAndRemove({_id: id}, function(err, doc) {
			if(err) {
				console.log(err);
			}
			else {
				res.json(doc);
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
	}
};