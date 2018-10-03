let startState = function(){
	
};

startState.prototype.preload = function(){
	
};

startState.prototype.create = function(){
	_startButton = game.add.sprite(game.world.centerX, 400, "star");
	_startButton.anchor.set(0,5);
	_startButton.inputEnabled = true;
	_startButton.events.onInputDown.add(actiononClick, this);
	
};

startState.prototype.update = function(){
	
};

actiononClick = function(){
	game.state.start("Game");
};