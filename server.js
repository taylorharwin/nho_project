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

var creds = {
  access_token: ''
};

function getAccessToken(){
  return creds.access_token
}

function setAccessToken(token){
  creds.access_token = token
}

app.use(express.static(__dirname));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function(req, res){
    res.render('index');
});

io.on('connection', function(socket){
  socket.on('delete', function(){
        console.log('user wants to delete');
        plaidClient.deleteConnectUser(getAccessToken(), null, function(err, res){
          console.log(res);
          io.emit('delete_complete');
        });
      });

  app.post('/authenticate', function(req, res){
    var public_token = req.body.public_token;
    io.emit('loading');

     plaidClient.exchangeToken(public_token, function(err, res) {
      if (err != null) {
        console.log('err');
      } else {
        setAccessToken(res.access_token);
          plaidClient.getConnectUser(getAccessToken(), {gte: '30 days ago'}, 
            function(err, res) {
              if (res.transactions.length > 0){
                var pyramid  = handleResponse(res.transactions);
                io.emit('data_ready', {pyramid: pyramid});
              } 
        }); 
      }
    });
  });

});


http.listen(port);
console.log('Listening on port' + port);