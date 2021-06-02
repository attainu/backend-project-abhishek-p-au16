var express = require('express');
var router = express.Router();
let productHelper = require('../helpers/product-helper');
/* GET admin listing. */
router.get('/', function(req, res, next) {
 productHelper.getAllProducts().then((products)=>{
  res.render('admin/view-product',{products,admin:true});
 })
  
});

router.get("/add-product",(req,res)=>{
  res.render('admin/add-product',{admin:true})
})

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
router.get("/delete/:id",(req,res)=>{
  let proId = req.params.id
  console.log(proId)
  productHelper.deleteProduct(proId).then((respponse)=>{
    res.redirect('/admin')
  })

})

router.get("/edit-product/:id",async(req,res)=>{
  let product =await productHelper.getProductDetails(req.params.id)
  console.log(product)
  res.render("admin/edit-product",{product})
})
router.post('/edit-products/:id',(req,res)=>{
  console.log(req.body)
  productHelper.updateProduct(req.param.id,req.body).then(()=>{
    res.redirect("/admin")
  })
})

module.exports = router;
