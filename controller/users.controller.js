require("dotenv").config();

const express = require("express");
const app = express();
const Users = require("../model/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());

module.exports = (app) => {
  let refreshTokens = [];

  app.get("/users", function (req, res) {
    const findUsers = Users.find({}, function (err, foundUsers) {
      if (err) {
        res.status(400).send({
          message: "Error getting users",
        });
      }
      return res.send([...foundUsers]);
    });
  });

  app.post("/users/signup", async function (req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const userList = new Users({
        email: req.body.email,
        password: hashedPassword,
      });
      if (
        req.body.email == null ||
        req.body.email == "" ||
        req.body.password == null ||
        req.body.password == ""
      ) {
        res.status(400).send("Enter Email and Password");
      } else {
        userList.save();
      }
      return res.status(201).send("Successfully added user");
    } catch {
      if (res.status == !400 || res.status == !201) {
        res.status(500).send("Error");
      }
    }
  });

  app.post("/users/login", async function (req, res) {
    let user;
    // check user gave a username and password
    user = await Users.findOne({
      email: req.body.email,
    });
    if (user == null) {
      return res.status(400).send({ message: "Incorrect Email or Password" });
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
            { expiresIn: "172800s" },
            (err, regenToken) => {
              if (err) {
                res.status(401);
              }
              refreshTokens.push(regenToken);
              res.send({ accessToken: accessToken, refreshToken: regenToken });
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
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = newToken({ _id: user._id, email: user.email });
      res.send({ accessToken: accessToken });
    });
  });

  function newToken(currentUser) {
    return jwt.sign({ user: currentUser }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "900s",
    });
  }
};
