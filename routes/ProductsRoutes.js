const router = require("express").Router();
const productsRoutes = require("../controllers/ProductsController");
const woodRoutes = require("../controllers/WoodController");
const AuthGuard = require("../guard/AuthGuard");
const Admin = require("../guard/AdminCheck");

router.get("/products/brands", productsRoutes.brands);
router.get("/products/woods", woodRoutes.woods);

router.post("/products/newbrand", AuthGuard, Admin, productsRoutes.createBrand);
router.post("/products/newwood", AuthGuard, Admin, woodRoutes.createWood);

module.exports = router;
