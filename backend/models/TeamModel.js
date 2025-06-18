var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name: String,
  group: String,
  place: Number, // group place (1st, 2nd..)
  points: Number,
  goals_scored: Number,
  goals_conceded: Number,
  goals_diff: Number,
  wins: Number,
  draws: Number,
  losses: Number,
  isPlaying: Boolean,
  matches_played: Number,
});

module.exports = mongoose.model("Team", TeamSchema);
