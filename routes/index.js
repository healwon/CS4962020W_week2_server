출처: https://backback.tistory.com/341 [Back Ground]
module.exports = function(app) {
    var express = require('express');
    var router = express.Router();

    // GET DEFAULT: usage
    router.use('/', function(req,res){
        res.status(404).json({
            error : "Page Not Found"
        })
    });

    return router
}