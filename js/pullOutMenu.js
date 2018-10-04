let pullOutMenu = function(){
	this.animationFrames = 50;
	this.animating = 0;
	this.animationframe = 0;
	this.opened = false;
	this.functionStrength = 21.335;
	
	this.travelDistance = 915;
	this.inverted = 1;
};


pullOutMenu.prototype.create = function(){
	this.items = game.add.group();
	this.items.enableBody = true;
	let _clibBoard = this.items.create(-915, 0, "clipboard");
	let _startButton = this.items.create(10, 465, "clipboardbutton");
	_startButton.inputEnabled = true;
	_startButton.events.onInputDown.add(this.actiononClick, this);
    let _causeButton = this.items.create(-800,200, "causebutton");
    let _causeButton2 = this.items.create(-600,200, "causebutton");
    let _diseaseButton = this.items.create(-300,200, "diseasebutton");
    let _causeButton3 = this.items.create(-800,400, "causebutton");
    let _causeButton4 = this.items.create(-600,400, "causebutton");
    let _diseaseButton2 = this.items.create(-300,400, "diseasebutton");
    
    
	
};

pullOutMenu.prototype.init = function(){
	this.items.forEachAlive(this.moveAmount, this, -400);
}

pullOutMenu.prototype.update = function(){
	if(this.animating !== 0){
		if(this.animationframe < this.animationFrames){
			this.items.forEachAlive(this.moveAmount, this, this.inverted*this.travelDistance*this.animating*this.smoothEquation((this.animationframe/this.animationFrames)));
			this.animationframe++;
		}else{
			this.animationframe = 0;
			this.animating = 0;
		}
	}
};

pullOutMenu.prototype.moveAmount = function(item, x, y){
	item.body.x += x;
};

pullOutMenu.prototype.smoothEquation = function(x){
	let y = 0;
	y += Math.pow(x-1, 3);
	y += 2*Math.pow(x-1, 2);
	y /= this.functionStrength;
	return y;
}

pullOutMenu.prototype.actiononClick = function(){
	if(this.animating === 0){
		if(this.opened){
			this.animating = -1;
			this.opened = false;
		}else{
			this.animating = 1;
			this.opened = true;
		}
	}
};
