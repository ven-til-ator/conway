var shopsystem = {
	currentFragments: 0,
	fragementsLastRound: 0,
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
			
			
			//fragment per rounds shop - 3
			if(displayFragmentMultiplicatorPerRoundsShop && fragmentPerRoundsShopIndex < fragmentPerRoundsShop.length){
				//check if button is payable
				if(shopsystem.currentFragments >= fragmentPerRoundsShop[fragmentPerRoundsShopIndex]){
					buttonClass = "paybutton-active";
				} else {
					buttonClass = "paybutton";
				}
			
				//display html
				output += "<div>";
					output += "<div id=\"payFragmentRoundMultiplicatorButton\" class=\""+ buttonClass +"\" onClick=\"updateFragmentMuliplicatorRounds();\">(3) Rounds Boost "+ (fragmentPerRoundsShopIndex+1) +" - "+ fragmentPerRoundsShop[fragmentPerRoundsShopIndex] +" <i class=\"fa fa-money\"></i>";
					output += "</div>";
				output += "</div>";
				output += "<div class=\"clearfix\"> </div>";
			}
			
			//fragment chance shop - 4
			if(displayFragmentChanceShop && fragmentChanceShopIndex < fragmentChanceShop.length){
				//check if button is payable
				if(shopsystem.currentFragments >= fragmentChanceShop[fragmentChanceShopIndex]){
					buttonClass = "paybutton-active";
				} else {
					buttonClass = "paybutton";
				}
			
				//display html
				output += "<div>";
					output += "<div id=\"payFragmentChanceButton\" class=\""+ buttonClass +"\" onClick=\"updateFragmentChance();\">(5) Fragment Chance "+ (fragmentChanceShopIndex+1) +" - "+ fragmentChanceShop[fragmentChanceShopIndex] +" <i class=\"fa fa-money\"></i>";
					output += "</div>";
				output += "</div>";
				output += "<div class=\"clearfix\"> </div>";
			}
			
			//fragment multiplicator shop - 5
			if(displayFragmentMultiplicatorShop && fragmentMultiplicatorShopIndex < fragmentMultiplicatorShop.length){
				//check if button is payable
				if(shopsystem.currentFragments >= fragmentMultiplicatorShop[fragmentMultiplicatorShopIndex]){
					buttonClass = "paybutton-active";
				} else {
					buttonClass = "paybutton";
				}
			
				//display html
				output += "<div>";
					output += "<div id=\"payFragmentMultiplicatorButton\" class=\""+ buttonClass +"\" onClick=\"updateFragmentMultiplicator();\">(4) Fragment Multiplicator "+ (fragmentMultiplicatorShopIndex+1) +" - "+ fragmentMultiplicatorShop[fragmentMultiplicatorShopIndex] +" <i class=\"fa fa-money\"></i>";
					output += "</div>";
				output += "</div>";
				output += "<div class=\"clearfix\"> </div>";
			}
		}
		
		document.getElementById("shops").innerHTML = output;
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