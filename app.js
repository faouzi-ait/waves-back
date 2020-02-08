require("dotenv/config");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("./configuration/config");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", require("./routes/UserRoutes"));
app.use("/api/v1", require("./routes/ProductsRoutes"));

mongoose.connect(config.params.db_url(), config.params.db_params, _ =>
  console.log("connected...")
);

app.listen(config.params.port(), _ => {
  console.log(`Listening on port ${config.params.port()}`);
});
