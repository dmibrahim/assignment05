const mongoose = require('mongoose');
const publisherschema = require('../../shared/model/publishers-schema');
const reviewschema = require('./review-schema');

const gameschema = new mongoose.Schema({
    title:String,
    year:Number,
    rate:Number,
    price:Number,
    minPlayers:Number,
    maxPlayers:Number,
    publisher:[publisherschema],
    reviews:[reviewschema],
    minAge:{type:Number,required:true},
    designers:String

})

module.exports = mongoose.model("Game",gameschema);