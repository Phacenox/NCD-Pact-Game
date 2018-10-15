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
	this.diseaseList = []; //random diseases for this level
	this.causeList = []; //random causes for this level
	
	this.diseaseNames = [];
	this.causeTexts = [];
	this.causeSprites = [];
	this.diseaseSprites = [];
	this.maleFirst = ["Aaron","Aiden","Alan","Aaron","Aiden","Alan","Alberto","Andre","Andrew","Anton","Arthur","Benjamin","Carlos","David","Diego","Dimitri","Dylan","Emile","Enzo","Ethan",
	"Felix","Gunnar","Hugo","Ivan","Jan","Joel","Jonas","Jorge","Jose","Juan","Julian","Leon","Liam","Lucas","Magnus","Mario","Mathias","Matthew","Maximilian","Mohamed","Nathan","Noah",
	"Oliver","Oscar","Pablo","Ren","Ricardo","Roland","Ryan","Sergei","Simon","Takumi","Vincente"];
	this.femaleFirst = ["Alice","Alva","Amelia","Alice","Alva","Amelia","Anastasia","Anna","Antonia","Aria","Ariel","Ava","Avery","Camille","Catalina","Chloe","Clara","Cora","Elias",
	"Ella","Erin","Fernanda","Grace","Hannah","Helga","Ida","Jade","Janice","Jocelyn","Julia","Layla","Lea","Luca","Maja","Marie","Marta","Martina","Mia","Misaki","Nanami","Naomi","Natalia",
	"Oceana","Olga","Paula","Rin","Rowena","Sarah","Tatiana","Trisha","Valentina","Vanessa","Zoey"];
	this.last = ["Alves","Barnes","Brown","Alves","Barnes","Brown","D’Angelo","Devi","Dubois","Fernandes","Fischer","Garcia","Green","Gruber","Hall","Hernandez","Ivanov","Jackson","Jones",
	"Kelly","Kennedy","Kowalski","Kumar","Li","Liu","Martinez","Mayer","Moreau","Murphy","O’Brian","Perez","Petrov","Rodrigues","Russo","Schmidt","Scott","Silva","Singh","Smith","Sullivan",
	"Taylor","Thompson","Trevino","Vasquez","Wagner","Walsh","Wang","Weber","White","Wu","Xu","Yang","Zhang"];
	
	//Disease Names
	this.diseaseNames.push("Cranium Combustum");
	this.diseaseSprites.push("firehead");
	this.diseaseNames.push("Glacio-nasal Syndrome");
	this.diseaseSprites.push("nose");
	this.diseaseNames.push("Rubrum’s Syndrome");
	this.diseaseSprites.push("redskin");
	this.diseaseNames.push("Hitomi’s Disorder");
	this.diseaseSprites.push("eyes");
	this.diseaseNames.push("Dwarf Heart");
	this.diseaseSprites.push("dwarf");
	this.diseaseNames.push("Mindblow");
	this.diseaseSprites.push("mindblow");
	this.diseaseNames.push("Tenebrisium");
	this.diseaseSprites.push("devil");
	this.diseaseNames.push("Acorn Fever");
	this.diseaseSprites.push("cheek");
	this.diseaseNames.push("Limusium");
	this.diseaseSprites.push("slime");
	this.diseaseNames.push("Pentapox");
	this.diseaseSprites.push("pentapox");
	this.diseaseNames.push("Abdomina Cavae");
	this.diseaseSprites.push("holetummy");
	
	//Cause Text
	this.causeTexts.push("I work as a Construction Worker.");
	this.causeSprites.push("ConstructionCause");
	this.causeTexts.push("I work as a Farmer.");
	this.causeSprites.push("FarmCause");
	this.causeTexts.push("I work as a Teacher.");
	this.causeSprites.push("TeacherCause");
	this.causeTexts.push("I come from a wealthy family.");
	this.causeSprites.push("WealthyCause");
	this.causeTexts.push("I love the forest, it makes me feel like I’m\nconnected to nature.");
	this.causeSprites.push("ForestCause");
	this.causeTexts.push("This summer was blazing hot. I sweat out a\npool every night!");
	this.causeSprites.push("SummerCause");
	this.causeTexts.push("I’m somewhat of a shut in, I spend most of my\ntime working or playing video games by myself.");
	this.causeSprites.push("AntisocialCause");
	this.causeTexts.push("I tend to eat a lot my red meat. I just love a\ngood steak, you know?");
	this.causeSprites.push("MeatCause");
	this.causeTexts.push("I’m a vegetarian, meat just doesn’t do well\nwith my digestive system.");
	this.causeSprites.push("VegetarianCause");
		
	
	//Generate Disease Data
	this.tempRand = 0;
	for(var i = 0; i < 3;i++){
		this.tempRand = this.game.rnd.integerInRange(0, 10);
		if(i === 0){
			this.diseaseList.push(this.tempRand);
			continue;
		}
		var d = true;
		while(d){
			d = false;
			for(var j = 0; j < i;j++){
				if(this.diseaseList[j] === this.tempRand){
					this.tempRand = this.game.rnd.integerInRange(0, 10);
					d = true;
					break;
				}
			}	
		}
		this.diseaseList.push(this.tempRand);
	}
	
	//Generate Cause Data
	for(var i = 0; i < 4;i++){
		this.tempRand = this.game.rnd.integerInRange(0, 8);
		if(i === 0){
			this.causeList.push(this.tempRand);
			continue;
		}
		var d = true;
		while(d){
			d = false;
			for(var j = 0; j < i;j++){
				if(this.causeList[j] === this.tempRand){
					this.tempRand = this.game.rnd.integerInRange(0, 10);
					d = true;
					break;
				}
			}	
		}
		this.causeList.push(this.tempRand);
	}
	
	//person one
	this.tempRand = this.game.rnd.integerInRange(0, 1);
	this.numpeople++;
	if(this.tempRand === 1){
		this.peopleNames.push(this.femaleFirst[this.game.rnd.integerInRange(0,52)] + " " + this.last[this.game.rnd.integerInRange(0,52)]);
	}else{
		this.peopleNames.push(this.maleFirst[this.game.rnd.integerInRange(0,52)] + " " + this.last[this.game.rnd.integerInRange(0,52)]);
	}
	this.peopleData.push(this.causeList[0]);
	this.peopleData.push(this.causeList[1]);
	this.peopleData.push(-1);
	this.peopleData.push(-1);
	this.peopleData.push(-1);
	this.peopleSprites.push(this.tempRand);
	this.peopleSprites.push(this.diseaseList[0]+1);
	this.peopleSprites.push(this.game.rnd.integerInRange(0, 2));
	
	//person two
	this.tempRand = this.game.rnd.integerInRange(0, 1);
	this.numpeople++;
	if(this.tempRand === 1){
		this.peopleNames.push(this.femaleFirst[this.game.rnd.integerInRange(0,52)] + " " + this.last[this.game.rnd.integerInRange(0,52)]);
	}else{
		this.peopleNames.push(this.maleFirst[this.game.rnd.integerInRange(0,52)] + " " + this.last[this.game.rnd.integerInRange(0,52)]);
	}
	this.peopleData.push(this.causeList[1]);
	this.peopleData.push(this.causeList[2]);
	this.peopleData.push(this.causeList[3]);
	this.peopleData.push(-1);
	this.peopleData.push(-1);
	this.peopleSprites.push(this.tempRand);
	this.peopleSprites.push(this.diseaseList[1]+1);
	this.peopleSprites.push(this.game.rnd.integerInRange(0, 2));
	
	//person three
	this.tempRand = this.game.rnd.integerInRange(0, 1);
	this.numpeople++;
	if(this.tempRand === 1){
		this.peopleNames.push(this.femaleFirst[this.game.rnd.integerInRange(0,52)] + " " + this.last[this.game.rnd.integerInRange(0,52)]);
	}else{
		this.peopleNames.push(this.maleFirst[this.game.rnd.integerInRange(0,52)] + " " + this.last[this.game.rnd.integerInRange(0,52)]);
	}
	this.peopleData.push(this.causeList[0]);
	this.peopleData.push(this.causeList[2]);
	this.peopleData.push(this.causeList[3]);
	this.peopleData.push(-1);
	this.peopleData.push(-1);
	this.peopleSprites.push(this.tempRand);
	this.peopleSprites.push(this.diseaseList[2]+1);
	this.peopleSprites.push(this.game.rnd.integerInRange(0, 2));
};

