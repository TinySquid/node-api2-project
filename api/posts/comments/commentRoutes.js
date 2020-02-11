//ROUTER
const router = require('express').Router();

//DATABASE
const db = require('../../../data/db');

//GET   /api/posts/:id/comments   Returns an array of all the comment objects associated with the post with the specified id.
router.get('/:id/comments', (req, res) => {
  const id = req.params.id;

  //Find out if post with ID exists.
  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        //Find comments associated with post ID.
        db.findPostComments(id)
          .then(comments => {
            if (comments.length > 0) {
              res.status(200).json(comments);
            } else {
              res.status(404).json({ message: "There are no comments for this post." });
            }
          })
          .catch(error => {
            res.status(500).json({ error: "The comments information could not be retrieved." });
          });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Post information could not be retrieved." });
    });
});

//POST    /api/posts/:id/comments   Creates a comment for the post with the specified id using information sent inside of the request body.
router.post('/:id/comments', (req, res) => {
  const id = req.params.id;

  //Comment text.
  const { text } = req.body;

  //Validate text property for comment.
  if (text) {
    //Find out if post with ID exists.
    db.findById(id)
      .then(post => {
        if (post.length > 0) {
          //Add comment to post
          db.insertComment({ text: text, post_id: id })
            .then(() => {
              res.status(201).json({ message: "Success" });
            })
            .catch(error => {
              res.status(500).json({ error: "There was an error while saving the comment to the database." });
            });
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        res.status(500).json({ error: "Post information could not be retrieved." });
      });
  } else {
    res.status(400).json({ errorMessage: "Please provide text for the comment." });
  }
});



//EXPORT ROUTES
module.exports = router;