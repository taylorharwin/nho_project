var RemoveLink = React.createClass({

	handleClick: function(){
		this.props.socket.emit('delete', null, function(){
			console.log('deleted user')});
	},
	render: function(){
	return (
		<button onClick={this.handleClick} className="remove_button">Forget my bank account </button>
	)
	}
});

module.exports = RemoveLink;