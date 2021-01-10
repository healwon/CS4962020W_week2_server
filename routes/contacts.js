const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Contact = require('../models/contact')

// get all items
router.get('/', function(req,res, next){
    Contact.find()
    .select("_id name fb_id")
    .exec(function(err, contacts){
        if(err) return res.status(500).json({error: err});
        res.status(200).json({
            resultCode: 1,
            message: "Success",
            count: contacts.length,
            results: contacts});
    })
});

// get item
router.get('/item/:contact_id', function(req, res, next){
    Contact.findOne({_id: req.params.contact_id}, function(err, contact){
        if(err) return res.status(500).json({error: err});
        if(!contact) return res.status(404).json({error: 'contact not found'});
        res.status(200).json(contact);
    })
});

// get items by fd_id
router.get('/fb_id/:fb_id', function(req, res, next){
    Contact.find({fb_id: req.params.fb_id})
    .select("_id name fb_id")
    .exec(function(err, contacts){
        if(err) return res.status(500).json({error: err});
        res.status(200).json({
            resultCode: 1,
            message: "Success",
            count: contacts.length,
            results: contacts});
    })
});

// create single contact
router.post('/', function(req, res, next){
    var contact = new Contact();
    contact.name = req.body.name;
    contact.fb_id = req.body.fb_id;
    contact.numbers = req.body.numbers;
    contact.emails = req.body.emails;

    contact.save(function(err){
        if(err){
            console.error(err);
            res.status(500).json({error: err});
            return;
        }
        res.status(200).json({
            resultCode: 1,
            message: "Successfully created",
            _id: contact._id
        });
    });
});

// edit single contact
router.put('/:item_id', function(req, res, next){
    res.status(404).json({error: "not implemented"});
});

// DELETE BOOK
router.delete('/', function(req, res, next){
    res.status(404).json({error: "not implemented"});
});

// DELETE BOOK
router.delete('/item/:contact_id', function(req, res, next){
    contact.remove({ _id: req.params.contact_id }, function(err, output){
        if(err) return res.status(500).json({ error: err });
        res.status(204).json({
            resultCode: 1,
            message: "contact deleted"
        });
    })
});

module.exports = router;