//In kotlin, use get to verify if info of the fb_id exist BEFORE POSTING!
// Might cause conflicts

module.exports = function(app, Match){
    var express = require('express');
    var router = express.Router();



    //get all matches
    router.get('/', function(req,res, next){
        Match.find(function(err, matches){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(matches);
        })
    });


    router.get("/fb_id/:fb_id", (req, res, next) => {
        Match.find({fb_id: req.params.fb_id})
        .select("_id own_phone own_kakao other_phone other_kakao fb_id")
        .exec()
        .then(docs => {
            const response = {
                resultCode: 1,
                message: "Success",
                count: docs.length,
                results: docs.map(doc => {
                    return {
                        _id: doc._id,
                        own_phone: doc.own_phone,
                        own_kakao: doc.own_kakao,
                        fb_id: doc.fb_id,
                        other_phone: doc.other_phone,
                        other_kakao: doc.other_kakao
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    });


    router.get('/own_phone/:own_phone', function(req, res, next){
        Match.findOne({own_phone: req.params.own_phone}, function(err, match){
            if(err) return res.status(500).json({error: err});
            if(!match) return res.status(404).json({error: 'phone number not found'});
            res.json(match);
        })
    });

    router.get('/own_kakao/:own_kakao', function(req, res, next){
        Match.findOne({own_kakao: req.params.own_kakao}, function(err, match){
            if(err) return res.status(500).json({error: err});
            if(!match) return res.status(404).json({error: 'kakao id not found'});
            res.json(match);
        })
    });
    

    // POST one's information
    router.post('/', function(req, res, next){
        var match = new Match();
        match.fb_id = req.body.fb_id
        match.own_phone = req.body.own_phone;
        match.own_kakao = req.body.own_kakao;
        match.other_phone = req.body.other_phone;
        match.other_kakao = req.body.other_kakao;
        match.matched = req.body.matched;
        match.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });


    router.put('/fb_id/:fb_id', function(req, res, next){
        Match.findOne({fb_id: req.params.fb_id}, function(err, match){
            console.log(err);
            if(err) return res.status(500).json({ error: 'database failure' });
            if(!match) return res.status(404).json({ error: 'match not found' });

            if(req.body.own_phone) match.own_phone = req.body.own_phone;
            if(req.body.own_kakao) match.own_kakao = req.body.own_kakao;
            if(req.body.other_phone) match.other_phone = req.body.other_phone;
            if(req.body.other_kakao) match.other_kakao = req.body.other_kakao;
            if(req.body.matched) match.matched = req.body.matched;

            match.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'match updated'});
            });

        });
    });


    router.delete('/fb_id/:fb_id', function(req, res, next){
        Match.remove({fb_id: req.params.fb_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
            if(!output.result.n) return res.status(404).json({ error: "book not found" });
            res.json({ message: "book deleted" });
            */

            res.status(204).end();
        })
    });



    return router
}
