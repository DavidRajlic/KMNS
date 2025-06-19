var express = require("express");
var router = express.Router();
var PlayerController = require("../controllers/PlayerController.js");

/*
 * GET
 */
router.get("/", PlayerController.list);

router.get("/team/:teamId", PlayerController.listByTeam);

/*
 * GET
 */
router.get("/:id", PlayerController.show);

/*
 * POST
 */
router.post("/", PlayerController.create);

/*
 * PUT
 */
router.put("/:id", PlayerController.update);

/*
 * DELETE
 */
router.delete("/:id", PlayerController.remove);

module.exports = router;
