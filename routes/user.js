var express = require('express');
var router = express.Router();
let productHelper = require('../helpers/product-helper');
let userHelper = require('../helpers/user-helper')
/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log(user)
  productHelper.getAllProducts().then((products)=>{
     res.render('user/view-product',{products,user,admin:false});
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
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      res.redirect("/login")
    }
  })
  
})
module.exports = router;
