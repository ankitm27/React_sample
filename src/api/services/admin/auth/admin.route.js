const express = require('express');
const validate = require('express-validation');
const router = express.Router();

const controller = require('./admin.controller.js');

const {
  login,
  signup,
  forgetPassword,
  changePasswordThroughOTP,
  changePasswordThroughPassword,
  deleteUser
} = require('./admin.validation.js');

const auth = require('./../middlewares/auth.js');
/**
 * @api {post} v1/auth/login Login
 * @apiDescription Get an accessToken
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String}         email     User's email
 * @apiParam  {String{..128}}  password  User's password
 *
 * @apiSuccess  {String}  token.tokenType     Access Token's type
 * @apiSuccess  {String}  token.accessToken   Authorization Token
 * @apiSuccess  {Number}  token.expiresIn     Access Token's expiration time
 *                                                   in miliseconds
 *
 * @apiSuccess  {String}  user.id             User's id
 * @apiSuccess  {String}  user.email          User's email
 * @apiSuccess  {Date}    user.createdAt      Timestamp
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Incorrect email or password
 */

router.route('/login')
  .post(validate(login), controller.login);

/**
 * @api {post} v1/auth/register Register
 * @apiDescription Register a new user
 * @apiVersion 1.0.0
 * @apiName Register
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String}          email     User's email
 * @apiParam  {String{6..128}}  password  User's password
 *
 * @apiSuccess (Created 201) {String}  token.tokenType     Access Token's type
 * @apiSuccess (Created 201) {String}  token.accessToken   Authorization Token
 * @apiSuccess (Created 201) {String}  token.refreshToken  Token to get a new accessToken
 *                                                   after expiration time
 * @apiSuccess (Created 201) {Number}  token.expiresIn     Access Token's expiration time
 *                                                   in miliseconds
 * @apiSuccess (Created 201) {String}  token.timezone      The server's Timezone
 *
 * @apiSuccess (Created 201) {String}  user.id         User's id
 * @apiSuccess (Created 201) {String}  user.name       User's name
 * @apiSuccess (Created 201) {String}  user.email      User's email
 * @apiSuccess (Created 201) {String}  user.role       User's role
 * @apiSuccess (Created 201) {Date}    user.createdAt  Timestamp
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/signup')
  .post(validate(signup), controller.signup);

router.route('/forgetpassword')
  .post(validate(forgetPassword), controller.forgetPassword);

router.route('/changepassword/OTP')
  .post(validate(changePasswordThroughOTP), controller.changePasswordThroughOTP);

router.route('/changePassword/password').
post(auth.authenticate, validate(changePasswordThroughPassword), controller.changePasswordThroughPassword);

router.route('/getUsers').
  get(auth.authenticate, controller.getUsers);

router.route('/deleteUser').
  post(auth.authenticate,validate(deleteUser), controller.deleteUser);  
module.exports = router;
