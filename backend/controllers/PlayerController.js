const PlayerModel = require("../models/PlayerModel.js");

module.exports = {
  // GET /players
  list: async (req, res) => {
    try {
      const players = await PlayerModel.find();
      return res.json(players);
    } catch (error) {
      return res.status(500).json({
        message: "Error when getting players.",
        error: error,
      });
    }
  },

  listByTeam: async function (req, res) {
    try {
      const teamId = req.params.teamId;
      const players = await PlayerModel.find({ team_id: teamId });
      return res.json(players);
    } catch (err) {
      return res.status(500).json({
        message: "Napaka pri pridobivanju igralcev za ekipo.",
        error: err,
      });
    }
  },
  // GET /players/:id
  show: async (req, res) => {
    try {
      const player = await PlayerModel.findById(req.params.id);
      if (!player) {
        return res.status(404).json({ message: "No such Player" });
      }
      return res.json(player);
    } catch (error) {
      return res.status(500).json({
        message: "Error when getting Player.",
        error: error,
      });
    }
  },

  // POST /players
  create: async (req, res) => {
    try {
      const player = new PlayerModel({ ...req.body });
      const savedPlayer = await player.save();
      return res.status(201).json(savedPlayer);
    } catch (error) {
      return res.status(500).json({
        message: "Error when creating Player.",
        error: error,
      });
    }
  },

  // PUT /players/:id
  update: async (req, res) => {
    try {
      const player = await PlayerModel.findById(req.params.id);
      if (!player) {
        return res.status(404).json({ message: "No such Player" });
      }

      Object.keys(req.body).forEach((key) => {
        if (req.body[key] !== undefined) {
          player[key] = req.body[key];
        }
      });

      const updatedPlayer = await player.save();
      return res.json(updatedPlayer);
    } catch (error) {
      return res.status(500).json({
        message: "Error when updating Player.",
        error: error,
      });
    }
  },

  // PUT /players/:id/stats
  updatePlayerStats: async (req, res) => {
    try {
      const { id } = req.params;
      const { goals = 0, yellow_cards = 0, red_cards = 0 } = req.body;

      const player = await PlayerModel.findById(id);
      if (!player) {
        return res.status(404).json({ message: "Igralec ni najden." });
      }

      player.goals += goals;
      player.yellow_cards += yellow_cards;
      player.red_cards += red_cards;

      const updatedPlayer = await player.save();
      return res.json(updatedPlayer);
    } catch (err) {
      return res.status(500).json({
        message: "Napaka pri posodabljanju statistike igralca.",
        error: err,
      });
    }
  },

  // DELETE /players/:id
  remove: async (req, res) => {
    try {
      await PlayerModel.findByIdAndDelete(req.params.id);
      return res.status(204).json(); // No Content
    } catch (error) {
      return res.status(500).json({
        message: "Error when deleting the Player.",
        error: error,
      });
    }
  },
};
