const mongoose = require('mongoose');
require('dotenv').config();
// mongoose.set('debug' , true);
const URL = process.env.MONGO_URL;
mongoose.connect(URL , { useNewUrlParser: true  , useUnifiedTopology: true  , useFindAndModify : false});
mongoose.Promise = Promise;

module.exports.Todo = require('./todo');