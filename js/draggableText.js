let draggableText = function(){

};

draggableText.prototype.preload = function(){
    
    
};

draggableText.prototype.create = function(){

  this.draggabletext = game.add.group();

 

                                    

	
};


draggableText.prototype.add = function(x, y, name){
    let text = this.draggabletext.create(x, y, name);
  text.inputEnabled = true;
  text.input.enableDrag();
 //  text.input.enableSnap(100,100,true,true);
    return text;
    
};

draggableText.prototype.addChild = function(sprite)
{
    return this.draggabletext.add(sprite);
    
};


draggableText.prototype.update = function(){


    
 


	};



