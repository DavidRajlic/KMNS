var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
  name: String,
  group: String,
  place: { type: Number, default: 0 }, // group place (1st, 2nd..)
  points: { type: Number, default: 0 },
  goals_scored: { type: Number, default: 0 },
  goals_conceded: { type: Number, default: 0 },
  goals_diff: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  isPlaying: { type: Boolean, default: false },
  matches_played: { type: Number, default: 0 },
});

module.exports = mongoose.model("Team", TeamSchema);
