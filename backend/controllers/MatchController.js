const MatchModel = require("../models/MatchModel.js");

/**
 * MatchController.js
 *
 * @description :: Server-side logic for managing Matchs.
 */
module.exports = {
  /**
   * MatchController.list()
   */
  list: async (req, res) => {
    try {
      const matches = await MatchModel.find();
      return res.json(matches);
    } catch (err) {
      return res.status(500).json({
        message: "Error when getting match.",
        error: err,
      });
    }
  },

  /**
   * MatchController.show()
   */
  show: async (req, res) => {
    try {
      const id = req.params.id;
      const match = await MatchModel.findById(id);

      if (!match) {
        return res.status(404).json({ message: "No such match" });
      }

      return res.json(match);
    } catch (err) {
      return res.status(500).json({
        message: "Error when getting match.",
        error: err,
      });
    }
  },

  /**
   * MatchController.create()
   */
  create: async (req, res) => {
    try {
      const match = new MatchModel({ ...req.body });
      const savedMatch = await match.save();
      return res.status(201).json(savedMatch);
    } catch (err) {
      return res.status(500).json({
        message: "Error when creating Match",
        error: err,
      });
    }
  },

  /**
   * MatchController.update()
   */
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const match = await MatchModel.findById(id);

      if (!match) {
        return res.status(404).json({ message: "No such match" });
      }

      // Posodobi lastnosti, če obstajajo v body
      Object.keys(req.body).forEach((key) => {
        if (req.body[key] !== undefined) {
          match[key] = req.body[key];
        }
      });

      const updatedMatch = await match.save();
      return res.json(updatedMatch);
    } catch (err) {
      return res.status(500).json({
        message: "Error when updating Match.",
        error: err,
      });
    }
  },

  /**
   * MatchController.remove()
   */
  remove: async function (req, res) {
    const id = req.params.id;

    try {
      const match = await MatchModel.findByIdAndDelete(id);

      if (!match) {
        return res.status(404).json({
          message: "No such match to delete",
        });
      }

      return res.status(200).json({
        message: "match deleted successfully",
        deletedMatch: match,
      });
    } catch (err) {
      // Explicitly log the error if you want to debug invalid ObjectId, etc.
      console.error("Delete error:", err);
      return res.status(500).json({
        message: "Error when deleting the review.",
        error: err.message || err,
      });
    }
  },
};
