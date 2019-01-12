var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mailer = require("nodemailer");
var cors = require('cors');

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.post("/", function(req, res) {

  if (!req.body.id || req.body.id !== 250011) {
    res.send("error: don't have id");
  }


  var html =
    "<div>" +
    "<h3>Name: " +
    req.body.name +
    "</h3>" +
    "<h4>Email: " +
    req.body.email +
    "</h4>" +
    "<h4>Phone: " +
    req.body.phone +
    "</h4>" +
    "<p>Message: " +
    req.body.message +
    "</p>" +
    "</div>";

  var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "frominteragrokiev@gmail.com",
      pass: "250011250011"
    }
  });

  var mail = {
    from: " 'Message' <chmutkola@gmail.com>",
    to: "chmutkola@gmail.com",
    subject: "Send Email www.interagrokiev",
    html: html
  };

  try {
    smtpTransport.sendMail(mail, function(error, response) {
      if (error) {
        console.log(error, "111sdfsd");
        res.send("error" + error);
      } else {
        console.log("Message sent: " + response.message);
        res.send("ok: message sent");
      }

      smtpTransport.close();
    });
  } catch (err) {
    res.send(err);
  }
});
module.exports = app;
