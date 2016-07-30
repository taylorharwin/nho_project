var Pyramid = require('./Pyramid.jsx');
var socket = io();
var reactDOM = require('react-dom');
var cmp = document.getElementById('root');

	
var data = {
	pyramid: {
		esteem:1,
		love_belonging:7,
		physiological:75,
		safety:6,
		self_actualization: 26
	}
}

reactDOM.render(<Pyramid data={data}></Pyramid>, cmp);



