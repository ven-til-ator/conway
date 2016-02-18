var shopsystem = {
	currentFragments: 0,
	fragementsLastGeneration: 0,
	fragementBonusEmptyGrid: 5,
	shops: new Array(),
	buy: function(shopname){
		shopsystem.shops[shopname].update();
	},
	displayShops: function(){
		var outputArray = new Array();
		var output = "";
		var buttonClass = "paybutton";
		
		//fragments available
		if(progress.shopsystem.gui.displayFragments){
		
			//golden turbo - G
			if(goldenTurbo){
				//display html
				output += "<div>";
					output += "<div id=\"goldenTurboButton\" class=\"goldenButton\" onClick=\"activateGoldenTurbo();\">(G) Golden Turbo - BONUS";
					output += "</div>";
				output += "</div>";
				output += "<div class=\"clearfix\"> </div>";
			}
		
			//get output from shops
			Object.keys(shopsystem.shops).forEach(
				function(key, index) {
					var element = shopsystem.shops[key];
					
					//shop is visible
					if(element.visible){
						outputArray[element.priority] = element.display();
					}
				}
			);
			
			//display in priority
			outputArray.forEach(
				function(key, index) {
					output += key;
				}
			);
		}
		
		document.getElementById("shops").innerHTML = output;
	},
	checkProgress: function(){
		Object.keys(shopsystem.shops).forEach(
			function(key, index) {
				var element = shopsystem.shops[key];
				
				//progress reached
				if(shopsystem.currentFragments >= element.pricing[0] && !element.visible){
					element.visible = true;
				}
			}
		);
	}
}

statistics.shopsystem = {
	fragmentsOverall: 0,
	updatesBought: 0
}

progress.shopsystem = {
	gui: {
		displayUpdatesStatistic: false,
		displayFragments: false
	}
}