const express = require("express");
const app = express();
const Users = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = (app)=>{

    app.get("/users", function(req, res) {
        const findUsers = Users.find(function(err, foundUsers) {
            if (err) {
                res.status(400).send({
                    message: "Error getting users"
                })
            }
            return res.send([
                ...foundUsers
            ])
        })
    });

    app.post("/users", async function(req, res){
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const userList = new Users({
                email: req.body.email,
                password: hashedPassword
            });
            userList.save()
            return res.status(201).send("Successfully added user");
            }
            catch{
                res.status(500).send();
            }
    })

    app.post("/users/login", async function(req, res){
        console.log("tyest")
        let user;
             user = await Users.findOne({
                email: req.body.email
            })
      
        if(user == null){
            return res.status(400).send("Canoot find user")
        }
            return bcrypt.compare(req.body.password, user.password, function (err) {
                if (err) {
                    return res.send({message: "Incorrect Email or Password"})
                } else {
                    return res.send({message: "Success"})
                }
            })
    })

}