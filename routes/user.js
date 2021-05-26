var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let products = 
    [{
    name:"Dabur Honey",
    catogary:"honey",
    discription:" 100% Pure World's No.1 Honey Brand with No Sugar Adulteration - 1kg (Get 20% Extra)",
    image:"https://images-na.ssl-images-amazon.com/images/I/81hghkkAaSL._SL1500_.jpg"
  },
  {
    name:'Surf Excel',
    catogary:"detergent",
    discription:"Surf Excel Easy Wash Detergent Powder, Superfine Powder That Dissolves Easily And Removes Tough Stains, 1.5 Kg",
    image:"https://images-na.ssl-images-amazon.com/images/I/61JjrPGRnTL._SX679_.jpg"
  },{
    name:"Dove Hair Fall Rescue",
    catogary:"shampoo",
    discription:"Dove Hair Fall Rescue Conditioner For Weak, Frizzy Hair, Reduces Hair Fall and Makes Hair Strong & Frizz protected, 180 ml",
    image:"https://images-na.ssl-images-amazon.com/images/I/51sdu-khPYL._SL1000_.jpg"
  },
  {
    name:"nutella",
    catagory:"chocolate",
    discription:"Nutella Hazelnut Spread with Cocoa (Labels may vary), 350g",
    image:"https://images-na.ssl-images-amazon.com/images/I/714A58g3xWS._SL1500_.jpg"
  }
]

  
  res.render('index',{products,admin:false});
});

module.exports = router;
