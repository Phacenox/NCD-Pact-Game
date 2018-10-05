let gameplayState = function(){
	this.score = 0;
};

gameplayState.prototype.preload = function(){
	
};

gameplayState.prototype.create = function(){
	this.townArea = new townArea();
	this.townArea.addPerson(0, 0, "star");
	
	
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
