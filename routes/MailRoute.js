const router = require("express").Router();
const mailController = require("../controllers/MailController");
const AuthGuard = require("../guard/AuthGuard");

router.post("/contact/message", mailController.sendEmail);
router.post(
  "/confirmation/message",
  AuthGuard,
  mailController.sendConfirmationMail
);

module.exports = router;
