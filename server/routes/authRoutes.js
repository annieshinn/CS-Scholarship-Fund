/**
 * 
 * This router handles everything regarding google oauth
 * at endpoint /auth
 * 
 */

const router = require('express').Router();
const passport = require('passport')

router.get('/logout',(req,res) => {
  //logging out with passport
  res.send('logging out')
})

router.get('/google', passport.authenticate('google',{
  scope: ['profile','email']
}));

//callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google'),
  (req,res) => {
    res.send('i hate this')
});

module.exports = router;