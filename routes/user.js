const { response } = require('express');
var express = require('express');
const { render } = require('../app');
var router = express.Router();
let productHelper = require('../helpers/product-helper');
let userHelper = require('../helpers/user-helper')

//middleware for user logged in or not
const verifyLogin=(req,res,next)=>{
  if(req.session.user){
    next()
  }else{
    res.redirect('/login')
  }

}
/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  console.log(user)
  productHelper.getAllProducts().then((products)=>{
     res.render('user/view-product',{products,user,admin:false});
  })

 
});


//router for usersignup

router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  console.log(req.body)
  userHelper.doSignup(req.body).then((responce)=>{
    console.log(responce)
    req.session.user = response
    req.session.user.loggedIn=true
    res.redirect('/')
  })
  
})

//router for userlogin

router.get('/login',(req,res)=>{
     res.render("user/login")
})
router.post('/login',(req,res)=>{
  console.log(req.body)
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status){
    
      req.session.user=response.user
      req.session.user.loggedIn=true
      res.redirect('/')
    }else{
      res.redirect("/login")
    }
  })
  
})
router.get('/logout',(req,res)=>{
  req.session.user=null
  res.redirect('/')
})

//router for add products in cart

router.get('/add-to-cart/:id',verifyLogin,(req,res)=>{
  userHelper.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.redirect('/')
  })
})

router.get("/cart",verifyLogin,async(req,res)=>{
  let products = await userHelper.getCartProducts(req.session.user._id)
  console.log(products)
  res.render("user/cart",{products})
})

//router for add address and details
router.get('/place-order',verifyLogin,(req,res)=>{
  res.render('user/place-order')
})




//router for place order


// router.post('/place-order',async(req,res)=>{
//   console.log(req.body)
//   let cartProducts = await userHelper.getCartProducts(req.session.user._id)
//   let address = req.body

//   userHelper.getOrders(cartProducts,address).then((responce)=>{
//     console.log(responce)
//     res.redirect('/')
//   })
//   console.log(cartProducts,address)
// })
module.exports = router;
