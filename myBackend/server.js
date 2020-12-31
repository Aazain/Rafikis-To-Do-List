const express = require("express");
const app = express();
const bodyparser = require("body-parser")
const todoController = require("./controller/todo.controller");
const todoModel = require("./model/todo.model")
const mongoose = require('mongoose');
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: false
}))
require('dotenv/config')

mongoose.connect(process.env.DB_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, function(req, res) {
    console.log("Connected to DB...")
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS',next()){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
})

todoController(app);


let port = process.env.PORT;
if (port == null || port == ""){
    port = 3000
}
app.listen(port, function(req,res){
    console.log("Server started successfully")  
})
    


