let p23state = function(){
	
};

p23state.prototype.preload = function(){
	
};

p23state.prototype.create = function(){
	game.add.sprite(0, -100, "23text");
	
	_startButton = game.add.sprite(game.world.centerX, 900, "startbutton");
    _startButton.anchor.setTo(0.5);
	_startButton.inputEnabled = true;
	_startButton.events.onInputDown.add(this.actiononClick, this);
	
	
};

p23state.prototype.update = function(){
	
};

p23state.prototype.actiononClick = function(){
	game.state.start("level3");
};
