const router = require("express").Router();
const mailController = require("../controllers/MailController");

router.post("/contact/message", mailController.sendEmail);

module.exports = router;
