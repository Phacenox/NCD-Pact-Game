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
	
	//index in creation array
	this.index = -1;
	
	//pathing variables
	this.places = [];
	this.numplaces = 0;
	
	this.hasGoal = false;
	this.goalx = 0;
	this.goaly = 0;
	this.goalIsBuilding = false;
	this.movespeed = 1;
	this.lastgoal = NaN;
	
	this.randompadding = 300;
	
	this.busy = 0;
};

personMini.prototype.destroy = function(){
	this.allParts.destroy(true);
}

personMini.prototype.create = function(index, x, y, spritename, spriteval){
	this.index = index;
	this.animationFrame = game.rnd.integer() % this.animationSpeed;
	this.sprite = this.allParts.create(x, y, spritename);
	this.hitbox = this.allParts.create(x, y, "platform");
	this.hitbox.alpha = 0;
	this.hitbox.inputEnabled = true;
	this.hitbox.events.onInputDown.add(this.actiononClick, this);
	this.hitbox.events.onInputUp.add(this.actiononClickUp, this);
	return this.sprite;
};

personMini.prototype.initPathing = function(places, numplaces){
	this.places = places;
	this.numplaces = numplaces;
}

personMini.prototype.update = function(){
	if(this.pickedUp === true){
		this.allParts.forEachAlive(this.followMouse, this);
		this.lastMouseX = game.input.x;
		this.lastMouseY = game.input.y;
	}else{
		//path
		if(!this.hasGoal){
			let goalval = game.rnd.integer() % (this.numplaces + 1);
			goalval -= 1;
			while (goalval === this.lastgoal){
				goalval = game.rnd.integer() % (this.numplaces + 1);
				goalval -= 1;
			}
			this.lastgoal = goalval;
			if(goalval < 0){
				this.goalx = game.rnd.integer() % (game.world.width - 2*this.randompadding);
				this.goalx += this.randompadding;
				this.goaly = game.rnd.integer() % (game.world.height - 2*this.randompadding);
				this.goaly += this.randompadding;
				this.goalIsBuilding = false;
			}else{
				this.goalx = this.places[goalval*2];
				this.goaly = this.places[(goalval*2) + 1];
				this.goalIsBuilding = true;
			}
			
			this.hasGoal = true;
		}
		if(this.busy > 0){
			if(this.busy === 1)
				this.sprite.alpha = 1;
			this.busy--;
		}else{
			//check if reached goal
			let diffx = this.goalx - (this.sprite.x + this.sprite.width/2);
			let diffy = this.goaly - (this.sprite.y + this.sprite.height/2);
			let mag = Math.sqrt(Math.pow(diffx, 2) + Math.pow(diffy, 2));
			if(mag < this.movespeed){
				if(this.goalIsBuilding === true){
					this.sprite.alpha = 0;
				}
				//make not exist for a few seconds
				this.hasGoal = false;
				//4 seconds of busyness
				this.busy = 240;
			}else{
				let movex = this.movespeed*diffx/mag;
				let movey = this.movespeed*diffy/mag;
				this.allParts.forEachAlive(this.moveAmount, this, movex, movey);
			}
		}
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

//todo: create a copy of the sprite object that appears over everything else
personMini.prototype.actiononClick = function(){
	this.lastMouseX = game.input.x;
	this.lastMouseY = game.input.y;
	this.pickedUp = true;
};

//todo: remove that sprite
//todo: check collision with the drop box, if collision, send data and destroy self
//idea, set variable in this class, on next frame return an index value through update.
personMini.prototype.actiononClickUp = function(){
	this.pickedUp = false;
};