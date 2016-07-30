var react = require('react');
var reactDom = require('react-dom');
var _ = require('lodash');
var needsMap = require('./needsMap.js');

var Pyramid = react.createClass({
	getRows: function(pyramid){
		var total = _.reduce(pyramid, function(accum, val){return accum + val}, 0);
		var rows = _.map(pyramid, function(val, key){
			var average = (val / total);
			var displayAverage = (average * 100).toFixed(2);
			var pxHeight = (average * 300) + 'px';


			var name = needsMap[key].display,
				rank = needsMap[key].rank;
			var style = {
				borderBottom: '1px solid black',
				height: pxHeight
			}
			var trapWidth = (rank * 60) + 'px';
			return (
				<div className="table" rel={rank} style={style}>
					<div className="table_cell">
						<span className="table_text">{name} : {displayAverage}% </span>
					</div>
										<div style={{height: pxHeight, width: trapWidth}}className="trapezoid"></div> 

				</div>)
		});

		rows.sort(function(a, b){return a.props.rel > b.props.rel});

		console.log(rows);
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