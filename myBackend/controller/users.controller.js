require("dotenv").config();

const express = require("express");
const app = express();
const Users = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getMaxListeners } = require("../model/users.model");
app.use(express.json());

module.exports = (app) => {

  app.get("/users", function (req, res) {
    const findUsers = Users.find({}, function (err, foundUsers) {
      if (err) {
        res.status(400).send({
          message: "Error getting users",
        })
      }
      return res.send([...foundUsers]);
    });
  });

  app.post("/users/signup", async function (req, res) {
    const password = req.body.password
    const email = req.body.email
    try {
      Users.findOne({email: req.body.email}, async function(req, userData){
        if(userData !== null){
          return res.status(409).send("A User With This Email Already Exists")
        }
        else if (
          email == null ||
          email == "" ||
          password == null ||
          password == ""
          ) {res.status(400).send("Enter Email and Password")
        } 
        else{
          const hashedPassword = await bcrypt.hash(password, 10);
          const userList = new Users({
            email: email,
            password: hashedPassword,
          });
        userList.save();
        }
        return res.status(201).send("Successfully added user");
    })
    } catch {
      if (res.status == !400 || res.status == !201) {
        res.status(500).send("Error");
      }
    }
  });

  app.post("/users/login", async function (req, res) {
    let user;
    user = await Users.findOne({
      email: req.body.email,
    });
    if (user == null) {
      return res.status(400).send({ message: "User Does Not Exist" });
    }
    return bcrypt.compare(
      req.body.password,
      user.password,
      function (err, result) {
        if (!result || err) {
          return res
            .status(203)
            .send({ message: "Incorrect Email or Password" });
        } else {
          const accessToken = newToken({ _id: user._id, email: user.email });
          const refreshToken = jwt.sign(
            { _id: user._id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "302400s" },
            (err, regenToken) => {
              if (err) {
                return res.status(401);
              }
              return res.send({ accessToken: accessToken, refreshToken: regenToken });
            }
          );
        }
      }
    );
  });

  app.post("/newAccessToken", (req, res) => {
    const authHeader = req.headers["authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.send({accessToken: "undefined"}).status(403);
      const accessToken = newToken({ _id: user._id, email: user.email });
      res.send({ accessToken: accessToken });
    });
  });

  function newToken(currentUser) {
    return jwt.sign({ user: currentUser }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "604800s",
    });
  }
};
