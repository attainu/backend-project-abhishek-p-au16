var express = require('express');
var router = express.Router();
let productHelper = require('../helpers/product-helper');
let userHelper = require('../helpers/user-helper')
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
  userHelper.doSignup(req.body).then((responce)=>{
    console.log(responce)
  })
  
})
router.get('/login',(req,res)=>{
     res.render("user/login")
})
router.post('/login',(req,res)=>{
  console.log(req.body)
  userHelper.doLogin(req.body)
})
module.exports = router;
