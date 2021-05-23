const mongoose = require('mongoose');
//const coordinateschema = require('../../publisher/api/model/coordinateSchema')


const publisherschema = new mongoose.Schema({
    name:String,
    country:String,
    location: {
        type: { type: String, default:'Point' },
        coordinates: [Number],
    }
})

module.exports = publisherschema