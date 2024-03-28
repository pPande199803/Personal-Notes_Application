const NotesAuth_Schema = require("../models/auth.models");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const notesRegisterData = (req, res) => {
  const notesAuth = new NotesAuth_Schema(req.body);
  notesAuth
    .save()
    .then((result) => {
      res.status(201).send({
        message: "Register User Successfully...",
        success: true,
        notesRegisterData: result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Something Went Worong..",
        success: false,
        error,
      });
    });
};

const notesLoginData = (req, res) => {
  const userEmailCheck = req.body.emailId;
  NotesAuth_Schema.find({ emailId: req.body.emailId , password:req.body.password}).then((result) => {
    if (result.length < 1) {
      return res.status(401).send({
        message: "User Not Found",
        success: false,
      });
    }
      const user = result[0];
      const userData = {
        emailId: user.emailId,
        userName: user.userName,
      };
      const jwtToken = jwt.sign(
        {data:userData},process.env.SECREAT_KET,
        { expiresIn: "5000" }
      );
       res.status(201).send({
            message: "Login Successfully..",
            success: true,
            token: jwtToken,
            data: result,
        })
  }).catch((error) => {
    res.status(501).send({
      message: "Something Went Worong..",
      success: false,
      error,
    });
  });
};

module.exports = { notesRegisterData, notesLoginData };
