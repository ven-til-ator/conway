var shopsystem = {
	currentFragments: 0,
	fragementsLastRound: 0,
	fragementBonusEmptyGrid: 5
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


//display all shops that are active
function displayShops(){
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
	
		//speedshop - 1
		if(displaySpeedShop && speedShopIndex < fragmentSpeedShop.length){
			//check if button is payable
			if(shopsystem.currentFragments >= fragmentSpeedShop[speedShopIndex]){
				buttonClass = "paybutton-active";
			} else {
				buttonClass = "paybutton";
			}
		
			//display html
			output += "<div>";
				output += "<div id=\"paySpeedButton\" class=\""+ buttonClass +"\" onClick=\"updateSpeed();\">(1) Speed Boost "+ (speedShopIndex+1) +" - "+ fragmentSpeedShop[speedShopIndex] +" <i class=\"fa fa-money\"></i>";
				output += "</div>";
			output += "</div>";
			output += "<div class=\"clearfix\"> </div>";
		}
		
		//gridshop - 2
		if(displayGridShop && gridShopIndex < fragmentGridShop.length){
			//check if button is payable
			if(shopsystem.currentFragments >= fragmentGridShop[gridShopIndex]){
				buttonClass = "paybutton-active";
			} else {
				buttonClass = "paybutton";
			}
		
			//display html
			output += "<div>";
				output += "<div id=\"payGridButton\" class=\""+ buttonClass +"\" onClick=\"updateGrid();\">(2) Extend Grid "+ (gridShopIndex+1) +" - "+ fragmentGridShop[gridShopIndex] +" <i class=\"fa fa-money\"></i>";
				output += "</div>";
			output += "</div>";
			output += "<div class=\"clearfix\"> </div>";
		}
		
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