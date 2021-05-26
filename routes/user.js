var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let products = 
    {
    name:"Dabur Honey",
    catogary:"honey",
    discription:" 100% Pure World's No.1 Honey Brand with No Sugar Adulteration - 1kg (Get 20% Extra)",
    image:"https://images-na.ssl-images-amazon.com/images/I/81hghkkAaSL._SL1500_.jpg"
  }

  
  res.render('index',{products,admin:false});
});

module.exports = router;
