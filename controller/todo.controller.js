const express = require("express");
const app = express();
const Items = require("../model/todo.model")
const jwt = require("jsonwebtoken");
module.exports = (app) => {



    function tokenAuth(req,res,next){
        const authHeader = req.headers['Authorization'] || req.headers["authorization"]
        const token = authHeader && authHeader.split(' ')[1];
        if(token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send("Forbidden")
            req.user = user;
            next();
        })
    }
    
    app.get("/todo/:id", function(req, res) {
        const {
            id
        } = req.params;
        Items.findById(id, function(err, foundData) {
            if (err) {
                res.status(404)
                res.send("Task not found")
            } else {
                res.send(foundData)
            }
        })
    });

    app.get("/todo", tokenAuth, function(req, res) {
        const currentUser = req.user;
        const findData = Items.find({userId: currentUser.user._id},function(err, foundData) {
            if (err) {
                res.status(400).send({
                    message: "Error getting to-do list"
                });
            }else if (res.status == 403){
                
            }
            return res.send([
                ...foundData
            ]);
        });
    });

    app.delete("/todo/:id", tokenAuth,function(req, res) {
        const {
            id
        } = req.params
        Items.findByIdAndRemove({
                _id: id
            },
            function(err, result) {
                if (!err) {
                    res.send("Successfully Deleted Task")
                } else {
                    res.status(500).send("Unable to delete task")
                }
            })
    });

    app.post("/todo", tokenAuth,function(req, res) {
        const currentUser = req.user;
        const itemList = new Items({
            userId: currentUser.user._id,
            name: req.body.name,
            status: req.body.status
        })
        itemList.save().then(() => {
                return res.send("Successfully added task to list");
            })
            .catch((err) => {
                res.status(500)
            })
    })
        
    app.patch("/todo/:id", tokenAuth,function(req, res) {
        const {
            id
        } = req.params;
        const {
            name,
            status
        } = req.body;
        Items.updateOne({
                _id: id
            }, {
                $set: {
                    name,
                    status
                }
            },
            function(err) {
                if (!err) {
                    res.send("Successfully edited Task")
                } else {
                    res.send("Failed to edit task")
                    res.status(400)
                }
            }
        )
    })
}