const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');


// Filters the file and only leaves images
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }; 

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

  const Image = require("../models/image");


  




  router.get("/", (req, res, next) => {
    Image.find()
      .select("name fb_id _id userImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          images: docs.map(doc => {
            return {
              name: doc.name,
              fb_id: doc.fb_id,
              userImage: doc.userImage,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:8080/images/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


  router.post("/", upload.single('Image'), (req, res, next) => {
    const image = new Image({
      _id: new mongoose.Types.ObjectId(),
      fb_id: req.body.fb_id,
      name: req.body.name,
      userImage: req.file.path
    });
    image
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created image successfully",
          createdImage: {
              name: result.name,
              _id: result._id,
              fb_id: result.fb_id,
              request: {
                  type: 'GET',
                  url: "http://localhost:8080/images/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = router;