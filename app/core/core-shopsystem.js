var shopsystem = {
	//main values of the shopsystem
	values: {
		currentFragments: 0,
		fragementsLastGeneration: 0,
		fragementBonusEmptyGrid: 5,
		fragmentsPerGeneration: 1
	},
	shops: new Array(),
	//buy the specified shop
	buy: function(shopname){
		shopsystem.shops[shopname].update();
	},
	//get the fragment count for the current generation or empty grid
	getFragmentsPerGeneration: function(emptyGrid){
		//emptygrid bonus
		if(emptyGrid){
			return shopsystem.values.fragementBonusEmptyGrid * 
					(shopsystem.values.fragmentsPerGeneration 
						+ shopsystem.shops['multiplicator'].values.fragmentMultiplicator
						+ shopsystem.shops['generationbonus'].getBonusAmount());
		} 
		//normal fragment
		else {	
			return (shopsystem.values.fragmentsPerGeneration 
						+ shopsystem.shops['multiplicator'].values.fragmentMultiplicator
						+ shopsystem.shops['generationbonus'].getBonusAmount());
		}
	},
	//display all shop buttons
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
	//check progress of the shops
	checkProgress: function(){
		Object.keys(shopsystem.shops).forEach(
			function(key, index) {
				var element = shopsystem.shops[key];
				
				//progress reached
				if(shopsystem.values.currentFragments >= element.pricing[0] && !element.visible){
					element.visible = true;
				}
			}
		);
	}
}

//statistics
statistics.shopsystem = {
	fragmentsOverall: 0,
	updatesBought: 0
}

//progress
progress.shopsystem = {
	gui: {
		displayUpdatesStatistic: false,
		displayFragments: false
	}
}