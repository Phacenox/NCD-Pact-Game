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
	this.personInfo = new pullOutMenu(915, -1);
    this.personInfo.create();
	   
    
    this.draggablestuff = new draggableText();
    this.draggablestuff.create();
    
	this.clipboard.add(-915, 0, "clipboard");
	this._clipboardButton = this.clipboard.addButton(10, 465, "clipboardbutton");
	
	this.personInfo.add(game.world.width - 63 - 20, 0, "clipboardright");
	this._personInfoButton = this.personInfo.addButton(game.world.width - 63 -10, 465, "clipboardbutton");
	
    let _causeButton1 = this.clipboard.add(-800,200, "causebutton");
    let _causeButton2 = this.clipboard.add(-600,200, "causebutton");
    let _diseaseButton1 = this.clipboard.add(-300,200, "diseasebutton");
    let _causeButton3 = this.clipboard.add(-800,400, "causebutton");
    let _causeButton4 = this.clipboard.add(-600,400, "causebutton");
    let _diseaseButton2 = this.clipboard.add(-300,400, "diseasebutton");
  
    
    let causeText1 = this.draggablestuff.add(1600,200,"causetext2");
    let causeText2 = this.draggablestuff.add(1600,400,"causetext2");
    causeText1.events.onDragStop.add(onDragStop, this);
    causeText2.events.onDragStop.add(onDragStop, this);
    causeText1.events.onInputDown.add(onInputDown,this);
    causeText2.events.onInputDown.add(onInputDown,this);
    this.toggle = true;
};

function onInputDown(sprite, pointer)
{
  // sprite.loadTexture("causetext2");
    if (this.toggle===true){
        this.causetextbutton = this.draggablestuff.add(sprite.x, sprite.y, "causetext");
       this.toggle = false;
    }
}

function onDragStop(sprite, pointer){
    if (pointer.x<this._clipboardButton.x)
    {
       sprite = this.clipboard.addChild(sprite);
      
    }
   if (pointer.x>this._clipboardButton.x){
   
       sprite  = this.draggablestuff.addChild(sprite);

       
    }
    
}

//function onDragStart(sprite,pointer,x,y){
  //  if (pointer.x<1600){
  //     // sprite = this.draggablestuff.add(1600,200,"causetext2");
        
   // }
    
//}

gameplayState.prototype.update = function(){
	  this.draggablestuff.update();
	this.clipboard.update();
	this.personInfo.update();
	this.townArea.update();
};
