const router = require("express").Router();
const userRoutes = require("../controllers/UserController");
const AuthGuard = require("../guard/AuthGuard");

router.post("/register", userRoutes.register);
router.post("/login", userRoutes.login);
router.post(
  "/userHistory/:id",
  AuthGuard,
  userRoutes.updateUserPurchaseHistory
);
router.get("/user/:id", AuthGuard, userRoutes.getUserById);
router.get("/list", userRoutes.list);

module.exports = router;
