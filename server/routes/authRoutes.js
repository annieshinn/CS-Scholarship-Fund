/**
 * 
 * This router handles everything regarding google oauth
 * at endpoint /auth
 * 
 */

const router = require('express').Router();
const passport = require('passport');



router.get('/logout', (req,res) => {
  //logging out with passport
  res.send('logging out')
})

router.get('/google',passport.authenticate('google',{
scope: ['profile']
}));


//callback route for google to donation
router.get('/google/donation',passport.authenticate('google'),(req,res) => {
    res.send('you reached the donation page')
});


module.exports = router;