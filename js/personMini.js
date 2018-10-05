let personMini = function(){
	this.animationFrame = 0;
	//animation speed is the number of frames in a full cycle.
	this.animationSpeed = 6;
	this.animationstrength = 15;
	this.allParts = game.add.group();
	this.allParts.enableBody = true;
	this.pickedUp = false;
	this.lastMouseX = 0;
	this.lastMouseY = 0;
	
	this.movex = 1;
	this.movey = .5;
};


personMini.prototype.create = function(x, y, spritename, spriteval){
	this.animationFrame = game.rnd.integer() % this.animationSpeed;
	this.sprite = this.allParts.create(x, y, spritename);
	this.hitbox = this.allParts.create(x, y, "platform");
	this.hitbox.alpha = .5;
	this.hitbox.inputEnabled = true;
	this.hitbox.events.onInputDown.add(this.actiononClick, this);
	this.hitbox.events.onInputUp.add(this.actiononClickUp, this);
};

personMini.prototype.update = function(){
	if(this.pickedUp === true){
		this.allParts.forEachAlive(this.followMouse, this);
		this.lastMouseX = game.input.x;
		this.lastMouseY = game.input.y;
	}else{
		this.allParts.forEachAlive(this.moveAmount, this, this.movex, this.movey);
	}
	
		this.allParts.forEachAlive(this.animate, this);
		this.animationFrame++;
};

personMini.prototype.followMouse = function(item){
	item.body.x += game.input.x - this.lastMouseX;
	item.body.y += game.input.y - this.lastMouseY;
};

personMini.prototype.moveAmount = function(item, x, y){
	item.body.x += x;
	item.body.y += y;
};

personMini.prototype.animate = function(item){
	let lastx = (this.animationFrame-1)/this.animationSpeed;
	let nowx = this.animationFrame/this.animationSpeed
	let movement = Math.abs(Math.sin(nowx));
	movement -= Math.abs(Math.sin(lastx));
	movement *= this.animationstrength;
	
	item.body.y -= movement;
}

personMini.prototype.actiononClick = function(){
	this.lastMouseX = game.input.x;
	this.lastMouseY = game.input.y;
	this.pickedUp = true;
};

personMini.prototype.actiononClickUp = function(){
	this.pickedUp = false;
};