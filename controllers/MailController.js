const oauth = require('../configuration/oauth');
const nodemailer = require('nodemailer');

exports.sendEmail = (req, res) => {
  const { name, lastname, email, message } = req.body;

  let mailOptions = {
    from: name,
    to: 'faouzi.aitelhara@gmail.com, joebarne15@gmail.com',
    subject: 'My site contact from: ' + name,
    text: message,
    html:
      'Message from: ' +
      name +
      lastname +
      '<br></br> Email: ' +
      email +
      '<br></br> Message: ' +
      message,
  };

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: oauth,
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(400).json({
        status: 'fail',
        message: 'Your message could not be sent, please try again later',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Your message was successfully sent, thank you!',
    });
  });
};

exports.sendConfirmationMail = (req, res) => {
  const { clientMail, user, order, total } = req.body;

  let mailOptions = {
    from: 'no-reply@waves.com',
    to: clientMail,
    subject: 'Your Purchase Confirmation',
    html: `<h2>Order Confirmation</h2>
    <p>Thank you ${user.name} ${user.lastname} for your purchase.<br />
    The amount of: $${total} will be charged on your card.</p>
    <br />
    <br />
    <h2>Order Summary</h2>
    <br/> 
    <table>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
      ${order.map((element) => {
        return `<tr><td>${element.name}</td><td>$${element.price}</td><td>${element.quantity}</td></tr>`;
      })}
    </table>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).json({
        status: 'fail',
        message: 'The message could not be sent, please try again later',
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Your confirmation message was successfully sent, thank you!',
    });
  });
};
