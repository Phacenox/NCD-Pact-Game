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
	
	
	if(!audio_played){
		audio_played = true;
		this.background = game.add.audio("background",1);
		this.background.play("",0,1,true);
	}
	
};

startState.prototype.update = function(){
	
};

actiononClick = function(){
	game.state.start("Intro");
};
