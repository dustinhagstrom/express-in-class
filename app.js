const express = require("express");
const logger = require("morgan");
const path = require("path");

const app = express();

const productRouter = require("./router/productRouter.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/product", productRouter);

app.listen("3000", function () {
  console.log(`Server is running on port ${3000}`);
});
