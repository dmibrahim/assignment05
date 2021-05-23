const express = require('express');
const router = express.Router();
const reviewController = require('../controller/reviewController');


const path = '/api/games/';
router.route(path+'reviews')
      .get(reviewController.getAllReviews)  
router.route(path+':gameId/reviews')   
      .get(reviewController.getGameReviews )
      .post(reviewController.addPReview)
router.route(path+':gameId/reviews/:reviewId') 
      .put(reviewController.updateReview)
      .patch(reviewController.partialReviewUpdate)
      .delete(reviewController.deleteReview)
      .get(reviewController.getGameReviewsByReviewId)

// router.route(path+':gameId/publishers/:publisherId')     
//       .patch(publisherController.partialpublisherUpdate)
//       .put(publisherController.updatePublisherById)
//       .delete(publisherController.deletePublisher)

module.exports = router;