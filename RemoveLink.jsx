var RemoveLink = React.createClass({

	handleClick: function(){
		console.log('delete user');
		console.log(this.props.socket);
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