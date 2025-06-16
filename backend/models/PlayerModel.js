var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PlayerSchema = new Schema({
	'name' : String,
	'team_id' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'team'
	},
	'team_name' : String,
	'goals' : Number,
	'yellow_cards' : Number,
	'red_cards' : Number
});

module.exports = mongoose.model('Player', PlayerSchema);
