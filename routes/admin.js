var express = require('express');
const { response } = require('express');
var router = express.Router();
let productHelper = require('../helpers/product-helper');
let adminHelper = require('../helpers/admin-helper')


//middle ware for verify admin logged in or not

const verifyLogin=(req,res,next)=>{
  if(req.session.admin){
    next()
  }else{
    res.render('admin/admin-login')
  }

}


/* GET admin listing. */

router.get('/',verifyLogin ,function(req, res, next) {
 productHelper.getAllProducts().then((products)=>{
  res.render('admin/view-product',{products,admin:true});
 })
  
});
//router for addproduct

router.get("/add-product",verifyLogin,(req,res)=>{
  res.render('admin/add-product',{admin:true})
})

//post method to add product

router.post('/add-product',(req,res)=>{
  console.log(req.body)
  console.log(req.files.Image)
  productHelper.addproduct(req.body,(id)=>{
    let image = req.files.Image
    console.log(id)
    image.mv('./public/product-image/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product")
      }else{
        console.log(err)
      }
    })
  })


}),

//router for delete product
router.get("/delete/:id",(req,res)=>{
  let proId = req.params.id
  console.log(proId)
  productHelper.deleteProduct(proId).then((response)=>{
    res.redirect('/admin')
  })

})
//router for edit product
router.get('/edit-product/:id', async (req,res)=>{
  let product =await productHelper.getProductDetails(req.params.id)
  console.log(product)
  res.render("admin/edit-product",{product})
})


//postmethode for edit products


router.post('/edit-product/:id',(req,res)=>{
  console.log(req.body)
  productHelper.updateProduct(req.params.id,req.body).then(()=>{
  res.redirect("/admin")
  if (req.files.Image){
    let image = req.files.Image
    image.mv('./public/product-image/'+req.params.id+'.jpg',(err,done)=>{
      if(!err){
        res.render("admin/add-product")
      }else{
        console.log(err)
      }
    })
  }  
  })

})



//router for admin signup

//router.get('/admin-signup',(req,res)=>{
//  res.render('admin/admin-signup')
//})

// router.post('/admin-signup',(req,res)=>{
//   console.log(req.body)
//   adminHelper.doSignup(req.body).then((responce)=>{
//     console.log(responce)
//     req.session.admin = response
//     req.session.admin.loggedIn=true
//     res.redirect('/')
//   })
  
  
// })



//router for admin login
router.get('/admin-login',(req,res)=>{
  res.render('admin/admin-login',{admin:true})

})


 router.post('/admin-login',(req,res)=>{
  console.log(req.body)
  adminHelper.doLogin(req.body).then((response)=>{
    if(response.status){
    
      req.session.user=response.admin
      req.session.admin=true
      res.redirect('/admin')
    }else{
      res.render("admin/admin-login")
    }
  })

 })


//router to orders

 router.get('/orders',verifyLogin,(req,res)=>{
   res.render('admin/orders',{admin:true})

 })
module.exports = router;
