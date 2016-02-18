progress.shopsystem.gui.displayFragmentMultiplicatorStatistic = false;

shopsystem.shops['generationbonus'] = {
	values: {
		index: 0,
		bonusEveryGeneration: 205,
		generationbonusUpdateValue: 5,
	},
	priority: 3,
	visible: false,
	display: function(){
		var output = "";
	
		if(shopsystem.shops['generationbonus'].visible && shopsystem.shops['generationbonus'].values.index < shopsystem.shops['generationbonus'].pricing.length){
			//check if button is payable
			if(shopsystem.currentFragments >= shopsystem.shops['generationbonus'].pricing[shopsystem.shops['generationbonus'].values.index]){
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
			if(shopsystem.currentFragments >= shopsystem.shops['generationbonus'].pricing[shopsystem.shops['generationbonus'].values.index]){
				//pay
				shopsystem.currentFragments = shopsystem.currentFragments - shopsystem.shops['generationbonus'].pricing[shopsystem.shops['generationbonus'].values.index];
				shopsystem.shops['generationbonus'].values.index++;
				
				//adjust fragment rounds multiplicator
				shopsystem.shops['generationbonus'].values.bonusEveryGeneration -= shopsystem.shops['generationbonus'].values.generationbonusUpdateValue;
			
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
		25,
		50,		//2
		75,
		100,	
		125,	//5
		150,
		175,
		200,
		225,
		250,	//10
		275,
		300,
		325,
		350,
		375,	//15
		400,
		425,
		450,
		475,
		500,	//20
		555
	]
}