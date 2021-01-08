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