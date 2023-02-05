const express = require("express");
const router = express.Router();
const Product = require("../models/product")
const { getCart } = require("../utils/cart");
const get_data = require("../utils/data");


router.get("/", async (req, res) => {

  const cart = getCart(req);
  const products = await Product.find().sort({ createdAt : "desc" });
  const data = await get_data();

  res.render("products", { 
    pageName : "Products",
    pageDescription : "Products",
    products : products,
    data : data,
    cart : cart
  });

});

router.get('/:slug', async (req, res) => {

  const cart = getCart(req);
  const product = await Product.findOne({ slug: req.params.slug });
  const data = await get_data();

  if (product == null) {
    res.redirect('/');
  } else {
    res.render("product", { 
      pageName : `Product details - ${product.name}`,
      product : product,
      data : data,
      cart : cart
    });
  }

});


module.exports = router;