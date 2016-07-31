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

reactDOM.render(<div>How are you doing?</div>, cmp)
reactDOM.render(<RemoveLink socket={socket}></RemoveLink>, remove)


socket.on('data_ready', function(data){
	var ask = document.getElementsByClassName('ask')[0];
	ask.parentNode.removeChild(ask);
	reactDOM.render(<Pyramid data={data}></Pyramid>, cmp);
});




