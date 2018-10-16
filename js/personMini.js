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
	this.dataquery = false;
	this.decreasingAlpha = false;
	
	//sounds
	this.woman = game.add.audio("woman",1);
    this.man = game.add.audio("man",1);
};

personMini.prototype.destroy = function(){
	this.allParts.destroy(true);
	this.spriteCopy.destroy(true);
}

personMini.prototype.create = function(index, x, y, gender, spritesheetX, spritesheetY, personInfoButton, objectLayer){
	this.personInfoButton = personInfoButton;
	this.index = index;
	this.animationFrame = game.rnd.integer() % this.animationSpeed;
	if(gender === 1){
		this.sprite = this.allParts.create(x, y, 'female');
		this.sprite.frame = spritesheetY*12 + spritesheetX;
	}else{
		this.sprite = this.allParts.create(x, y, 'male');
		this.sprite.frame = spritesheetY*12 + spritesheetX;
	}
	if(gender === 1){
		this.spriteCopy = game.add.sprite(x, y, 'female');
		this.spriteCopy.frame = spritesheetY*12 + spritesheetX;
	}else{
		this.spriteCopy = game.add.sprite(x, y, 'male');
		this.spriteCopy.frame = spritesheetY*12 + spritesheetX;
	}
	game.physics.arcade.enable(this.spriteCopy);
	this.spriteCopy.alpha = 0;
	this.hitbox = this.allParts.create(x-20, y-20, "minihitbox");
	this.hitbox.alpha = 0;
	this.hitbox.inputEnabled = true;
    if (gender ===1){
    this.hitbox.events.onInputDown.add(this.actiononClickWoman, this);
    }
    else{
        this.hitbox.events.onInputDown.add(this.actiononClickMan,this);
    }
	this.hitbox.events.onInputUp.add(this.actiononClickUp, this);
	objectLayer.add(this.allParts);
	
	this.sprite.scale.setTo(2, 2);
	this.hitbox.scale.setTo(2, 2);
	this.spriteCopy.scale.setTo(2,2);
	
	return this.sprite;
};

personMini.prototype.initPathing = function(places, numplaces){
	this.places = places;
	this.numplaces = numplaces;
}

personMini.prototype.update = function(){
	if(this.decreasingAlpha){
		if(this.spriteCopy.alpha > 0)
			this.spriteCopy.alpha -= .025;
		else
			this.decreasingAlpha = false;
	}
	if(this.dataquery){
		return this.index;
	}
	if(this.pickedUp === true){
		this.allParts.forEachAlive(this.followMouse, this);
		this.followMouse(this.spriteCopy)
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
				this.moveAmount(this.spriteCopy, movex, movey);
			}
		}
	}
	
		this.allParts.forEachAlive(this.animate, this);
		this.animate(this.spriteCopy);
		this.animationFrame++;
	return -1;
};

personMini.prototype.followMouse = function(item){
	item.body.x += game.input.x - this.lastMouseX;
	item.body.y += game.input.y - this.lastMouseY;
};

personMini.prototype.moveAmount = function(item, x, y){
	item.body.x += x;
	item.body.y += y;
};

personMini.prototype.alphaAnimate = function(){
	this.spriteCopy.alpha = 1;
	this.decreasingAlpha = true;
}

personMini.prototype.animate = function(item){
	let lastx = (this.animationFrame-1)/this.animationSpeed;
	let nowx = this.animationFrame/this.animationSpeed
	let movement = Math.abs(Math.sin(nowx));
	movement -= Math.abs(Math.sin(lastx));
	movement *= this.animationstrength;
	
	item.body.y -= movement;
}

personMini.prototype.actiononClickWoman= function(){
	this.lastMouseX = game.input.x;
	this.lastMouseY = game.input.y;
	this.pickedUp = true;
	this.spriteCopy.alpha = 1;
	this.decreasingAlpha = false;
	this.woman.play("",0,1);
       
  
};
personMini.prototype.actiononClickMan= function(){
    this.lastMouseX = game.input.x;
    this.lastMouseY = game.input.y;
    this.pickedUp = true;
    this.spriteCopy.alpha = 1;
    this.decreasingAlpha = false;
    this.man.play("",0,1);
  
    
};

personMini.prototype.actiononClickUp = function(){
	this.pickedUp = false;
	if(this.hitbox.x + this.hitbox.width > this.personInfoButton.x && this.hitbox.y + this.hitbox.height > this.personInfoButton.y){
		if(this.hitbox.x < this.personInfoButton.x + this.personInfoButton.width && this.hitbox.y < this.personInfoButton.y + this.personInfoButton.height){
			this.dataquery = true;
		}
	}
	this.decreasingAlpha = true;
};
