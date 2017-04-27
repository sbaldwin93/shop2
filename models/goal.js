var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var goalSchema = new Schema({
	content         : {type: String, required: true},
	rating          : {type: Number},
	userId          : {type: String}
});

var Goal = mongoose.model('goal', goalSchema);
module.exports = Goal;