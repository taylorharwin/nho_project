var Pyramid = require('./Pyramid.jsx');
var RemoveLink = require('./RemoveLink.jsx');
var socket = io();
var reactDOM = require('react-dom');
var cmp = document.getElementById('root');
var remove = document.getElementById('remove');

var data = {
	pyramid: {
		esteem:10,
		love_belonging:17,
		physiological:66,
		safety:6,
		self_actualization: 19
	}
}

reactDOM.render(<div></div>, cmp)

socket.on('loading', function(){
	reactDOM.render(<div>Loading....</div>, cmp);
});


socket.on('data_ready', function(data){
	reactDOM.render(<Pyramid data={data}></Pyramid>, cmp);
	reactDOM.render(<RemoveLink socket={socket}></RemoveLink>, remove)
});

socket.on('delete_complete', function(){
	reactDOM.render(<div> Thanks, your account has been deleted successfully </div>, remove);
});




