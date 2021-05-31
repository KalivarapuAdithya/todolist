const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 3000;
const todoroutes = require('./routes/todoapi');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/' , (req,res)=>{
    res.sendFile('index.html');
})

app.use('/api' , todoroutes);

app.listen(port , ()=>{
    console.log(`server listening on port ${port}`);
})