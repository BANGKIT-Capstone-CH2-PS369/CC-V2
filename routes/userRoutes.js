const router = require('express').Router();
const {registerUser,getUser}= require('../controllers/registerController');
const {loginUser,profile}= require('../controllers/loginController');

router.post('/register',registerUser);
router.get('/user',getUser);
router.post('/login',loginUser);   
router.get('/profile',profile);


module.exports = router;