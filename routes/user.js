var express = require('express');
var router = express.Router();
let productHelper = require('../helpers/product-helper');

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
     res.render('user/view-product',{products,admin:false});
  })

 
});

module.exports = router;
