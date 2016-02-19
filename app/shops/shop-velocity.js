progress.shopsystem.gui.displayVelocityStatistic = false;

shopsystem.shops['velocity'] = {
	values: {
		index: 0,
		autoSpeedValue: 660,
		currentAutoSpeed: 660,
		autoSpeedUpdateValue: 20
	},
	priority: 1,
	visible: false,
	display: function(){
		var output = "";
		
		if(shopsystem.shops['velocity'].visible && shopsystem.shops['velocity'].values.index < shopsystem.shops['velocity'].pricing.length){
			if(shopsystem.values.currentFragments >= shopsystem.shops['velocity'].pricing[shopsystem.shops['velocity'].values.index]){
				buttonClass = "paybutton-active";
			} else {
				buttonClass = "paybutton";
			}
		
			//display html
			output += "<div>";
				output += "<div id=\"paySpeedButton\" class=\""+ buttonClass +"\" onClick=\"shopsystem.buy('velocity');\">(1) Velocity Boost "+ (shopsystem.shops['velocity'].values.index+1) +" - "+ shopsystem.shops['velocity'].pricing[shopsystem.shops['velocity'].values.index] +" <i class=\"fa fa-money\"></i>";
				output += "</div>";
			output += "</div>";
			output += "<div class=\"clearfix\"> </div>";
		}
		return output;
	},
	update: function(){
		//speed shop available
		if(progress.shopsystem.gui.displayFragments){
			//enough money
			if(shopsystem.values.currentFragments >= shopsystem.shops['velocity'].pricing[shopsystem.shops['velocity'].values.index]){
				//pay
				shopsystem.values.currentFragments -= shopsystem.shops['velocity'].pricing[shopsystem.shops['velocity'].values.index];
				shopsystem.shops['velocity'].values.index++;
				
				//adjust autoSpeed
				shopsystem.shops['velocity'].values.autoSpeedValue = shopsystem.shops['velocity'].values.autoSpeedValue - shopsystem.shops['velocity'].values.autoSpeedUpdateValue;
				if(shopsystem.shops['velocity'].values.autoSpeedValue < 50){
					shopsystem.shops['velocity'].values.autoSpeedValue = 50;
				}
				
				shopsystem.shops['velocity'].values.currentAutoSpeed = shopsystem.shops['velocity'].values.autoSpeedValue;
				
				//restart  timer
				toggleAutoplay();
				toggleAutoplay();
			
				displayProgressMessage("Speedboost "+ shopsystem.shops['velocity'].values.index +" Unlocked!");
				document.getElementById("autospeed-text").style.display = 'block';
				document.getElementById("autospeed").style.display = 'block';
				
				statistics.shopsystem.updatesBought++;
				
				//display statistics
				progress.shopsystem.gui.displayVelocityStatistic = true;
			}
		}
		
		displayScoreboardGUI();
	},
	pricing: [
		5,	//640
		10,
		15,	//600
		20,
		25,	//560
		30,
		35,	//520
		40,
		45,	//480
		50,
		55,	//440
		60,
		75,	//400
		90,
		100,//360
		125,
		150,//320
		200,
		250,//280
		400,
		600,//240
		800,
		1000,//200
		1200,
		1400,//160
		1600,
		1800,//120
		2000 //100
	],
	velocityValue: function(){
		return roundNumber((1/shopsystem.shops['velocity'].values.currentAutoSpeed*10000),2)
	}
};