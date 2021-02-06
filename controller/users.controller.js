require('dotenv').config();

const express = require("express");
const app = express();
const Users = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());


module.exports = (app)=>{

    app.get("/users", function(req, res) {
        //Find all users and then return them
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
            //Hashes Password from password body
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const userList = new Users({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            //Saves Hashed password
            userList.save()
            return res.status(201).send("Successfully added user");
            }
            catch{
                res.status(500).send();
            }
    })

    app.post("/users/login", async function(req, res){

        const username = req.body.email;
        const currentUser = username;

        // Looks to see if user input exists in database
        let user;
             user = await Users.findOne({
                email: req.body.email
            })

        //if user does not exist, return error code
        if(user == null){
            return res.status(400).send("Canoot find user")
        }

        //Bycrypt compares password input to hashed password and if it matches, login is successfull
            return bcrypt.compare(req.body.password, user.password, function (err) {
                if (err) {
                    return res.send({message: "Incorrect Email or Password"})
                } else {
                    
                    const accessToken = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET)
                    res.json({accessToken: accessToken});
                    
                }
            })
    })

}