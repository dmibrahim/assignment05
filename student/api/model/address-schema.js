const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state:String,
    zip:Number

})

 module.exports = addressSchema;