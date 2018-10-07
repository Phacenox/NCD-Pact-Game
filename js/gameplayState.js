let gameplayState = function(){
	this.score = 0;
};

gameplayState.prototype.preload = function(){
    
};

gameplayState.prototype.create = function(){

    
    
    this.clipboard = new pullOutMenu(915, 1);
    this.clipboard.create();
	   
    
    this.draggablestuff = new draggableText();
    this.draggablestuff.create();
    
	this.clipboard.add(-915, 0, "clipboard");
	this._clipboardButton = this.clipboard.addButton(10, 465, "clipboardbutton");
	
    let _causeButton1 = this.clipboard.add(-800,200, "causebutton");
    let _causeButton2 = this.clipboard.add(-600,200, "causebutton");
    let _diseaseButton1 = this.clipboard.add(-300,200, "diseasebutton");
    let _causeButton3 = this.clipboard.add(-800,400, "causebutton");
    let _causeButton4 = this.clipboard.add(-600,400, "causebutton");
    let _diseaseButton2 = this.clipboard.add(-300,400, "diseasebutton");
  
    
    let causeText1 = this.draggablestuff.add(1600,200,"causetext");
    let causeText2 = this.draggablestuff.add(1600,400,"causetext");
    causeText1.events.onDragStop.add(onDragStop, this);

};


function onDragStop(sprite, pointer){
    if (pointer.x<this._clipboardButton.x)
    {
        let causeText1 = this.clipboard.addChild(sprite);
    }
    
    
}


gameplayState.prototype.update = function(){
	  this.draggablestuff.update();
      this.clipboard.update();
    
  
};
