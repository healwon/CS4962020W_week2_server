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



    router.get('/own_phone/:own_phone', function(req, res, next){
        Match.findOne({_id: req.params.own_phone}, function(err, match){
            if(err) return res.status(500).json({error: err});
            if(!match) return res.status(404).json({error: 'phone number not found'});
            res.json(match);
        })
    });

    router.get('/own_kakao/:own_kakao', function(req, res, next){
        Match.findOne({_id: req.params.own_kakao}, function(err, match){
            if(err) return res.status(500).json({error: err});
            if(!match) return res.status(404).json({error: 'kakao id not found'});
            res.json(match);
        })
    });


    router.post('/', function(req, res, next){
        var match = new Match();
        match.fb_id = req.body.fb_id
        match.own_phone = req.body.own_phone;
        match.own_kakao = req.body.own_kakao;
        match.other_phone = req.body.other_phone;
        match.other_kakao = req.body.other_kakao;
        match.save(function(err){
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});

        });
    });


    router.delete('/fb_id/:fb_id', function(req, res, next){
        Match.remove({ _id: req.params.fb_id }, function(err, output){
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