gameplayState.prototype.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.background = game.add.audio("background",1);
    this.background.play("",0,1,true);
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

	for(var i = 0; i < this.diseaseList.length; i++){
		this.diseaseButton[i] = this.clipboard.addBlankButton(-300, 200+200*i, this.diseaseSprites[this.diseaseList[i]]);
	}
	
	for(var i = this.diseaseList.length; i < 4; i++){
		this.diseaseButton[i] = this.clipboard.addBlankButton(-300, 200+200*i, "diseasebutton");
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
			this.causeText[i].setDValue(this.peopleData[personquery*5+i], this.causeSprites[this.peopleData[personquery*5+i]]);
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
		var dat = ["", "", "", "", ""];
		for(var i = 0; i < 5; i++){
			if(this.peopleData[personquery*5+i] > -1)
				dat[i] = this.causeTexts[this.peopleData[personquery*5+i]];
		}
		this.personInfo.setData(this.peopleNames[personquery], this.peopleSprites[personquery*3+0], this.peopleSprites[personquery*3+1], this.peopleSprites[personquery*3+2], dat[0], dat[1], dat[2], dat[3], dat[4]);
		this.townArea.removePerson(this.currentPerson);
	}
	this.checkWin();

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

gameplayState.prototype.checkWin = function(){
	var correctvalue = 0;
	for(var i = 0; i < 8; i++){
		if(this.causeButtonFinals[i] !== null){
			if(this.causeButtonFinals[i].getDValue !== -1)
				correctvalue++;
		}
	}
	return correctvalue;
}

function overlap ()

{
   
    //console.log("overlap");
    
}

