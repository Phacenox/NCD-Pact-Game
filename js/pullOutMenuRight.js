let pullOutMenuRight = function(distance, inverted){
	this.animationFrames = 50;
	this.animating = 0;
	this.animationframe = 0;
	this.opened = false;
	this.functionStrength = 21.335;
	
	this.travelDistance = distance;
	this.inverted = inverted;
    this.open = game.add.audio("open",1);
    this.close = game.add.audio("close",1);
    
	this.draggables = game.add.group();
	this.draggables.enablebody = true;
	
};

pullOutMenuRight.prototype.isOpen = function(){
	return this.opened;
}

pullOutMenuRight.prototype.destroyDraggables = function(){
	this.draggables.destroy(true);
	this.draggables = game.add.group();
	this.draggables.enablebody = true;
}

pullOutMenuRight.prototype.adddraggable = function(item){
	this.draggables.add(item);
}

pullOutMenuRight.prototype.initData = function(){
	this.picture = this.items.create(3120, 200);
	this.picture.smoothed = false;
	this.picture.scale.setTo(4, 4)
	this.nametext = game.add.text(2500, 200, "", 16);
	this.items.add(this.nametext);
	this.textA = game.add.text(2650, 500, "", 16);
	this.items.add(this.textA);
	this.textB = game.add.text(2650, 625, "", 16);
	this.items.add(this.textB);
	this.textC = game.add.text(2650, 750, "", 16);
	this.items.add(this.textC);
	this.textD = game.add.text(2650, 875, "", 16);
	this.items.add(this.textD);
	this.textE = game.add.text(2650, 1000, "", 16);
	this.items.add(this.textE);
}



pullOutMenuRight.prototype.setData = function(name, gender, spritex, spritey, A, B, C, D, E){
	if(gender === 1){
		this.picture.loadTexture('female', spritey*12 + spritex);
	}else{
		this.picture.loadTexture('male', spritey*12 + spritex);
	}
	this.nametext.text = name;
	this.textA.text = A;
	this.textB.text = B;
	this.textC.text = C;
	this.textD.text = D;
	this.textE.text = E;
}

pullOutMenuRight.prototype.create = function(){
    this.items = game.add.group();
	this.items.enableBody = true;
	
};

pullOutMenuRight.prototype.add = function(x, y, name){
	return this.items.create(x, y, name);
}

pullOutMenuRight.prototype.addGroup = function(thing){
	return this.items.add(thing);
}

pullOutMenuRight.prototype.removeChild = function(sprite)
{
    return this.items.removeChild(sprite);
}

pullOutMenuRight.prototype.addButton = function(x, y, name){
	let _startButton = this.items.create(x, y, name);
	_startButton.inputEnabled = true;
	_startButton.events.onInputDown.add(this.actiononClick, this);
	
	return _startButton;
}


pullOutMenuRight.prototype.update = function(){
	if(this.animating !== 0){
		if(this.animationframe < this.animationFrames){
			this.items.forEachAlive(this.moveAmount, this, this.inverted*this.travelDistance*this.animating*this.smoothEquation((this.animationframe/this.animationFrames)));
			this.draggables.forEachAlive(this.moveAmount, this, this.inverted*this.travelDistance*this.animating*this.smoothEquation((this.animationframe/this.animationFrames)));
			this.animationframe++;
		}else{
			this.animationframe = 0;
			this.animating = 0;
		}
	}
};

pullOutMenuRight.prototype.moveAmount = function(item, x, y){
	item.body.x += x;
};

pullOutMenuRight.prototype.smoothEquation = function(x){
	let y = 0;
	y += Math.pow(x-1, 3);
	y += 2*Math.pow(x-1, 2);
	y /= this.functionStrength;
	return y;
}

pullOutMenuRight.prototype.openMenu = function(){
	this.open.play("",0,1);
	if(this.animating === 0){
		if(!this.opened){
			this.animating = 1;
			this.opened = true;
		}
		return true;
	}
	return false;
}

pullOutMenuRight.prototype.actiononClick = function(){
	if(this.animating === 0){
		if(this.opened){
			this.animating = -1;
			this.opened = false;
            this.close.play("",0,1);
		}else{
			this.animating = 1;
			this.opened = true;
            this.open.play("",0,1);
		}
	}
};
