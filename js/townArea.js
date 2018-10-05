let townArea = function(){
	this.people = [];
	this.numpeople = 0;
};


townArea.prototype.create = function(){
	this.objects = game.add.group();
};

townArea.prototype.addObject = function(x, y, name){
	return this.objects.create(x, y, name);
}

townArea.prototype.addPerson = function(x, y, spritename, spriteval){
	let _person = new personMini();
	_person.create(x, y, spritename, spriteval);
	this.people.push(_person);
	this.numpeople++;
	return _person;
}

townArea.prototype.update = function(){
	for(var i = 0; i < this.numpeople; i++){
		this.people[i].update();
	}
};