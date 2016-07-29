var express = require('express');
var plaid = require('plaid');

var port = process.env.PORT || 1337;
process.env.NODE_ENV = 'production';
var app = express();
app.use(express.static(__dirname));


app.get('/', function(req, res){
    res.render('index');
});

app.post('/accounts', function(req, res){
	console.log('got a response')
	var public_token = req.body.public_token;
	console.log(public_token);
});


app.listen(port);
console.log('Listening on port' + port);