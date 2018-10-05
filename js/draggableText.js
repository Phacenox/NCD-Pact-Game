let draggableText = function(){

};

draggableText.prototype.preload = function(){
    
    
};

draggableText.prototype.create = function(){
    this.draggabletext = game.add.group();
    let causeText1 = this.draggabletext.create(1600,200,"causetext");
    let causeText2 = this.draggabletext.create(1600,400,"causetext");
    // Enable input detection, then it's possible be dragged.
    //seems not able to enable drag for the whole group
    causeText1.inputEnabled = true;
    //Make it draggable
    causeText1.input.enableDrag();
    // Enable input detection, then it's possible be dragged.
    causeText2.inputEnabled = true;
    //Make it draggable
    causeText2.input.enableDrag();

   

    
    
	
};


draggableText.prototype.update = function(){
    
    
	};



