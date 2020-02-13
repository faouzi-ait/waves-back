const oauth = require("../configuration/oauth");
const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res, next) => {
  const { name, lastname, email, message } = req.body;

  let mailOptions = {
    from: name,
    to: "faouzi.aitelhara@gmail.com, joebarne15@gmail.com",
    subject: "My site contact from: " + name,
    text: message,
    html:
      "Message from: " +
      name +
      lastname +
      "<br></br> Email: " +
      email +
      "<br></br> Message: " +
      message
  };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: oauth
  });

  try {
    transporter.sendMail(mailOptions, (err, res) => {
      err ? console.log(err) : console.log(res);
    });

    res.status(200).json({
      status: "success",
      message: "Your message was successfully sent, thank you!"
    });
  } catch {
    res.status(400).json({
      status: "fail",
      message: "Your message could not be sent, please try again later"
    });
  }
};
