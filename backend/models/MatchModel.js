const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  team1_id: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  team2_id: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  team1_name: { type: String, required: true },
  team2_name: { type: String, required: true },
  team1_goals: { type: Number, default: 0 },
  team2_goals: { type: Number, default: 0 },

  team1_scorers: [
    {
      player_id: { type: Schema.Types.ObjectId, ref: "Player" },
      player_name: String,
    },
  ],

  team1_players_yellow_card: [{ type: Schema.Types.ObjectId, ref: "Player" }],

  stage: {
    type: String,
    enum: ["skupine", "četrtfinale", "polfinale", "finale"],
    required: true,
  },

  round: { type: String }, // npr. "2. krog skupinskega dela"
  group: { type: String },

  match_status: {
    type: String,
    enum: ["played", "notPlayed", "live"],
    default: "notPlayed",
  },

  match_time_display: {
    type: String, // to display example "19:00"
    required: true,
  },
  match_time_sort: {
    type: Number, // for sorting example: 1900
    required: true,
  },
  winner: { type: Schema.Types.ObjectId, ref: "Team", default: null },
});

module.exports = mongoose.model("Match", MatchSchema);
