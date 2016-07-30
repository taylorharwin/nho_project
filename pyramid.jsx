var react = require('react');
var _ = require('lodash');
var needsMap = require('./needsMap.js');

var Pyramid = react.createClass({
	getRows: function(pyramid){
		var total = _.reduce(pyramid, function(accum, val){return accum + val}, 0);
		var rows = _.map(pyramid, function(val, key){
			var average = Math.round((val / total * 100) * 100) / 100 + '%';

			var name = needsMap[key].display,
				rank = needsMap[key].rank;
			var style = {
				borderRight: '1px solid black',
				borderBottom: '1px solid black',
				borderLeft: '1px solid black',
				height: average,
				minHeight:'14px'
			}

			var trapWidth = (rank * 60) + 'px';
			return (
				<div className="table" rel={rank} style={style}> 
					<div className="table_cell">
						<span className="table_text">{name} : {average}% </span>
					</div>
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