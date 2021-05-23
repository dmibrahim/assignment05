const mongoose = require('mongoose');

const reviewschema = new mongoose.Schema({
    name:String, review:String, date:Date
})

module.exports =mongoose.model("Review",reviewschema);