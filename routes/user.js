var express = require('express');
var router = express.Router();
let productHelper = require('../helpers/product-helper');
let userHelper = require('../helper/user-helper')
/* GET home page. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
     res.render('user/view-product',{products,admin:false});
  })

 
});
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  console.log(req.body)
  
})
module.exports = router;
