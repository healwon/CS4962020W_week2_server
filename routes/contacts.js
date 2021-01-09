const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Contact = require('../models/contact')

// get all items
router.get('/', function(req,res, next){
    Contact.find()
    .select("name fb_id _id")
    .exec(function(err, contacts){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(contacts);
    })
});

// get item
router.get('/:contact_id', function(req, res, next){
    Contact.findOne({_id: req.params.contact_id}, function(err, contact){
        if(err) return res.status(500).json({error: err});
        if(!contact) return res.status(404).json({error: 'contact not found'});
        res.json(contact);
    })
});

// GET BOOK BY fd_id
router.get('/fb_id/:fb_id', function(req, res, next){
    Contact.find({fb_id: req.params.fb_id}, function(err, contacts){
        if(err) return res.status(500).json({error: err});
        if(books.length === 0) return res.status(404).json({error: 'book not found'});
        res.json(contacts);
    })
});


// CREATE BOOK
router.post('/', function(req, res, next){
    var contact = new Contact();
    contact.name = req.body.name;
    contact.fb_id = req.body.fb_id;

    contact.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }

        res.json({result: 1});

    });
});

// DELETE BOOK
router.delete('/:contact_id', function(req, res, next){
    contact.remove({ _id: req.params.contact_id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });

        /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        if(!output.result.n) return res.status(404).json({ error: "book not found" });
        res.json({ message: "book deleted" });
        */

        res.status(204).end();
    })
});

module.exports = router;