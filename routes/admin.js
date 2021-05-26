var express = require('express');
var router = express.Router();

/* GET admin listing. */
router.get('/admin', (req, res,next)=> {
  res.render("connected",{admin:true});
});

module.exports = router;
