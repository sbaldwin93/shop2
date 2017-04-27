var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemSchema = new Schema({
	name            : {type: String, required: true},
	timeStamp       : {type: Date},
	rating          : {type: Number},
	usersRated      : {type: Number},
	userSubmitted : {type: Schema.Types.ObjectId, ref: 'user'},
	image           : {type: String},
	userId          : {type: String}
});

var Item = mongoose.model('item', itemSchema);
module.exports = Item;