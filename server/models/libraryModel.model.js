let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let librarySchema = new Schema({
    bCode : {
        type:String,
        required:true,
        unique:true
    },
    bName : {
        type:String,
        required:true,
    },
    bAuthor : {
        type:String,
        required:true,
    },
    bPrice : {
        type:Number,
        required:true,
    }
});

let libraryModel = mongoose.model('dataLibrary',librarySchema);
module.exports = {libraryModel};