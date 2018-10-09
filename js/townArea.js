let townArea = function(){
	this.people = [];
	this.numpeople = 0;
	this.places = [];
	this.numplaces = 0;
};


townArea.prototype.create = function(numpeople){
	for(var i = 0; i < numpeople; i++){
		this.people.push(0);
	}
	this.numpeople = numpeople;
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

townArea.prototype.addPerson = function(index, x, y, spritename, personInfoButton){
	let _person = new personMini();
	_person.initPathing(this.places, this.numplaces);
	_person.create(index, x, y, spritename, personInfoButton);
	this.people[index] = _person;
	return _person;
}

townArea.prototype.removePerson = function(index){
	this.people[index].destroy();
	this.people[index] = 0;
}

townArea.prototype.update = function(){
	let retval = -1;
	for(var i = 0; i < this.numpeople; i++){
		if(this.people[i] != 0){
			if(retval === -1){
				retval = this.people[i].update();
			}else{
				this.people[i].update()
			}
		}
	}
	return retval;
};