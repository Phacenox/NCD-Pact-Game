let transitionState1 = function(){
	
};

transitionState1.prototype.preload = function(){
	
};

transitionState1.prototype.create = function(){
	_background = game.add.sprite(0, 0, "menuscreen");
	
	_startButton = game.add.sprite(game.world.centerX, 600, "startbutton");
    _startButton.anchor.setTo(0.5);
	_startButton.inputEnabled = true;
	_startButton.events.onInputDown.add(actiononClick, this);
	
	

	
};

transitionState1.prototype.update = function(){
	
};

actiononClick = function(){
	game.state.start("Game");
};
