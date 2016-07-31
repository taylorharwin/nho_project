var Pyramid = require('./Pyramid.jsx');
var socket = io();
var reactDOM = require('react-dom');
var cmp = document.getElementById('root');

	
var data = {
	pyramid: {
		esteem:10,
		love_belonging:17,
		physiological:66,
		safety:6,
		self_actualization: 19
	}
}


socket.on('data_ready', function(data){
	reactDOM.render(<Pyramid data={data}></Pyramid>, cmp);
});

reactDOM.render(<div>How are you doing?</div>, cmp)



