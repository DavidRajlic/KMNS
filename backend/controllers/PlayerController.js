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
