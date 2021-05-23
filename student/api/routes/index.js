const express = require('express');
const router =  express.Router();
const studentController = require('../controller/studentController');

var path = '/api/students/';
router.route(path).get(studentController.getAll).post(studentController.registerNew)

router.route(path+':studentid')
    .get(studentController.getOneStudent)
    .put(studentController.fullUpdateStudent )
    .patch(studentController.partiaUupdateStudent);
 router.get(path+':studentid/address', studentController.getstudentAddress );

router.route(path+':studentid/address/:addressid' )
       .get( studentController.getOneStudentAddress)
       .put( studentController.fullUpdateStudentAddress)
       .patch(studentController.PartialUpdateStudentAddress)

module.exports = router;