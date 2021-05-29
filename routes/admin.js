var express = require('express');
var router = express.Router();

/* GET admin listing. */
router.get('/', function(req, res, next) {
  let products=[{
    no:1,
    name:"Dabur Honey",
    category:"honey",
    discription:" 100% Pure World's No.1 Honey Brand with No Sugar Adulteration - 1kg (Get 20% Extra)",
    image:"https://images-na.ssl-images-amazon.com/images/I/81hghkkAaSL._SL1500_.jpg"
  },
  { no:'2',
    name:'Surf Excel',
    category:"detergent",
    discription:"Surf Excel Easy Wash Detergent Powder, Superfine Powder That Dissolves Easily And Removes Tough Stains, 1.5 Kg",
    image:"https://images-na.ssl-images-amazon.com/images/I/61JjrPGRnTL._SX679_.jpg"
  },{
    no:3,
    name:"Dove Hair Fall Rescue",
    category:"shampoo",
    discription:"Dove Hair Fall Rescue Conditioner For Weak, Frizzy Hair, Reduces Hair Fall and Makes Hair Strong & Frizz protected, 180 ml",
    image:"https://images-na.ssl-images-amazon.com/images/I/51sdu-khPYL._SL1000_.jpg"
  },
  {
    no:4,
    name:"nutella",
    category:"chocolate",
    discription:"Nutella Hazelnut Spread with Cocoa (Labels may vary), 350g",
    image:"https://images-na.ssl-images-amazon.com/images/I/714A58g3xWS._SL1500_.jpg"
  }]
  res.render('admin/view-products',{products,admin:true});
});

router.get("/add-product",(req,res)=>{
  res.render('admin/add-products',{admin:true})
})

router.post('admin/add-product',(req,res)=>{
  console.log(req.body)
  console.log(req.files.Image)

})

module.exports = router;
