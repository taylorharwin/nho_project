var react = require('react');
var _ = require('lodash');
var needsMap = require('./needsMap.js');

var Pyramid = react.createClass({


	getRows: function(pyramid){
		var total = _.reduce(pyramid, function(accum, val){return accum + val}, 0);
		var rows = _.map(pyramid, function(val, key){
			var average = (val / total * 100)
			average = Math.round(average * 100) / 100
			return (<div>{needsMap[key]} : {average}</div>)
		});
		return rows;
	},

	render: function(){
		return (
			<div className="pyramid_box">
			{this.getRows(this.props.data.pyramid)}
			</div>
			);
	}
})

module.exports = Pyramid;