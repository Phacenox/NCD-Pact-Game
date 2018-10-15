let nextLevelButton = function(x, y, nextlevel){
	this.nextLevel = nextlevel;
	this.nextButton = game.add.sprite(x, y, 'nextButton')
	this.nextButton.anchor.setTo(0.5)
	this.nextButton.inputEnabled = true;
	this.nextButton.events.onInputDown.add(this.actiononClick, this);
	
};

nextLevelButton.prototype.actiononClick = function(){
	game.state.start(this.nextLevel);
};