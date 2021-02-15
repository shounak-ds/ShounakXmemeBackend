const express = require("express");
const router = express.Router();
const Images = require("../../models/meme.model");

/**
 * Get all TODOS:
 * curl http://localhost:8082/v1/memes
 */
router.get("/", async (req, res) => {

    Images.find({}, (err, allImages) => {

      if (err) {

        console.log(err);

        res.status(500).send();

      } else {

        res.send(allImages);

      }

    });
});

/**
 * Add a TODO to the list
 * curl -X POST http://localhost:8082/v1/memes \
    -d '{"src": "<image_url>","Name": "Apple","Caption": "I am apple", "PostDate": ${New Date()}}' \
    -H 'Content-Type: application/json'
*/
router.post("/", async (req, res) => {

  /* console.log(
    `URL:  /v1/todos${req.url == "/" ? "" : req.url}, Method:  ${req.method}, Timestamp: ${new Date()}`
  ); */

  console.log("Request body: ", req.body);
  
  let newimg = {

    Name: req.body.Name,

    PostDate: new Date(),

    Caption: req.body.Caption,

    src: req.body.src,
  };

  Images.create(newimg, (err, newlyCreated) => {

    if (err) {

      console.log(err);

      res.status(500).send();

    } else {

      console.log("ObjectID: ", newlyCreated.objectID);

      res.status(201).send(newlyCreated.objectID);

    }

  });

});

/**
 * Update an existing TODO
 * curl -v -X PUT http://localhost:8082/v1/todos \
    -d '{"_id": "<id-value>", "name": "Play tennis","startDate": "2021-01-07","endDate": "2021-01-09"}' \
    -H 'Content-Type: application/json'
 * 
 * Nb: You'll need to change the "id" value to that of one of your todo items
*/
router.patch("/", (req, res) => {

  console.log("Request body: ", req.body);

  /* console.log(

    `URL:  /v1/todos${req.url == "/" ? "" : req.url}, Method:  ${req.method}, Timestamp: ${new Date()}`

  ); */


  const idToUpdate = req.body._id;

  const updatedimg = {

    Name: req.body.Name,

    PosttDate: req.body.PostDate,

    Caption: req.body.Caption,

    src: req.body.src

  };


  Images.findByIdAndUpdate(idToUpdate, updatedimg, (err, doc) => {

    if (err) {

      console.log(err);

      res.status(500).send();

    } else if (doc == null) {

      res.status(400).send({ error: "Resource not found" });

    } else {

      res.status(204).send();

    }

  });

});

/**
 * Delete a TODO from the list
 * curl -v -X "DELETE" http://localhost:8082/v1/todos/<id-value>
 *
 * Nb: You'll need to change "<id-value>" to the "id" value of one of your todo items
 */
router.delete("/:id", (req, res) => {

  const IdToDelete = req.params.id;

  /* console.log(

    `URL:  /v1/todos${req.url == "/" ? "" : req.url}, Method:  ${req.method}, Timestamp: ${new Date()}`

  ); */


  Images.findByIdAndDelete(IdToDelete, (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).send();

    } else {

      res.status(204).send();

    }

  });

});

module.exports = router;
