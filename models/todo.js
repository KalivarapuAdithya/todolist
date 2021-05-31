const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name :{
        type : String,
        required : "name cannot be empty"
    },
    completed :{
        type : Boolean,
        default : false
    },
    createdOn :{
        type : Date,
        default : Date.now
    }
});

const Todo = mongoose.model("Todo" , todoSchema);

module.exports = Todo;

