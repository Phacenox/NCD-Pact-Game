let pullOutMenu = function(distance, inverted){
	this.animationFrames = 50;
	this.animating = 0;
	this.animationframe = 0;
	this.opened = false;
	this.functionStrength = 21.335;
	
	this.travelDistance = distance;
	this.inverted = inverted;
};


pullOutMenu.prototype.create = function(){
	this.items = game.add.group();
	this.items.enableBody = true;
};

pullOutMenu.prototype.add = function(x, y, name){
	return this.items.create(x, y, name);
}

pullOutMenu.prototype.addButton = function(x, y, name){
	let _startButton = this.items.create(x, y, name);
	_startButton.inputEnabled = true;
	_startButton.events.onInputDown.add(this.actiononClick, this);
	
	return _startButton;
}

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
