let startState = function(){
	
};

startState.prototype.preload = function(){
	
};

startState.prototype.create = function(){
	_background = game.add.sprite(0, 0, "menuscreen");
	
	_startButton = game.add.sprite(game.world.centerX, 550, "startbutton");
    _startButton.anchor.setTo(0.5);
	_startButton.inputEnabled = true;
	_startButton.events.onInputDown.add(actiononClick, this);
	
	
    
  this.Title = game.add.text(game.world.centerX, 200 , 'Title', { fontSize: '128px', fill: '#460'})
  this.Title.anchor.setTo(0.5);
	
};

startState.prototype.update = function(){
	
};

actiononClick = function(){
	game.state.start("Game");
};
