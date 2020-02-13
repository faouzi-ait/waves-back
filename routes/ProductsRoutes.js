const router = require("express").Router();
const brandController = require("../controllers/BrandController");
const guitardController = require("../controllers/GuitardsController");
const woodController = require("../controllers/WoodController");
//const mailController = require("../controllers/MailController");
const AuthGuard = require("../guard/AuthGuard");
const Admin = require("../guard/AdminCheck");

router.get("/products/guitards", guitardController.Guitard);
router.get("/products/guitard/:id", guitardController.GuitardByID);
router.get("/products/brands", brandController.brands);
router.get("/products/woods", woodController.woods);

router.post(
  "/products/newguitard",
  AuthGuard,
  Admin,
  guitardController.createGuitards
);

router.post(
  "/products/newbrand",
  AuthGuard,
  Admin,
  brandController.createBrand
);

router.post("/products/newwood", AuthGuard, Admin, woodController.createWood);

//router.post("/contact/message", mailController.sendEmail);

module.exports = router;
