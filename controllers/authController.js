'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const  bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const  salt = bcrypt.genSaltSync(10);
const users = userModel.users;

const login = (req, res) => {
  // TODO: add passport authenticate
  passport.authenticate('local', {session: false}, (err, user, info) => {
    console.log('errori', err, info);
    if (err || !user) {
      return res.status(422).json({
        message: 'Something is not right',
        user: user,
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.status(401).json({
          message: 'Unauthorized',
          user: user,
        });
      }
      // generate a signed json web token with the contents of user object and return it in the response
      console.log('jwt', user);
      const token = jwt.sign(user, '123qwer');
      return res.json({user, token});
    });
  })(req, res);

};

const user_create_post = async (req, res, next) => {
  // Extract the validation errors from a request.
  //const errors = validationResult(req); // TODO require validationResult, see userController

  /*if (!errors.isEmpty()) {
    console.log('user create error', errors);
    res.send(errors.array());
  } else {*/
    // TODO: bcrypt password

  console.log('user_create_post controller', req.body);
    const params = {
      name: req.body.name,
      email: req.body.username,
      passwd: bcrypt.hashSync(req.body.password, salt), // TODO: save hash instead of the actual password
    };

    if (await userModel.insertUser(params)) {
      next();
    } else {
      res.status(400).json({error: 'register error'});
    }
  //}
};

module.exports = {
  login,
  user_create_post,
};
