let preloadState = function(){
	
};

preloadState.prototype.preload = function(){
	//tutorial files, delete later
	game.load.image("sky", "assets/sky.png");
	game.load.image("platform", "assets/platform.png");
	game.load.image("star", "assets/star.png");
	game.load.spritesheet("murph", "assets/character.png", 32, 48);
    
	
	//our files
	game.load.image("startbutton", "assets/StartButton.png");
	game.load.image("menuscreen", "assets/MenuScreen.png");
	game.load.image("hut", "assets/Hut.png");
    game.load.image("causetext","assets/causetext.png");
    game.load.image("causetext2","assets/causetext2.png");
    game.load.image("causebutton","assets/causebutton.png");
    game.load.image("diseasebutton","assets/diseasebutton.png");
    game.load.image("clipboard", "assets/clipboard.png");
	game.load.image("clipboardright", "assets/clipboardRight.png");
    game.load.image("clipboardbutton", "assets/clipboardButton.png");
    game.load.image("correctblock", "assets/correctblock.png");
	game.load.image("town1", "assets/town1.png");
    game.load.audio("drag","assets/drag.wav");
    game.load.audio("drop","assets/drop.wav");
    game.load.audio("close","assets/close.wav");
    game.load.audio("open","assets/open.wav");
    game.load.audio("correct","assets/correct.wav");
    game.load.audio("incorrect","assets/incorrect.wav");
    game.load.audio("woman","assets/woman.wav");
    game.load.audio("man","assets/man.wav");
    game.load.audio("background","assets/Clipboard_Clinic_Music.wav");
	//Disease Icons
	game.load.image("cheek", "assets/DiseaseIcons/cheek.png");
	game.load.image("devil", "assets/DiseaseIcons/devil.png");
	game.load.image("dwarf", "assets/DiseaseIcons/dwarf.png");
	game.load.image("eyes", "assets/DiseaseIcons/eyes.png");
	game.load.image("firehead", "assets/DiseaseIcons/firehead.png");
	game.load.image("holetummy", "assets/DiseaseIcons/holetummy.png");
	game.load.image("mindblow", "assets/DiseaseIcons/mindblow.png");
	game.load.image("nose", "assets/DiseaseIcons/nose.png");
	game.load.image("pentapox", "assets/DiseaseIcons/pentapox.png");
	game.load.image("holetummy", "assets/DiseaseIcons/holetummy.png");
    game.load.image("redskin", "assets/DiseaseIcons/redskin.png");
	game.load.image("slime", "assets/DiseaseIcons/slime.png");
	//Cause Icons
	game.load.image("AntisocialCause", "assets/CauseIcons/AntisocialCause.png");
	game.load.image("ConstructionCause", "assets/CauseIcons/ConstructionCause.png");
	game.load.image("FarmCause", "assets/CauseIcons/FarmCause.png");
	game.load.image("ForestCause", "assets/CauseIcons/ForestCause.png");
	game.load.image("HusbandCause", "assets/CauseIcons/HusbandCause.png");
	game.load.image("MeatCause", "assets/CauseIcons/MeatCause.png");
	game.load.image("SummerCause", "assets/CauseIcons/SummerCause.png");
	game.load.image("TeacherCause", "assets/CauseIcons/TeacherCause.png");
	game.load.image("VegetarianCause", "assets/CauseIcons/VegetarianCause.png");
	game.load.image("WealthyCause", "assets/CauseIcons/WealthyCause.png");
	game.load.image("WifeCause", "assets/CauseIcons/WifeCause.png");
	
	game.load.image("minihitbox", "assets/minihitbox.png");
	game.load.spritesheet("male", "assets/male.png", 25, 55);
	game.load.spritesheet("female", "assets/female.png", 25, 55);
	
	
	
    };

preloadState.prototype.create = function(){
    game.state.start("Start");
	
};

preloadState.prototype.update = function(){
	
};
