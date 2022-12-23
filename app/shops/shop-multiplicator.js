progress.shopsystem.gui.displayFragmentMultiplicatorStatistic = false;

shopsystem.shops['multiplicator'] = {
	values: {
		index: 0,
		fragmentMultiplicator: 0,
		fragmentMultiplicatorUpdateValue: 1
	},
	priority: 5,
	visible: false,
	display: function(){
		var output = "";
	
		if(shopsystem.shops['multiplicator'].visible && shopsystem.shops['multiplicator'].values.index < shopsystem.shops['multiplicator'].pricing.length){
			//check if button is payable
			if(shopsystem.values.currentFragments >= shopsystem.shops['multiplicator'].pricing[shopsystem.shops['multiplicator'].values.index]){
				buttonClass = "paybutton-active";
			} else {
				buttonClass = "paybutton";
			}
		
			//display html
			output += "<div>";
				output += "<div id=\"payFragmentMultiplicatorButton\" class=\"shop-tooltip "+ buttonClass +"\" onClick=\"shopsystem.buy('multiplicator');\">";
					output += "<div class=\"key\">(5)</div>";
					output += "<div class=\"title\">Fragment Base "+ (shopsystem.shops['multiplicator'].values.index+1) +"</div>";
					output += "<div class=\"price\">"+ shopsystem.shops['multiplicator'].pricing[shopsystem.shops['multiplicator'].values.index] +" <i class=\"fa fa-money\"></i></div>";
					output += "<div class=\"clearfix\"> </div>";
					output += "<span class=\"shop-tooltiptext shop-tooltip-left\">The higher the value, the more fragments are earned per generation.</span>"
				output += "</div>";
			output += "</div>";
			output += "<div class=\"clearfix\"> </div>";
		}
		
		return output;
	},
	update: function(){
		//shop is activated
		if(shopsystem.shops['multiplicator'].visible){
			//enough money
			if(shopsystem.shops['multiplicator'].visible && shopsystem.values.currentFragments >= shopsystem.shops['multiplicator'].pricing[shopsystem.shops['multiplicator'].values.index]){
				//pay
				shopsystem.values.currentFragments -= shopsystem.shops['multiplicator'].pricing[shopsystem.shops['multiplicator'].values.index];
				shopsystem.shops['multiplicator'].values.index++;
				
				//adjust multiplicator
				shopsystem.shops['multiplicator'].values.fragmentMultiplicator += shopsystem.shops['multiplicator'].values.fragmentMultiplicatorUpdateValue;
				
				displayProgressMessage("Fragment Multiplicator "+ shopsystem.shops['multiplicator'].values.index +" Unlocked!");
				
				statistics.shopsystem.updatesBought++;
			}
		}
		
		displayScoreboardGUI();
	},
	pricing: [
		100,	//2
		200,
		400,	//4
		600,
		800,	//6
		1000,
		1200,	//8
		1400,
		1600	//10
	]
}