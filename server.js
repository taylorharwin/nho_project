var express = require('express');
var plaid = require('plaid');
var handleResponse = require('./handle_response.js');
var bodyParser = require('body-parser')
var plaidClient = new plaid.Client('579947870259902a3980f4aa',
                                   '636d086312bec8166dc61ce25e16f8' ,
                                   plaid.environments.tartan);

var port = process.env.PORT || 1337;
process.env.NODE_ENV = 'production';
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.use(express.static(__dirname));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function(req, res){
    res.render('index');
    console.log(io);
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('delete', function(socket){
  console.log('deleting account');
  });
});




app.post('/authenticate', function(req, res){
  var public_token = req.body.public_token;

   plaidClient.exchangeToken(public_token, function(err, res) {
    if (err != null) {
      console.log('err');
    } else {
      var access_token = res.access_token;
      plaidClient.getConnectUser(access_token, {gte: '90 days ago'}, 
        function(err, res) {
          var pyramid  = handleResponse(res.transactions);
          io.emit('data_ready', {pyramid: pyramid});
      });
    }
  });
});


http.listen(port);
console.log('Listening on port' + port);