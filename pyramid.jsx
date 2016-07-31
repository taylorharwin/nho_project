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
			var pxHeight = (average * 346) + 'px';
			var trapStyles = {
				backgroundColor: needsMap[key].color,
				height: '100%',
			};


			var name = needsMap[key].display,
				rank = needsMap[key].rank;
			var style = {
				height: pxHeight
			}
			var trapWidth = (rank * 60) + 'px';
			return (
				<div className="table" rel={rank} style={style}>
					<div className="table_cell">
						<div className="table_text">{name} : {displayAverage}% </div>
						<div className="trap_wrapper">
						<div style={trapStyles} className="trapezoid"></div> 
					</div>
					</div>
				</div>)
		});

		rows.sort(function(a, b){return a.props.rel > b.props.rel});
		return rows;
	},

	render: function(){
		return (
			<div className="pyramid_box light">
			<div className="mask_right"></div>
			<div className="mask_left"></div>
				{this.getRows(this.props.data.pyramid)}
			</div>
			);
	}
})

module.exports = Pyramid;