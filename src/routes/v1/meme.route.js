const express = require("express");
const router = express.Router();
const Images = require("../../models/meme.model");


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

      res.status(201).send(newlyCreated._id);

    }

  });

});


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
