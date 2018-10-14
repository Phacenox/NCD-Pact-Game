let draggableText = function(x, y, name, csbutton, clpbrd, btn, drg, cbf){
    this.drag = game.add.audio("drag",1);
    this.drop = game.add.audio("drop",1);
	this.causeButton = csbutton;
	this.clipboard = clpbrd;
	this._clipboardButton = btn;
	this.personInfo = drg;
	this.causeButtonFinals = cbf;
	this.causeText = game.add.sprite(x, y, name);
	this.causeText.inputEnabled = true;
	this.originx = 0;
	this.originy = 0;
	this.causeText.input.enableDrag(true);
	game.physics.arcade.enable(this.causeText);
	this.causeText.events.onDragStop.add(onDragStop, this);
	this.causeText.events.onDragStart.add(onDragStart,this);
	
	this.diseaseValue = -1;
	
};

draggableText.prototype.setDValue = function(x){
	this.diseaseValue = x;
}

draggableText.prototype.getDValue = function(){
	return this.diseaseValue;
}

draggableText.prototype.getSprite = function(){
    
	return this.causeText;
    
};


draggableText.prototype.setOrigin = function(x, y){
	this.originx = x;
	this.originy = y;
}

draggableText.prototype.resetPosition = function(){
	this.causeText.x = this.originx;
	this.causeText.y = this.originy;
}

draggableText.prototype.destroy = function(){
	this.causeText.destroy();
}

function onDragStart()
{
   this.drag.play("",0,1);
}


function onDragStop(sprite, pointer){
    sprite = this.clipboard.addChild(sprite);
    this.drop.play("",0,1);
    if (sprite.x<this._clipboardButton.x)
   {
      
  if (sprite.x>this.causeButton[4].x-100){
    
    //  console.log(sprite.x);
		this.xpos = 1;
		this.ypos = 0;
     
        sprite.x =this.causeButton[4].x;
       }
       else if (sprite.x< this.causeButton[4].x-100){

         //  console.log(sprite.x);
			this.xpos = 0;
           sprite.x = this.causeButton[0].x;
		}
       if(sprite.y<this.causeButton[1].y-100){
           sprite.y =this.causeButton[0].y;
       }
       else if(sprite.y>this.causeButton[1].y-100 && sprite.y<this.causeButton[2].y-100){
           sprite.y =this.causeButton[1].y;
		   this.ypos = 1;
       }
       else if (sprite.y>this.causeButton[2].y-100 && sprite.y<this.causeButton[3].y-100){
           sprite.y =this.causeButton[2].y;
		   this.ypos = 2;
       }
       else if (sprite.y>this.causeButton[3].y-100){
           sprite.y = this.causeButton[3].y;
		   this.ypos = 3;
       }
	   if(this.causeButtonFinals[this.xpos + this.ypos*2] !== null){
		   this.causeButtonFinals[this.xpos + this.ypos*2].destroy();
	   }
	   this.causeButtonFinals[this.xpos + this.ypos*2] = this;
	   
    }else{
   
       sprite  = this.personInfo.adddraggable(sprite);
		this.resetPosition();
    }
}
