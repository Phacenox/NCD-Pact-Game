let townArea = function(){
	this.people = [];
	this.numpeople = 0;
	this.places = [];
	this.numplaces = 0;
};


townArea.prototype.create = function(){
	this.objects = game.add.group();
};

townArea.prototype.addObject = function(x, y, name){
	return this.objects.create(x, y, name);
}

//must add places before people
townArea.prototype.addPlace = function(x, y){
	this.places.push(x);
	this.places.push(y);
	this.numplaces++;
}
//after adding places, it is assumed to be read only.

townArea.prototype.addPerson = function(x, y, spritename, spriteval){
	let _person = new personMini();
	_person.initPathing(this.places, this.numplaces);
	_person.create(x, y, spritename, spriteval, this.numpeople);
	this.people.push(_person);
	this.numpeople++;
	return _person;
}

townArea.prototype.update = function(){
	for(var i = 0; i < this.numpeople; i++){
		this.people[i].update();
	}
};