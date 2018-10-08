let gameplayState = function(){
	this.score = 0;
};

gameplayState.prototype.preload = function(){
	
};

gameplayState.prototype.create = function(){
	let numpeople = 12;
	this.townArea = new townArea();
	this.townArea.create(numpeople);
	this.townArea.addPlace(game.world.centerX, game.world.centerY);
	
	let randompadding = 300;
	for(var i = 0; i < numpeople; i++){
		let randx = (game.rnd.integer() % (game.world.width - 2*randompadding)) + randompadding;
		let randy = (game.rnd.integer() % (game.world.height - 2*randompadding)) + randompadding;
		this.townArea.addPerson(i, randx, randy, "star");
	}
	
    this.clipboard = new pullOutMenu(915, 1);
    this.clipboard.create();
	
	this.clipboard.add(-915, 0, "clipboard");
	this.clipboard.addButton(10, 465, "clipboardbutton");
	
    let _causeButton = this.clipboard.add(-800,200, "causebutton");
    let _causeButton2 = this.clipboard.add(-600,200, "causebutton");
    let _diseaseButton = this.clipboard.add(-300,200, "diseasebutton");
    let _causeButton3 = this.clipboard.add(-800,400, "causebutton");
    let _causeButton4 = this.clipboard.add(-600,400, "causebutton");
    let _diseaseButton2 = this.clipboard.add(-300,400, "diseasebutton");
    
    
    this.draggabletext = new draggableText();
    this.draggabletext.create();
  
    

};

gameplayState.prototype.update = function(){
	this.clipboard.update();
    this.draggabletext.update();
	this.townArea.update();
};
