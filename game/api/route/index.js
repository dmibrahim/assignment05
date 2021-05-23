const express = require('express');
const router = express.Router();
const gamesController = require('../controller/gameController');


const path = '/api/games/';
router.route(path).get(gamesController.findAll ).post(gamesController.createNewGame)
router.route(path+':gameId')
      .get(gamesController.findoneGame )
      .delete(gamesController.deleteGame)
      .patch(gamesController.partialGameUpdate)
      .put(gamesController.updateGameById)
      



module.exports = router;