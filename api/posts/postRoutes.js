//ROUTER
const router = require('express').Router();

//DATABASE
const db = require('../../data/db');

//ROUTE FILES
const commentRoutes = require('./comments/commentRoutes');

//USE COMMENTS ROUTE
router.use('/', commentRoutes);

//GET 	/api/posts 	Returns an array of all the post objects contained in the database.
router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});



//EXPORT ROUTES
module.exports = router;