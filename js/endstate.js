let endstate = function(){
	
};

endstate.prototype.preload = function(){
	
};

endstate.prototype.create = function(){
	game.add.sprite(0, -100, "outrotext");
	
	_startButton = game.add.sprite(game.world.centerX, 900, "continueButton");
    _startButton.anchor.setTo(0.5);
	_startButton.inputEnabled = true;
	_startButton.events.onInputDown.add(this.actiononClick, this);
	
	
};

endstate.prototype.update = function(){
	
};

endstate.prototype.actiononClick = function(){
	game.state.start("Start");
};
