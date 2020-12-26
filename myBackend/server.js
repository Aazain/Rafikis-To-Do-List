const express = require("express");
const app = express();
const bodyparser = require ("body-parser")
const mongoose = require('mongoose');
const path = require("path")
const newItems = []
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
require('../myBackend/node_modules/dotenv/config')
mongoose.connect(process.env.DB_PASS, {useNewUrlParser: true, useUnifiedTopology: true}, function(req,res){console.log("Connected to DB...")});
const listSchema = new mongoose.Schema({
    name: String
})
const Items = mongoose.model("Item", listSchema)

app.get("/", function(req,res){
    return res.send({
        id: "1",
        task: "I am retarded"
    })
})

app.post("/", function(req,res){
    const itemList = new Items({
        name: req.body.name
    })
    itemList.save(function(err){
        if (!err){
            res.send("Successfully added to DB")
        }else{
            res.send("Failed to add name to DB")
        }
    })
})



app.listen(3000, function(req,res){
    console.log("Server started on port 3000")
})

