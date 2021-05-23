const express = require('express');
const router = express.Router();
const publisherController = require('../controller/publisherController');


const path = '/api/games/';
router.route(path+'publishers')
      .get(publisherController.getAllPublishers)  
router.route(path+':gameId/publishers')   
      .get(publisherController.getGamePublisher )
      .post(publisherController.addPublisher)
router.route(path+':gameId/publishers/:publisherId') 
      .put(publisherController.updatePublisher)
      .patch(publisherController.partialPublisherUpdate)
      .delete(publisherController.deletePublisher)

// router.route(path+':gameId/publishers/:publisherId')     
//       .patch(publisherController.partialpublisherUpdate)
//       .put(publisherController.updatePublisherById)
//       .delete(publisherController.deletePublisher)

module.exports = router;