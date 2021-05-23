1. Games, reviews, publishers and student api are both in one project, separated by different folders.
2. game,review, publisher and student share one connection and one .env file which stores information about
each API database url and server port number. The connection file is in share/db/db-connection.
3. Game, review and publisher share schema and models files. These files are stored in shared/model directory
4. The server file (index.js) resides at the root of each folder (game,review,publisher, student folders), it opens the database connection
by passing in the dburl for that application. The dburl and port numbers are stored in the .env file.

4. To run the headless APIs, using node cli type in 'node projectFolderName' (game, review,student,publisher)
5. STUDENT ENDPOINTS
var path = '/api/students/';
router.route(path)
   .get(studentController.getAll)  (This returns all students)
   .post(studentController.registerNew) (This endpoint is for registering a new student)

router.route(path+':studentid')
    .get(studentController.getOneStudent) (This returns one student by the id)
    .put(studentController.fullUpdateStudent ) (This will perfom a full update of a student, technically it requires the client to pass in all required student information)
    .patch(studentController.partiaUupdateStudent);(This will perfom a partial update on student, client doesnt need to pass in all information, but has to pass some)

router.route(path+':studentid/address')
     .get(studentController.getstudentAddress ); (This endpoint will return the address(es) for the particular student)

router.route(path+':studentid/address/:addressid' )
       .get( studentController.getOneStudentAddress) (This will return one specific address for a student,using student and address id)
       .put( studentController.fullUpdateStudentAddress) (This will perfom a full update of a specific student address, technically it requires the client to pass in all required      student address information)
       .patch(studentController.PartialUpdateStudentAddress)(This will perfom a partial update of a student address.The client can only pass in the address information that needs update)

6.GAME REVIEW ENDPOINTS
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
      
7. GAME PUBLISHER ENDPOINTS
8. const path = '/api/games/';
router.route(path+'publishers')
      .get(publisherController.getAllPublishers)  
router.route(path+':gameId/publishers')   
      .get(publisherController.getGamePublisher )
      .post(publisherController.addPublisher)
router.route(path+':gameId/publishers/:publisherId') 
      .put(publisherController.updatePublisher)
      .patch(publisherController.partialPublisherUpdate)
      .delete(publisherController.deletePublisher)
   
8. GAME ENDPOINTS
const path = '/api/games/';
router.route(path)
      .get(gamesController.findAll )
      .post(gamesController.createNewGame)
router.route(path+':gameId')
      .get(gamesController.findoneGame )
      .delete(gamesController.deleteGame)
      .patch(gamesController.partialGameUpdate)
      .put(gamesController.updateGameById)
