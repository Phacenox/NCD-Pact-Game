let introState = function(){
	
};

introState.prototype.preload = function(){
	
};

introState.prototype.create = function(){
	game.add.sprite(0, 20, "introtext");
	
	_startButton = game.add.sprite(game.world.centerX, 900, "startbutton");
    _startButton.anchor.setTo(0.5);
	_startButton.inputEnabled = true;
	_startButton.events.onInputDown.add(this.actiononClick, this);
	
	
};

introState.prototype.update = function(){
	
};

introState.prototype.actiononClick = function(){
	game.state.start("Game");
};
