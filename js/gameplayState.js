let gameplayState = function(){
	this.score = 0;
};

gameplayState.prototype.preload = function(){
	
};

gameplayState.prototype.create = function(){
    this.draggabletext = new draggableText();
    this.draggabletext.create();
    
    this.clipboard = new pullOutMenu();
	this.clipboard.create();
    

};

gameplayState.prototype.update = function(){
	this.clipboard.update();
    this.draggabletext.update();
};
