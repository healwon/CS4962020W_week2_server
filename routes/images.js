const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');

SERVER_IP = '192.249.18.54'

var os = require('os');
  
function getServerIp() {
    var ifaces = os.networkInterfaces();
    var result = '';
    for (var dev in ifaces) {
        var alias = 0;
        ifaces[dev].forEach(function(details) {
            if (details.family == 'IPv4' && details.internal === false) {
                result = details.address;
                ++alias;
            }
        });
    }
  
    return result;
}


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

// get all images
router.get("/", (req, res, next) => {
    Image.find()
    .select("_id name userImage fb_id")
    .exec()
    .then(docs => {
        const response = {
            resultCode: 1,
            message: "Success",
            count: docs.length,
            results: docs.map(doc => {
            return {
                _id: doc._id,
                name: doc.name,
                userImage: 'http://' + SERVER_IP + ':8080/' + doc.userImage,
                fb_id: doc.fb_id
            };
            })
        };
      res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// get all the images under certain fb_id
router.get("/fb_id/:fb_id", (req, res, next) => {
  Image.find({fb_id: req.params.fb_id})
  .select("_id name userImage fb_id")
  .exec()
  .then(docs => {
    const response = {
        resultCode: 1,
        message: "Success",
        count: docs.length,
        results: docs.map(doc => {
        return {
            _id: doc._id,
            name: doc.name,
            userImage: 'http://' + SERVER_IP + ':8080/' + doc.userImage,
            fb_id: doc.fb_id
        };
      })
    };
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});
  
//gets the image by adding /imageID/:imageID at the end.
router.get('/item/:imageID', function(req, res, next){
    Image.findOne({_id: req.params.imageID}, function(err, image){
        if(err) return res.status(500).json({error: err});
        if(!image) return res.status(404).json({error: 'image not found'});
        res.json(image);
    })
});

//array로 고치기
router.post("/", upload.single('userImage'), (req, res, next) => {
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

router.delete("/item/:imageId", (req, res, next) => {
    const id = req.params.imageId;
    Image.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Image deleted',
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