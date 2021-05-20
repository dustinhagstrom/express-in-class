const express = require("express");
const router = express.Router();

let productsArray = [
  {
    id: "1",
    name: "pants",
  },
  {
    id: "2",
    name: "shorts",
  },

  {
    id: "3",
    name: "shirts",
  },
];

router.get("/", function (req, res) {
  res.json({ productsArray });
});

router.get("/:id", function (req, res) {
  const productId = req.params.id;
  productsArray.forEach(function (item) {
    if (item.id === productId) {
      res.json({
        item,
      });
    } else {
      res.json({
        message:
          "The product ID you entered does not match any products in our system.",
      });
    }
  });
});

router.get("/:name", function (req, res) {
  const productName = req.params.name;
  productsArray.forEach(function (item) {
    if (item.name === productName) {
      res.json({
        item,
      });
    } else {
      res.json({
        message:
          "The product name you entered does not match any products in our system.",
      });
    }
  });
});

router.post("/create-product", function (req, res) {
  let newProductObject = {
    id: req.body.id,
    name: req.body.name,
  };
  let isFound;
  productsArray.forEach(function (item) {
    if (item.name === newProductObject.name || item.id == newProductObject.id) {
      isFound = true;
    }
  });
  if (isFound) {
    res.json({
      message: "This product name or this product id already exists!",
    });
  } else {
    productsArray.push(newProductObject);
    res.json({ productsArray });
  }
});

router.put("/update-product/:id", function (req, res) {
  let foundProduct;
  let canUpdate = false;
  productsArray.forEach(function (item) {
    if (req.params.id === item.id) {
      foundProduct = item;
      canUpdate = true;
    }
  });
  if (canUpdate) {
    let isFound = productsArray.findIndex(
      (item) => item.id === req.body.updatedID
    );
    if (isFound > -1) {
      res.json({ message: "Sorry, the information you input is invalid." });
    } else {
      foundProduct.id = req.body.updatedID;
      res.json({ productsArray });
    }
  } else {
    res.json({ message: "Product not found" });
  }
});

router.delete("/delete-product/:id", function (req, res) {
  let foundProduct;
  let canDelete = false;
  productsArray.forEach(function (item) {
    if (item.id === req.params.id) {
      foundProduct = item;
      canDelete = true;
    }
  });
  if (canDelete) {
    let productIndex = productsArray.findIndex(
      (item) => item.id === foundProduct.id
    );
    productsArray.splice(productIndex, 1);
    res.json({ index: productsArray });
  } else {
    res.json({
      message:
        "The product id you input does not match any products in our system.",
    });
  }
});

module.exports = router;
