progress.shopsystem.gui.displayFragmentMultiplicatorStatistic = false;

shopsystem.shops['generationbonus'] = {
	values: {
		index: 0,
		active: false,
		generationNeeded: 50,
		generationBonus: 1,
		generationNeededUpdateValue: 40,
		generationBonusUpdateValue: 2,
	},
	priority: 3,
	visible: false,
	display: function(){
		var output = "";
	
		if(shopsystem.shops['generationbonus'].visible && shopsystem.shops['generationbonus'].values.index < shopsystem.shops['generationbonus'].pricing.length){
			//check if button is payable
			if(shopsystem.values.currentFragments >= shopsystem.shops['generationbonus'].pricing[shopsystem.shops['generationbonus'].values.index]){
				buttonClass = "paybutton-active";
			} else {
				buttonClass = "paybutton";
			}
		
			//display html
			output += "<div>";
				output += "<div id=\"payFragmentRoundMultiplicatorButton\" class=\""+ buttonClass +"\" onClick=\"shopsystem.buy('generationbonus');\">(3) Generations Boost "+ (shopsystem.shops['generationbonus'].values.index+1) +" - "+ shopsystem.shops['generationbonus'].pricing[shopsystem.shops['generationbonus'].values.index] +" <i class=\"fa fa-money\"></i>";
				output += "</div>";
			output += "</div>";
			output += "<div class=\"clearfix\"> </div>";
		}
		
		return output;
	},
	update: function(){
		if(shopsystem.shops['generationbonus'].visible){
			//enough money
			if(shopsystem.values.currentFragments >= shopsystem.shops['generationbonus'].pricing[shopsystem.shops['generationbonus'].values.index]){
				//pay
				shopsystem.values.currentFragments -= shopsystem.shops['generationbonus'].pricing[shopsystem.shops['generationbonus'].values.index];
				shopsystem.shops['generationbonus'].values.index++;
				
				//activate or adjust
				if(shopsystem.shops['generationbonus'].values.active){
					//adjust fragment generation needed value
					shopsystem.shops['generationbonus'].values.generationNeeded += shopsystem.shops['generationbonus'].values.generationNeededUpdateValue;
					//adjust fragment generation bonus value
					shopsystem.shops['generationbonus'].values.generationBonus *= shopsystem.shops['generationbonus'].values.generationBonusUpdateValue;
				} else {
					shopsystem.shops['generationbonus'].values.active = true;
				}
			
				displayProgressMessage("Fragment Generation Multiplicator "+ shopsystem.shops['generationbonus'].values.index +" Unlocked!");
				document.getElementById("fragmentperrounds-text").style.display = 'block';
				document.getElementById("fragmentperrounds").style.display = 'block';
				
				document.getElementById("fragmentperroundsboost-text").style.display = 'block';
				document.getElementById("fragmentperroundsboost").style.display = 'block';
				
				statistics.shopsystem.updatesBought++;
				
				//display statistics
				progress.shopsystem.gui.displayFragmentMultiplicatorStatistic = true;
			}
		}
		
		displayScoreboardGUI();
	},
	pricing: [
		50,
		200,	//2
		400,
		800,	
		1600,	//5
		3200,
		6400
	],
	getBonusAmount: function(){
		//check if it is active
		if(shopsystem.shops['generationbonus'].values.active){
			return Math.floor((statistics.game.currentGenerations / shopsystem.shops['generationbonus'].values.generationNeeded) * shopsystem.shops['generationbonus'].values.generationBonus);
		} else {
			return 0;
		}
	}
}