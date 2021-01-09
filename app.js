// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
const morgan = require("morgan");
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/books');

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));

// DEFINE MODEL
var Book = require('./models/book');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [CONFIGURE ROUTER]
var indexRouter = require('./routes/index')(app)
var booksRouter = require('./routes/books')(app, Book)
const imagesRouter = require("./routes/images");
var contactRouter = require('./routes/contacts');

app.use('/contacts', contactRouter)
app.use('/books', booksRouter);
app.use('/images', imagesRouter);
app.use('/', indexRouter);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});