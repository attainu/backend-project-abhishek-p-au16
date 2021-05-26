var express = require('express');
var router = express.Router();

/* GET admin listing. */
router.get('/', (req, res)=> {
  res.send("connected");
});

module.exports = router;
