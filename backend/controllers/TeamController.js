const TeamModel = require("../models/TeamModel.js");

/**
 * TeamController.js
 *
 * @description :: Server-side logic for managing Teams.
 */
module.exports = {
  /**
   * TeamController.list()
   */
  list: async (req, res) => {
    try {
      const teams = await TeamModel.find();
      return res.json(teams);
    } catch (err) {
      return res.status(500).json({
        message: "Error when getting Team.",
        error: err,
      });
    }
  },

  /**
   * TeamController.show()
   */
  show: async (req, res) => {
    try {
      const id = req.params.id;
      const team = await TeamModel.findById(id);

      if (!team) {
        return res.status(404).json({ message: "No such Team" });
      }

      return res.json(team);
    } catch (err) {
      return res.status(500).json({
        message: "Error when getting Team.",
        error: err,
      });
    }
  },

  /**
   * TeamController.create()
   */
  create: async (req, res) => {
    try {
      const team = new TeamModel({ ...req.body });
      const savedTeam = await team.save();
      return res.status(201).json(savedTeam);
    } catch (err) {
      return res.status(500).json({
        message: "Error when creating Team",
        error: err,
      });
    }
  },

  /**
   * TeamController.update()
   */
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const team = await TeamModel.findById(id);

      if (!team) {
        return res.status(404).json({ message: "No such Team" });
      }

      // Posodobi lastnosti, če obstajajo v body
      Object.keys(req.body).forEach((key) => {
        if (req.body[key] !== undefined) {
          team[key] = req.body[key];
        }
      });

      const updatedTeam = await team.save();
      return res.json(updatedTeam);
    } catch (err) {
      return res.status(500).json({
        message: "Error when updating Team.",
        error: err,
      });
    }
  },

  /**
   * TeamController.remove()
   */
  remove: async (req, res) => {
    try {
      const id = req.params.id;
      await TeamModel.findByIdAndRemove(id);
      return res.status(204).json();
    } catch (err) {
      return res.status(500).json({
        message: "Error when deleting the Team.",
        error: err,
      });
    }
  },
};
