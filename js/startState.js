let startState = function(){
	
};

startState.prototype.preload = function(){
	
};

startState.prototype.create = function(){
	_background = game.add.sprite(0, 0, "menuscreen");
	
	_startButton = game.add.sprite(game.world.centerX, 600, "startbutton");
    _startButton.anchor.setTo(0.5);
	_startButton.inputEnabled = true;
	_startButton.events.onInputDown.add(actiononClick, this);
	
	

	
};

startState.prototype.update = function(){
	
};

actiononClick = function(){
	game.state.start("Intro");
};
