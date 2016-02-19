progress.shopsystem.gui.displayFragmentChanceStatistic = false;

shopsystem.shops['fragmentchance'] = {
	values: {
		index: 0,
		chance: 1000,
		chanceUpdateValue: 20
	},
	priority: 4,
	visible: false,
	display: function(){
		var output = "";
	
		if(shopsystem.shops['fragmentchance'].visible && shopsystem.shops['fragmentchance'].values.index < shopsystem.shops['fragmentchance'].pricing.length){
			//check if button is payable
			if(shopsystem.values.currentFragments >= shopsystem.shops['fragmentchance'].pricing[shopsystem.shops['fragmentchance'].values.index]){
				buttonClass = "paybutton-active";
			} else {
				buttonClass = "paybutton";
			}
		
			//display html
			output += "<div>";
				output += "<div id=\"payFragmentChanceButton\" class=\""+ buttonClass +"\" onClick=\"shopsystem.buy('fragmentchance');\">(4) Fragment Chance "+ (shopsystem.shops['fragmentchance'].values.index+1) +" - "+ shopsystem.shops['fragmentchance'].pricing[shopsystem.shops['fragmentchance'].values.index] +" <i class=\"fa fa-money\"></i>";
				output += "</div>";
			output += "</div>";
			output += "<div class=\"clearfix\"> </div>";
		}
		
		return output;
	},
	update: function(){
		//shop available
		if(shopsystem.shops['fragmentchance'].visible){
			//enough money
			if(shopsystem.values.currentFragments >= shopsystem.shops['fragmentchance'].pricing[shopsystem.shops['fragmentchance'].values.index]){
				//pay
				shopsystem.values.currentFragments -= shopsystem.shops['fragmentchance'].pricing[shopsystem.shops['fragmentchance'].values.index];
				shopsystem.shops['fragmentchance'].values.index++;
				
				//adjust fragment chance
				shopsystem.shops['fragmentchance'].values.chance -= shopsystem.shops['fragmentchance'].values.chanceUpdateValue;
			
				displayProgressMessage("Fragment Chance "+ shopsystem.shops['fragmentchance'].values.index +" Unlocked!");
				document.getElementById("fragmentchance-text").style.display = 'block';
				document.getElementById("fragmentchance").style.display = 'block';
				
				statistics.shopsystem.updatesBought++;
				
				//display statistics
				progress.shopsystem.gui.displayFragmentChanceStatistic = true;
			}
		}
		
		displayScoreboardGUI();
	},
	pricing: [
		80,
		160,
		240,
		450,
		700,	//5
		900,
		1100,
		1300,
		1600,
		2000,	//10
		2500,
		3000,
		3500,
		4000,
		4500,	//15
		5000,
		5500,
		6000,
		6500,
		7000,	//20
		7500,
		8000,
		8500,
		9000,
		11111	//25
	]
}