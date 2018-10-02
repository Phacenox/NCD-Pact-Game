let gameplayState = function(){
	this.score = 0;
};

gameplayState.prototype.preload = function(){
	
};

gameplayState.prototype.create = function(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	game.add.sprite(0, 0, "sky");
	
	this.platforms = game.add.group();
	this.platforms.enableBody = true;
	let ground = this.platforms.create(0, game.world.height - 64, "platform");
	ground.body.immovable = true;
	ground.scale.set(2, 2);
	
	this.player = game.add.sprite(50, game.world.height - 150, "murph");
	game.physics.arcade.enable(this.player);
	this.player.body.gravity.y = 450;
	
	this.player.animations.add("left", [0, 1, 2, 3], 10, true);
	this.player.animations.add("right", [5, 6, 7, 8], 10, true);
	
	this.cursors = game.input.keyboard.createCursorKeys();
};

gameplayState.prototype.update = function(){
	game.physics.arcade.collide(this.player, this.platforms);
	
	this.player.body.velocity.x = 0;
	if(this.cursors.left.isDown){
		this.player.body.velocity.x -= 150;
	}
	if(this.cursors.right.isDown){
		this.player.body.velocity.x += 150;
	}
	if(this.player.body.velocity.x === 0){
		this.player.animations.stop();
		this.player.frame = 4;
	}else if(this.player.body.velocity.x > 0){
		this.player.animations.play("right");
	}else{
		this.player.animations.play("left");
	}
	
	if(this.cursors.up.isDown && this.player.body.touching.down){
		this.player.body.velocity.y -= 150;
	}
};