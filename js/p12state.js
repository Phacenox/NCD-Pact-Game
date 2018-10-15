let p12state = function(){
	
};

p12state.prototype.preload = function(){
	
};

p12state.prototype.create = function(){
	game.add.sprite(0, -100, "12text");
	
	_startButton = game.add.sprite(game.world.centerX, 900, "startbutton");
    _startButton.anchor.setTo(0.5);
	_startButton.inputEnabled = true;
	_startButton.events.onInputDown.add(this.actiononClick, this);
	
	
};

p12state.prototype.update = function(){
	
};

p12state.prototype.actiononClick = function(){
	game.state.start("level2");
};
