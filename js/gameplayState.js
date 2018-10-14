let gameplayState = function(){
	this.score = 0;
    this.causeButton=[];
	
	this.causeButtonFinals = [];
	for(var i = 0; i < 8; i++){
		this.causeButtonFinals[i] = null;
	}
	
	this.currentPerson = -1;
    this.causeText=[];
    this.diseaseButton = [];
	
	this.causeButtonDraggables = [];
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
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.correct = game.add.audio("correct",1);
    this.incorrect = game.add.audio("incorrect",1);
	game.add.sprite(0, 0, "town1");
	
	let numpeople = 12;
	this.townArea = new townArea();
	this.townArea.create(this.numpeople);
	this.townArea.addObject(1000, 500, 'hut');
	this.townArea.addPlace(1095, 590);
	this.townArea.addObject(1600, 250, 'hut');
	this.townArea.addPlace(1695, 340);
	this.townArea.addObject(1000, 500, 'hut');
	this.townArea.addPlace(1095, 590);
	this.townArea.addObject(1100, 150, 'hut');
	this.townArea.addPlace(1195, 240);
	
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
    
    this.draggablestuff = [];
    
	
	//generating cause blank button for the first column
    for(var i=0; i< 8; i++){
       this.causeButton[i]=this.clipboard.addBlankButton(-800 + 200*Math.floor(i/4), 200+200*(i%4), "causebutton", i);
		
	 }
    //generating disease button
    for(var i=0; i< 4; i++){
         this.diseaseButton[i] = this.clipboard.addBlankButton(-300, 200+200*i, "diseasebutton", i);
    }
	
	
	


    this.toggle = true;
    this.toggle2 = true;
    this.toggle3 = true;
    this.toggle4 = true;
    this.toggle5 = true;
};

gameplayState.prototype.update = function(){
	this.clipboard.update();
	this.personInfo.update();
    game.physics.arcade.overlap(this.causeText1, this.clipboard.causeButton[0], overlap);
    game.physics.arcade.overlap(this.causeText2, this.clipboard.causeButton[1], overlap);
	let personquery = this.townArea.update();
	if(personquery != -1){
		
		this.personInfo.destroyDraggables();
		
		//generating cause text that is draggable
		for (var i=0; i<5; i++){
			if(!this.personInfo.isOpen()){
				this.causeText[i] = new draggableText(1579 + 915, 488+122*i + 5*Math.floor(i/2)+ 1*Math.floor(i/4),"causetext2", this.causeButton, this.clipboard, this._clipboardButton, this.personInfo, this.causeButtonFinals);
			}else
				this.causeText[i] = new draggableText(1579, 488+122*i+ 5*Math.floor(i/2)+ 1*Math.floor(i/4),"causetext2", this.causeButton, this.clipboard, this._clipboardButton, this.personInfo, this.causeButtonFinals);
			this.causeText[i].setDValue(i);
			let cText = this.causeText[i].getSprite();
			this.causeText[i].setOrigin(1579, 488+122*i+ 5*Math.floor(i/2)+ 1*Math.floor(i/4));
			this.personInfo.adddraggable(cText);
			
		}
		
		if(this.currentPerson != -1){
			let tmp = this.townArea.addPerson(this.currentPerson, this._personInfoButton.x + 20, this._personInfoButton.y + 50, this.peopleSprites[this.currentPerson*3+0], this.peopleSprites[this.currentPerson*3+1], this.peopleSprites[this.currentPerson*3+2], this._personInfoButton);
			tmp.alphaAnimate()
		}
		this.currentPerson = personquery;
		this.personInfo.openMenu();
		this.personInfo.setData(this.peopleNames[personquery], this.peopleSprites[personquery*3+0], this.peopleSprites[personquery*3+1], this.peopleSprites[personquery*3+2], this.peopleData[personquery*5+0], this.peopleData[personquery*5+1], this.peopleData[personquery*5+2], this.peopleData[personquery*5+3], this.peopleData[personquery*5+4]);
		this.townArea.removePerson(this.currentPerson);
	}

	/*
    this.zerozero = game.physics.arcade.overlap(this.causeText[0].getSprite(), this.causeButton[0], overlap);
    this.fourfour =game.physics.arcade.overlap(this.causeText[4].getSprite(), this.causeButton[4], overlap);
    this.oneone = game.physics.arcade.overlap(this.causeText[1].getSprite(), this.causeButton[1], overlap);
    this.fivefive =game.physics.arcade.overlap(this.causeText[5].getSprite(), this.causeButton[5], overlap);
    this.twotwo = game.physics.arcade.overlap(this.causeText[2].getSprite(), this.causeButton[2], overlap);
    this.sixsix =game.physics.arcade.overlap(this.causeText[6].getSprite(), this.causeButton[6], overlap);
    this.threethree = game.physics.arcade.overlap(this.causeText[3].getSprite(), this.causeButton[3], overlap);
    this.sevenseven =game.physics.arcade.overlap(this.causeText[7].getSprite(), this.causeButton[7], overlap);
    



  if(this.zerozero === true && this.fourfour ===true)
  {
      console.log("overlap");
 
      if (this.toggle2===true)
      {this.toggle2 = false;
      this.correctblock = this.clipboard.add(this.diseaseButton[0].x-600,165, "correctblock");
          this.correct.play("",0,1);
          this.correctblock.inputEnabled = false;
          this.causeText[0].getSprite().body.immovable = true;
         this.causeText[4].getSprite().body.immovable = true;
      }
  
  }
    if(this.oneone === true && this.fivefive ===true)
    {
        console.log("overlap");
        
        if (this.toggle3===true)
        {this.toggle3 = false;
            this.correctblock = this.clipboard.add(this.diseaseButton[0].x-600,365, "correctblock");
            this.correct.play("",0,1);
            this.correctblock.inputEnabled = false;
            this.causeText[0].getSprite().body.immovable = true;
            this.causeText[4].getSprite().body.immovable = true;
        }
        
    }
    if(this.twotwo=== true && this.sixsix ===true)
    {
        console.log("overlap");
        
        if (this.toggle4===true)
        {this.toggle4 = false;
            this.correctblock = this.clipboard.add(this.diseaseButton[0].x-600,565, "correctblock");
            this.correct.play("",0,1);
            this.correctblock.inputEnabled = false;
            this.causeText[0].getSprite().body.immovable = true;
            this.causeText[4].getSprite().body.immovable = true;
        }
        
    }
    if(this.threethree === true && this.sevenseven===true)
    {
        console.log("overlap");
        
        if (this.toggle5===true)
        {this.toggle5 = false;
            this.correctblock = this.clipboard.add(this.diseaseButton[0].x-600,765, "correctblock");
            this.correct.play("",0,1);
            this.correctblock.inputEnabled = false;
            this.causeText[0].getSprite().body.immovable = true;
            this.causeText[4].getSprite().body.immovable = true;
        }
        
    }

      */
    

};

function overlap ()

{
   
    //console.log("overlap");
    
}

