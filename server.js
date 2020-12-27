const express = require("express");
const app = express();
const bodyparser = require ("body-parser")
const todoController = require("./controller/todo.controller");
const todoModel = require("./model/todo.model")
const mongoose = require('mongoose');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
require('../myBackend/node_modules/dotenv/config')
mongoose.connect(process.env.DB_PASS, {useNewUrlParser: true, useUnifiedTopology: true}, function(req,res){console.log("Connected to DB...")});

todoController(app);


app.listen(3000, function(req,res){
    console.log("Server started on port 3000")
})

