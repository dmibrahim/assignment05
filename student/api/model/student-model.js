const mongoose= require('mongoose');
const addressSchema = require('./address-schema');

const studentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    gpa:{type:Number,required:true},
    address:[addressSchema]
})
module.exports = mongoose.model('Student',studentSchema);