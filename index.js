//Index requirements
var createError = require('http-errors');
var debug = require('debug')('nodeapi:server');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var auth = require('./middlewares/auth');
require('dotenv').config();
var http = require('http');
var app = express();
var server = http.createServer(app);


// Router vars
var indexRouter = require('./routes/index');

//Express server initialization
app.use(bodyParser.json());
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' ,parameterLimit: 1000000}));
app.disable('etag');


app.use(cors());
app.options('*', cors()) // include before other routes


//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

morgan.token('time', () => new Date().toLocaleString());
app.use(morgan('[:time] :method :url :status :res[content-length] :response-time ms'))
//app.use(morgan(':method :url :status :response-time ms'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set up our production redirection routes
app.use('/init', indexRouter);

app.use(function(req, res, next) {
  res.status(404).send({code:404, status:"error"});
});

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: 5000`);
});

 
//Handle CORS functionalits
// app.use(function (req, res, next) {
//   console.log(req);
//   console.log(JSON.stringify(req));
//   var allowedOrigins = ['http://localhost:3001', 'null'];
//     var origin = req.headers.origin;
//     if(allowedOrigins.indexOf(origin) > -1){
//           res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Accept,content-type,Content-Type,Authorization,authorization,X-Auth-Token');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// var whitelist = ['http://localhost:3001', 'http://localhost:3000', 'null']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// // }

module.exports = app;