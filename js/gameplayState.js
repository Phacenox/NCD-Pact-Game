let gameplayState = function(){
	this.score = 0;
};

gameplayState.prototype.preload = function(){
    
};

gameplayState.prototype.create = function(){
	game.add.sprite(0, 0, "town1");
	
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
	//generating cause blank button for the first column
    for(var i=0; i< 4; i++){
        this.clipboard.addBlankButton(-810, 200+200*i, "causebutton", i);
     }
    //generating cause blank button for the second column
    for(var i=4; i< 8; i++){
        this.clipboard.addBlankButton(-610, 200+200*(i-4), "causebutton", i);
    }
    //generating disease button
    for(var i=8; i< 12; i++){
        this.clipboard.addBlankButton(-300, 200+200*(i-8), "diseasebutton", i);
    }
    
    
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
    sprite = this.clipboard.addChild(sprite);
    if (sprite.x<this._clipboardButton.x)
   {
      
  if (sprite.x>306.4){
    
      console.log(sprite.x);
        sprite.x =306.4;
       }
       else if (sprite.x> 104 && sprite.x< 306.4){

           console.log(sprite.x);

           sprite.x = 104;
      }
        else if (sprite.x< 104){
        
            console.log(sprite.x);

              sprite.x = 104;
      }
    }
   if (sprite.x>this._clipboardButton.x){
   
       sprite  = this.draggablestuff.addChild(sprite);

       
    }
    
}



gameplayState.prototype.update = function(){
	  this.draggablestuff.update();
	this.clipboard.update();
	this.personInfo.update();
	this.townArea.update();
};
