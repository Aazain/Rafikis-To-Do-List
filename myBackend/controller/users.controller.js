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

   
    const poster = app.post("/users/login", async function(req, res){

        const currentUser = req.body.email;
        let user;
        // Looks to see if user input exists in database
             user = await Users.findOne({
                email: req.body.email
            })
            

        //if user does not exist, return error code
        if(user == null){
            return res.status(400).send("Incorrect Email or Password")
        }

        //Bycrypt compares password input to hashed password and if it matches, login is successfull
            return bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (!result) {
                    res.status(203).send("Incorrect Email or Password") 
                } else {
                    const accessToken = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET)
                    res.json({accessToken: accessToken})
                }
            })
         
    })
}



















//This code is functional. It takes the JWT and checks if any array items have the same
// {email:} as the email of the JWT and then it renders the array items that include it.


// function tokenAuth(req,res,next){
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1];
//     if(token == null) return res.sendStatus(401)
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.status(403)
//         req.user = user
//         next();
//     })}

//     app.get("/test", tokenAuth, function(req, res){
//         res.json(post.filter(post => post.email === req.user ))
//     })

//     const post = [
//         {
//             email: "aazain@gmail.com",
//             title: "cool"
//         },
//         {
//             email:"aazainman@gmail.com",
//             title:"good job"
//         },
//         {
//             email:"aazainman@gmail.com",
//             title:"good job"
//         },
//         {
//             email:"aazainman@gmail.com",
//             title:"good job"
//         },
//         {
//             email:"aazainman@gmail.com",
//             title:"good job"
//         }
        
//     ];
