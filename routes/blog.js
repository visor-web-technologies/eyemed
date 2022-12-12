const router = require("express").Router();
const Article = require("../models/article");
const get_data = require("../utils/data");

router.get("/", async (req, res) => {

  const cart = req.session.cart;
  const blogs = await Article.find().sort({ createdAt : "desc" });
  const data = await get_data();

  res.render("blog", { 
      pageName : "Blog",
      blogs : blogs,
      data : data,
      cart : cart
  });

});

router.get('/:slug', async (req, res) => {

  const cart = req.session.cart;
  const blog = await Article.findOne({ slug: req.params.slug });
  const blogs = await Article.find().sort({ createdAt : "desc" });
  const data = await get_data();

  if (blog == null) {

    res.redirect('/blog');

  } else {

    res.render("full-blog", { 
      pageName : "Blog - " + blog.slug,
      blog : blog,
      blogs : blogs,
      data : data,
      cart : cart
    });

  }
  
});
 

module.exports = router;