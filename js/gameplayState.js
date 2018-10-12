let gameplayState = function(){
	this.score = 0;
    this.causeButton=[];
};

gameplayState.prototype.preload = function(){
    
};

gameplayState.prototype.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
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
       this.causeButton[i]=this.clipboard.addBlankButton(-810, 200+200*i, "causebutton", i);
     }
    //generating cause blank button for the second column
    for(var i=4; i< 8; i++){
        this.causeButton[i]=this.clipboard.addBlankButton(-610, 200+200*(i-4), "causebutton", i);
    }
    //generating disease button
    for(var i=8; i< 12; i++){
         this.clipboard.addBlankButton(-300, 200+200*(i-8), "diseasebutton", i);
    }
    
    
    this.causeText1 = this.draggablestuff.add(1600,200,"causetext2");

   this.causeText2 = this.draggablestuff.add(1600,400,"causetext2");

    this.causeText1.events.onDragStop.add(onDragStop, this);
    this.causeText2.events.onDragStop.add(onDragStop, this);
    this.causeText1.events.onInputDown.add(onInputDown,this);
    this.causeText2.events.onInputDown.add(onInputDown,this);
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
      
  if (sprite.x>this.causeButton[4].x-100){
    
    //  console.log(sprite.x);
     
        sprite.x =this.causeButton[4].x;
       }
       else if (sprite.x< this.causeButton[4].x-100){

         //  console.log(sprite.x);

           sprite.x = this.causeButton[0].x;
      }
   
        if(sprite.y<this.causeButton[1].y-100){
       
           sprite.y =this.causeButton[0].y;
       }
       else if(sprite.y>this.causeButton[1].y-100 && sprite.y<this.causeButton[2].y-100){
           
           sprite.y =this.causeButton[1].y;
       }

       else if (sprite.y>this.causeButton[2].y-100 && sprite.y<this.causeButton[3].y-100){
           sprite.y =this.causeButton[2].y;
       }
       else if (sprite.y>this.causeButton[3].y-100){
           sprite.y = this.causeButton[3].y;
       }
       else if (sprite.y>this.causeButton[3].y){
           sprite.y = this.causeButton[3].y;
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
    game.physics.arcade.overlap(this.causeText1, this.clipboard.causeButton[0], overlap);
    game.physics.arcade.overlap(this.causeText2, this.clipboard.causeButton[1], overlap);
}

function overlap ()
{
    console.log("overlap");
 
}
