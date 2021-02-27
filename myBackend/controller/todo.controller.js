const express = require("express");
const app = express();
const Items = require("../model/todo.model");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
module.exports = (app) => {

  function tokenAuth(req, res, next) {
    const authHeader =
      req.headers["Authorization"] || req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send("Forbidden");
      req.user = user;
      next();
    });
  }

  app.get("/todo/:id", tokenAuth, function (req, res) {
    const currentUser = req.user;
    const { id } = req.params;
    Items.findById(id, function (err, foundData) {
      if(foundData == null){
        return res.status(404).send("Task does not Exist")
      }
      if(currentUser.user._id !== foundData.userId){
        return res.status(403).send("Forbidden")
      }
      if (err) {
        res.status(404);
       return res.send("Task was not found");
      }
      else {
        res.send(foundData);
      }
    });
  });

  app.get("/todo", tokenAuth, function (req, res) {
    const currentUser = req.user;
    const findData = Items.find({ 
      userId: currentUser.user._id 
    },
      function (err, foundData) {
        if (err) {
          res.status(400).send({
            message: "Error getting to-do list",
          });
        } 
        return res.send([...foundData]);
      }
    );
  });

  app.delete("/todo/:id", tokenAuth, function (req, res) {
    const currentUser = req.user;
    let userId = currentUser.user._id
    const { id } = req.params;
    Items.findByIdAndRemove(
      {
        _id: id,
        userId: userId
      },
      function (err, result) {
        if (!err) {
          res.send("Successfully Deleted Task");
        } 
        else {
          res.status(500).send("Unable to delete task");
        }
      }
    );
  });

  app.post("/todo", tokenAuth, function (req, res) {
    const currentUser = req.user;
    const itemList = new Items({
      userId: currentUser.user._id,
      name: req.body.name,
      status: req.body.status,
    });
    itemList
      .save()
      .then(() => {
        return res.send("Successfully added task to list");
      })
      .catch((err) => {
        return res.status(500);
      });
  });

  app.patch("/todo/:id/:userId", tokenAuth, function (req, res) {
    const currentUser = req.user;
    let userId = currentUser.user._id
    const { id } = req.params;
    const { name, status } = req.body;
      Items.updateOne(
        {
          _id: id,
          userId
        },
        {
          $set: {
            name,
            status,
          },
        },
        function (err) {
          if (!err) {
            return res.send("Successfully edited Task");
          }
          else {
            return res.status(400).send("Failed to edit task");
          }
        }
      );
  });
};
