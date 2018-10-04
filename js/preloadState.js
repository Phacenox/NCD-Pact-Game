let preloadState = function(){
	
};

preloadState.prototype.preload = function(){
	//tutorial files, delete later
	game.load.image("sky", "assets/sky.png");
	game.load.image("platform", "assets/platform.png");
	game.load.image("star", "assets/star.png");
	game.load.image("clipboard", "assets/clipboard.png");
	game.load.image("clipboardbutton", "assets/clipboardButton.png");
    game.load.image("causebutton","assets/CauseButton.png");
    game.load.image("diseasebutton","assets/DiseaseButton.png");
	game.load.spritesheet("murph", "assets/character.png", 32, 48);
	
	//our files
	game.load.image("startbutton", "assets/StartButton.png");
};

preloadState.prototype.create = function(){
	game.state.start("Start");
	
};

preloadState.prototype.update = function(){
	
};
