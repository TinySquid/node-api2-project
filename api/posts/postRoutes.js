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

//GET 	/api/posts/:id 	Returns the post object with the specified id.
router.get('/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post with ID specified not found." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

//PUT 	/api/posts/:id 	Updates the post with the specified id using data from the request body. Returns the modified document.
router.put('/:id', (req, res) => {
  const id = req.params.id;

  const { title, contents } = req.body;

  //Validate post content.
  if (title && contents) {
    //update post in db.
    db.update(id, { title: title, contents: contents })
      .then(() => {
        // "Return newly created post..."
        db.findById(id)
          .then(post => {
            res.status(200).json(post);
          })
          .catch(error => {
            res.status(500).json({ error: "There was an error retrieving post." });
          });
      })
      .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database." });
      });
  } else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
});

//POST 	/api/posts 	Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
  const { title, contents } = req.body;

  //Validate post content
  if (title && contents) {
    //Add to db
    db.insert({ title: title, contents: contents })
      .then(postID => {
        // "Return newly created post..."
        db.findById(postID.id)
          .then(post => {
            res.status(201).json(post);
          })
          .catch(error => {
            res.status(500).json({ error: "There was an error retrieving post." });
          });
      })
      .catch(error => {
        res.status(500).json({ error: "There was an error while saving the post to the database." });
      });
  } else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
});

//DELETE 	/api/posts/:id 	Removes the post with the specified id and returns the deleted post object. 
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        db.remove(id)
          .then(() => {
            res.status(200).json({ message: "Success" });
          })
          .catch(error => {
            res.status(500).json({ error: "The post could not be removed." });
          });
      } else {
        res.status(404).json({ message: "Post with ID specified not found." });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be retrieved." });
    });
});



//EXPORT ROUTES
module.exports = router;