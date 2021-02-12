require('dotenv').config();

const express = require("express");
const app = express();
const Users = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());


module.exports = (app)=>{

    let refreshTokens = [];

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


    app.post("/users/signup", async function(req, res){
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const userList = new Users({
                email: req.body.email,
                password: hashedPassword
            });
            if(req.body.email == null || req.body.email == "" || req.body.password == null || req.body.password == ""){
                res.status(400).send("Enter Email and Password")
            }else{
                userList.save()
            }
            return res.status(201).send("Successfully added user");
            }
            catch{
                if (res.status == !400 || res.status == !201){
                    res.status(500).send("Error");
                }
            }
    })

    

    app.post("/users/login", async function(req, res){

        const currentUser = req.body;
        let user;
        user = await Users.findOne({
            email: req.body.email
        })
        if(user == null){
            return res.status(400).send("Incorrect Email or Password")
        }
        return bcrypt.compare(req.body.password, user.password, function (err, result) {
            if (!result || err) {
                res.status(203).send("Incorrect Email or Password") 
            } else {
                const accessToken = newToken(currentUser);
                const refreshToken = jwt.sign(currentUser, process.env.REFRESH_TOKEN_SECRET, (err, regenToken) => {
                    if(err){res.status(401)}
                    refreshTokens.push(regenToken)
                    res.send({accessToken: accessToken, refreshToken: regenToken})
                })
            }
        }) 
    })



    app.delete("/logout", function (req, res){
        const authHeader = req.headers['authorization']
        const refreshToken = authHeader && authHeader.split(' ')[1];
        refreshTokens = refreshTokens.filter(accessToken => accessToken !== refreshToken)
        res.sendStatus(204)
    })



    app.post("/newToken", (req,res)=>{
        const authHeader = req.headers['authorization']
        const refreshToken = authHeader && authHeader.split(' ')[1];
        if(refreshToken == null) return res.sendStatus(401)
        if(!refreshTokens.includes(refreshToken))return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            const accessToken = newToken(user.email)
            res.json({accessToken: accessToken})
        })
    })

    function newToken(currentUser){
        return jwt.sign({user: currentUser}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10s"})
    }



}





















//This code is functional. It takes the JWT and checks if any array items have the same
// {email:} as the email of the JWT and then it renders the array items that include it.

    // function tokenAuth(req,res,next){
    //     const authHeader = req.headers['authorization']
    //     const token = authHeader && authHeader.split(' ')[1];
    //     if(token == null) return res.sendStatus(401)
    //     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //         if (err) return res.status(403).send("Forbidden")
    //         req.user = user
    //         next();
    //     })
    // }

    //     app.get("/test", tokenAuth, function(req, res){
    //     res.json(post.filter(post => post.email === req.user.email))
    // })







    

    // const post = [
    //     {
    //         email: "aazain@gmail.com",
    //         title: "cool"
    //     },
    //     {
    //         email:"aazainman@gmail.com",
    //         title:"good job"
    //     },
    //     {
    //         email:"aazainman@gmail.com",
    //         title:"good job"
    //     },
    //     {
    //         email:"aazainman@gmail.com",
    //         title:"good job"
    //     },
    //     {
    //         email:"aazainman@gmail.com",
    //         title:"good job"
    //     }
        
    // ];
