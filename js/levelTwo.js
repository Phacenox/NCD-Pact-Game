let levelTwo = function(){
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

levelTwo.prototype.preload = function(){
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
	
	this.nextlevelToggle = true;
	
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
	for(var i = 0; i < 5;i++){
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
					this.tempRand = this.game.rnd.integerInRange(0, 8);
					d = true;
					break;
				}
			}	
		}
		this.causeList.push(this.tempRand);
	}
	this.solution = [];
	this.solution.push(this.causeList[2]);
	this.solution.push(this.causeList[3]);
	this.solution.push(this.causeList[0]);
	this.solution.push(this.causeList[2]);
	this.solution.push(this.causeList[3]);
	this.solution.push(this.causeList[1]);
	
	this.commutative = [true, false, true, true];//true if addition, false if subtraction
	
	//person zero
	this.tempRand = this.game.rnd.integerInRange(0, 1);
	this.numpeople++;
	if(this.tempRand === 1){
		this.peopleNames.push(this.femaleFirst[this.game.rnd.integerInRange(0,52)] + " " + this.last[this.game.rnd.integerInRange(0,52)]);
	}else{
		this.peopleNames.push(this.maleFirst[this.game.rnd.integerInRange(0,52)] + " " + this.last[this.game.rnd.integerInRange(0,52)]);
	}
	this.peopleData.push(this.causeList[0]);
	this.peopleData.push(this.causeList[3]);
	this.peopleData.push(this.causeList[2]);
	this.peopleData.push(-1);
	this.peopleData.push(-1);
	this.peopleSprites.push(this.tempRand);
	this.peopleSprites.push(this.diseaseList[0]+1);
	this.peopleSprites.push(this.game.rnd.integerInRange(0, 2));
	
	
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
	this.peopleSprites.push(this.diseaseList[1]+1);
	this.peopleSprites.push(this.game.rnd.integerInRange(0, 2));
	
	//person two
	this.tempRand = this.game.rnd.integerInRange(0, 1);
	this.numpeople++;
	if(this.tempRand === 1){
		this.peopleNames.push(this.femaleFirst[this.game.rnd.integerInRange(0,52)] + " " + this.last[this.game.rnd.integerInRange(0,52)]);
	}else{
		this.peopleNames.push(this.maleFirst[this.game.rnd.integerInRange(0,52)] + " " + this.last[this.game.rnd.integerInRange(0,52)]);
	}
	this.peopleData.push(this.causeList[0]);
	this.peopleData.push(this.causeList[3]);
	this.peopleData.push(-1);
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
	this.peopleData.push(this.causeList[1]);
	this.peopleData.push(this.causeList[3]);
	this.peopleData.push(-1);
	this.peopleData.push(-1);
	this.peopleData.push(-1);
	this.peopleSprites.push(this.tempRand);
	this.peopleSprites.push(this.diseaseList[2]+1);
	this.peopleSprites.push(this.game.rnd.integerInRange(0, 2));
};

levelTwo.prototype.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.correct = game.add.audio("correct",1);
    this.incorrect = game.add.audio("incorrect",1);
	game.add.sprite(0, 0, "town2");
	
	let numpeople = 12;
	this.townArea = new townArea();
	this.townArea.create(this.numpeople);
	this.townArea.addObject(600, 800, 'hut');
	this.townArea.addPlace(695, 890);
	this.townArea.addObject(1600, 250, 'hut');
	this.townArea.addPlace(1695, 340);
	this.townArea.addObject(1000, 500, 'hut');
	this.townArea.addPlace(1095, 590);
	this.townArea.addObject(800, 170, 'hut');
	this.townArea.addPlace(895, 260);
	
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
	
    //adding plus, minus and equal sign
    this.clipboard.add(-670, 200, "plus");
    this.clipboard.add(-670, 400, "minus");
    this.clipboard.add(-670, 600, "plus");
    this.clipboard.add(-450, 200, "equal");
    this.clipboard.add(-450, 400, "equal");
    this.clipboard.add(-450, 600, "equal");
	
    this.toggle1 = true;
    this.toggle2 = true;
    this.toggle3 = true;
    this.toggle4 = true;
	
	
	this.correctblock1 = this.clipboard.add(this.diseaseButton[0].x-600,165, "correctblock");
	this.correctblock1.alpha = 0;
	this.correctblock2 = this.clipboard.add(this.diseaseButton[0].x-600,365, "correctblock");
	this.correctblock2.alpha = 0;
	this.correctblock3 = this.clipboard.add(this.diseaseButton[0].x-600,565, "correctblock");
	this.correctblock3.alpha = 0;
	this.correctblock4 = this.clipboard.add(this.diseaseButton[0].x-600,765, "correctblock");
	this.correctblock4.alpha = 0;

};

levelTwo.prototype.update = function(){
	this.clipboard.update();
	this.personInfo.update();
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
	
	if(this.checkWin(0, 2) === 2)
	{
		if(this.toggle1){
			this.toggle1 = false;
			this.correct.play("",0,1);;
		}
		this.correctblock1.alpha = 1;
		this.causeButtonFinals[0].getSprite().input.draggable = false;
		this.causeButtonFinals[1].getSprite().input.draggable = false;
	}else{
		this.correctblock1.alpha = 0;
	}
    if(this.checkWin(2, 4) === 2)
    {
		if(this.toggle2){
			this.toggle2 = false;
			this.correct.play("",0,1);;
		}
		this.correctblock2.alpha = 1;
		this.causeButtonFinals[2].getSprite().input.draggable = false;
		this.causeButtonFinals[3].getSprite().input.draggable = false;
    }else{
		this.correctblock2.alpha = 0;
	}
    if(this.checkWin(4, 6) === 2)
    {
		if(this.toggle3){
			this.toggle3 = false;
			this.correct.play("",0,1);;
		}
		this.correctblock3.alpha = 1;
		this.causeButtonFinals[4].getSprite().input.draggable = false;
		this.causeButtonFinals[5].getSprite().input.draggable = false;
    }else{
		this.correctblock3.alpha = 0;
	}
    if(this.checkWin(6, 8) === 2)
    {
		if(this.toggle4){
			this.toggle4 = false;
			this.correct.play("",0,1);;
		}
		this.correctblock4.alpha = 1;
		this.causeButtonFinals[6].getSprite().input.draggable = false;
		this.causeButtonFinals[7].getSprite().input.draggable = false;
    }else{
		this.correctblock4.alpha = 0;
	}
	if(this.nextlevelToggle && this.checkWin(0, 6) === 6){
		this.nextlevelToggle = false;
		this.nextbutton = new nextLevelButton(game.world.centerX, game.world.centerY, '23state');
	}

};

levelTwo.prototype.checkWin = function(x, y){
	
	var correctvalue = 0;
	for(var i = x; i < y; i++){
		
		if(this.causeButtonFinals[i] !== null){
			if(this.commutative[Math.floor(i/2)]){
				if(this.causeButtonFinals[i].getDValue() === this.solution[i]){
				correctvalue++;
				}else if(i% 2 === 0 && this.causeButtonFinals[i].getDValue() === this.solution[i+1]){
					correctvalue++;
				}else if(i% 2 === 1 && this.causeButtonFinals[i].getDValue() === this.solution[i-1]){
					correctvalue++;
				}
			}else{
				if(this.causeButtonFinals[i].getDValue() === this.solution[i]){
					correctvalue++;
				}
			}
		}
	}
	return correctvalue;
}
