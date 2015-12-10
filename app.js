var express	= require('express'),
	bodyParser = require('body-parser'),
	userRoutes = require('./routes/user'),
	mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/meanDemo');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static('public'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/', userRoutes);
app.get('/',function(req, res){
	res.render('userlist');
});

app.listen(3000);
console.log("sever started at 3000");