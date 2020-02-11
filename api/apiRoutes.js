//ROUTER
const router = require('express').Router();

//POST ROUTES
const postRoutes = require('./posts/postRoutes');

//USE POST ROUTES
router.use('/posts', postRoutes);



//EXPORT ROUTES
module.exports = router;