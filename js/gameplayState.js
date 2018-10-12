let gameplayState = function(){
	this.score = 0;
	this.currentPerson = -1;
};

gameplayState.prototype.preload = function(){
    //data is stored with integers in mind
	this.numpeople = 0;
	this.peopleNames = [];
	this.peopleData = [];
	this.peopleSprites = [];
	
	
	//person one
	this.numpeople++;
	this.peopleNames.push("Holly Hammond");
	this.peopleData.push("A");
	this.peopleData.push("B");
	this.peopleData.push("C");
	this.peopleData.push("D");
	this.peopleData.push("E");
	this.peopleSprites.push(0);
	this.peopleSprites.push(0);
	this.peopleSprites.push(0);
	
	//person two
	this.numpeople++;
	this.peopleNames.push("Mr. Anderson");
	this.peopleData.push("B");
	this.peopleData.push("C");
	this.peopleData.push("D");
	this.peopleData.push("E");
	this.peopleData.push("F");
	this.peopleSprites.push(0);
	this.peopleSprites.push(1);
	this.peopleSprites.push(0);
};

gameplayState.prototype.create = function(){
	this.townArea = new townArea();
	this.townArea.create(this.numpeople);
	this.townArea.addPlace(game.world.centerX, game.world.centerY);
	
	this.personInfo = new pullOutMenuRight(915, -1);
    this.personInfo.create();
	this.personInfo.add(game.world.width - 63 - 20, 0, "clipboardright");
	this._personInfoButton = this.personInfo.addButton(game.world.width - 63 -10, 465, "clipboardbutton");
	this.personInfo.initData();
	let randompadding = 300;
	
    this.clipboard = new pullOutMenu(915, 1);
    this.clipboard.create();
	
	this.clipboard.add(-915, 0, "clipboard");
	this._clipboardButton = this.clipboard.addButton(10, 465, "clipboardbutton");
	   
	for(var i = 0; i < this.numpeople; i++){
		let randx = (game.rnd.integer() % (game.world.width - 2*randompadding)) + randompadding;
		let randy = (game.rnd.integer() % (game.world.height - 2*randompadding)) + randompadding;
		this.townArea.addPerson(i, randx, randy, this.peopleSprites[i*3+0], this.peopleSprites[i*3+1], this.peopleSprites[i*3+2], this._personInfoButton);
	}
    
    this.draggablestuff = new draggableText();
    this.draggablestuff.create();
    
	
	
    let _causeButton1 = this.clipboard.add(-800,200, "causebutton");
    let _causeButton2 = this.clipboard.add(-600,200, "causebutton");
    let _diseaseButton1 = this.clipboard.add(-300,200, "diseasebutton");
    let _causeButton3 = this.clipboard.add(-800,400, "causebutton");
    let _causeButton4 = this.clipboard.add(-600,400, "causebutton");
    let _diseaseButton2 = this.clipboard.add(-300,400, "diseasebutton");
  
    
    let causeText1 = this.draggablestuff.add(1600,200,"causetext");
    let causeText2 = this.draggablestuff.add(1600,400,"causetext");
    causeText1.events.onDragStop.add(onDragStop, this);
    causeText2.events.onDragStop.add(onDragStop, this);
    causeText1.events.onInputDown.add(onInputDown,this);
    causeText2.events.onInputDown.add(onInputDown,this);
};

function onInputDown(sprite, pointer)
{
   sprite.loadTexture("causetext2");
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
	let personquery = this.townArea.update();
	if(personquery != -1){
		if(this.currentPerson != -1){
			this.townArea.addPerson(this.currentPerson, this._personInfoButton.x, this._personInfoButton.y, this.peopleSprites[this.currentPerson*3+0], this.peopleSprites[this.currentPerson*3+1], this.peopleSprites[this.currentPerson*3+2], this._personInfoButton);
		}
		this.currentPerson = personquery;
		this.personInfo.openMenu();
		this.personInfo.setData(this.peopleNames[personquery], this.peopleSprites[personquery*3+0], this.peopleSprites[personquery*3+1], this.peopleSprites[personquery*3+2], this.peopleData[personquery*5+0], this.peopleData[personquery*5+1], this.peopleData[personquery*5+2], this.peopleData[personquery*5+3], this.peopleData[personquery*5+4]);
		this.townArea.removePerson(this.currentPerson);
	}
};
