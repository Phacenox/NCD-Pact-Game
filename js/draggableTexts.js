let draggableText = function(){
    this.causeText=[];

};

draggableText.prototype.preload = function(){
    
    
};

draggableText.prototype.create = function(){

  this.draggabletext = game.add.group();
   
    

    this.draggabletext.enableBody = true;

                                    

	
};



draggableText.prototype.add = function(x, y, name,causetextindex){
    let causeText = this.draggabletext.create(x, y, name,causetextindex);
    this.causetextindex = causetextindex;
    this.causeText[causetextindex]= causeText;


    this.causeText[causetextindex].inputEnabled= true;
    
    
    return causeText;
    
};

draggableText.prototype.addChild = function(sprite)
{
    return this.draggabletext.add(sprite);
    
};
draggableText.prototype.removeChild = function(sprite)
{
    return this.draggabletext.remove(sprite);
    
};



draggableText.prototype.update = function(){


    
 


	};



