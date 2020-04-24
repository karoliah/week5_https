'use strict';
// catRoute
const express = require('express');
const router = express.Router();
const {body, check} = require('express-validator');
const multer = require('multer');
const upload = multer({dest: './uploads/', fileFilter});
const catController = require('../controllers/catController');

// dont save if not image: (needs to be hoisted, that's why not arrow function)
function fileFilter(req, file, cb) {
  console.log('filefilter', file);
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  if (!file.mimetype.includes('image')) {
    return cb(null, false, new Error('I don\'t have a clue!'));
  } else {
    // To accept the file pass `true`, like so:
    cb(null, true);
  }
};

router.get('/', catController.cat_list_get);

router.get('/:id', catController.cat_get);

router.post('/hack', (req, res) => {
  res.send(req.body.search);
});

router.post('/',
    upload.single('cat'),
    [
      body('name', 'cannot be empty').isLength({min: 1}),
      body('age', 'must be number').isNumeric().isLength({min: 1}),
      body('weight', 'must be number').isNumeric().isLength({min: 1}),
      body('owner', 'must be number').isNumeric().isLength({min: 1}),
      check('cat').custom(catController.cat_file_validator), // cat_file_validator checks only req.file
    ], (req, res) => {
      console.log('tiedosto: ', req.file);
      catController.cat_post(req, res);
      //res.send('With this endpoint you can add cats');
    });

router.put('/', [
  body('name', 'cannot be empty').isEmpty({min: 1}),
  body('age', 'must be number').isNumeric().isLength({min: 1}),
  body('weight', 'must be number').isNumeric().isLength({min: 1}),
  body('owner', 'must be number').isNumeric().isLength({min: 1}),
], catController.cat_put);

router.delete('/:id', catController.cat_delete);

module.exports = router;
