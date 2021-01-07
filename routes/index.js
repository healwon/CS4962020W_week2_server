출처: https://backback.tistory.com/341 [Back Ground]
module.exports = function(app) {
    var express = require('express');
    var router = express.Router();

    // GET DEFAULT: usage
    router.use('/', function(req,res){
        var str = 'hello world!\n\n usage:\n'
        str +='/books (GET)\n'
        str +='/books/:book_id (GET)\n'
        str +='/books/author/:author (GET)\n'
        str +='/books (POST)\n'
        str +='/books/:book_id (PUT)\n'
        str +='/books/:book_id (DELETE)\n'
        res.send(str)
    });

    return router
}