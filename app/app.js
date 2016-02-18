//default values
var gridColorNotDefault = false;
var fragmentColor = "";
var fragmentDefaultColor = "black";

//data values
var goldenTurbosUsed = 0;
var updatesBought = 0;
var fragments = 0;
var oldFragments = 0;
var clicks = 0;
var fragmentBonus = 5;
var goldenTurbo = false;
var goldenTurboChance = 3333;
var goldenTurboRounds = 0;
var goldenTurboSpeed = 25;
var goldenTurboBaseRound = 7;
var goldenTurboGridColor = "2px solid yellow";
var defaultGridColor = "1px solid black";

//check values
var displayReset = false;
var displayAutoPlay = false;
var displayScoreboard = false;
var displayRounds = false;
var displayGameInfo = false;
var displayFragments = false;
var displayHistory = false;
var progressAutoReset = false;
var displayGoldenTurboStatistic = false;
var displayUpdatesStatistic = false;

//display all shops that are active
function displayShops(){
	var output = "";
	var buttonClass = "paybutton";
	
	//fragments available
	if(displayFragments){
	
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
			if(fragments >= fragmentSpeedShop[speedShopIndex]){
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
			if(fragments >= fragmentGridShop[gridShopIndex]){
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
			if(fragments >= fragmentPerRoundsShop[fragmentPerRoundsShopIndex]){
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
			if(fragments >= fragmentChanceShop[fragmentChanceShopIndex]){
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
			if(fragments >= fragmentMultiplicatorShop[fragmentMultiplicatorShopIndex]){
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

//check progress
function checkProgress(){
	//display reset after 1 click
	if(clicks >= 1 && !displayReset){
		displayReset = true;
		//console.log("Reset Button Unlocked!");
		displayProgressMessage("Reset Button Unlocked!");
	}
	
	//display rounds after 10 click
	if(clicks >= 10 && !displayRounds){
		displayRounds = true;
		//console.log("Rounds Unlocked!");
		displayProgressMessage("Rounds Unlocked!");
	}
	
	//display game info after 25 click
	if(clicks >= 25 && !displayGameInfo){
		displayGameInfo = true;
		//console.log("Game Info Unlocked!");
		displayProgressMessage("Game Info Unlocked!");
	}
	
	//display auto play after 50 click
	if(clicks >= 50 && !displayAutoPlay){
		displayAutoPlay = true;
		//console.log("Autoplay Unlocked!");
		displayProgressMessage("Autoplay Unlocked!");
	}
	
	//activate auto reset after 3 resets
	if(statistics.game.gamesResetManually >= 3 && !progressAutoReset){
		progressAutoReset = true;
		//console.log("Auto Reset Unlocked!");
		displayProgressMessage("Auto Reset Unlocked!");
	}
	
	//display history
	if(statistics.game.gamesResetAutomatically >= 3 && !displayHistory){
		displayHistory = true;
		//console.log("History Unlocked!");
		displayProgressMessage("History Unlocked!");
	}
	
	//display highscores
	if(statistics.game.gamesResetAutomatically >= 6 && !displayScoreboard){
		displayScoreboard = true;
		//console.log("Scoreboard Unlocked!");
		displayProgressMessage("Scoreboard Unlocked!");
	}
	
	//display fragments
	if(statistics.game.gamesResetAutomatically >= 9 && !displayFragments){
		displayFragments = true;
		//console.log("Fragments Unlocked!");
		displayProgressMessage("Fragments Unlocked!");
	}
	
	//display speedShop
	if(fragments >= fragmentSpeedShop[0] && !displaySpeedShop){
		displaySpeedShop = true;
	}
	
	//display gridShop
	if(fragments >= fragmentGridShop[0] && !displayGridShop){
		displayGridShop = true;
	}
	
	//display fragmentChanceShop
	if(fragments >= fragmentChanceShop[0] && !displayFragmentChanceShop){
		displayFragmentChanceShop = true;
	}
	
	//display fragmentPerRoundsShop
	if(fragments >= fragmentPerRoundsShop[0] && !displayFragmentMultiplicatorPerRoundsShop){
		displayFragmentMultiplicatorPerRoundsShop = true;
	}
	
	//display fragment multiplicator
	if(fragments >= fragmentMultiplicatorShop[0] && !displayFragmentMultiplicatorShop){
		displayFragmentMultiplicatorShop = true;
	}
	
	//updates counter
	if(updatesBought > 0 && !displayUpdatesStatistic){
		displayUpdatesStatistic = true;
	}
	
	
	//display functionalities
	if(displayReset){
		document.getElementById("reset").style.display = 'inline-block';
	}
	
	if(displayRounds){
		document.getElementById("action-counter").style.display = 'block';
	}
	
	if(displayGameInfo){
		document.getElementById("active-fields-counter").style.display = 'block';
	}
	
	if(displayAutoPlay){
		document.getElementById("autoplay").style.display = 'inline-block';
	}
	
	if(displayScoreboard){
		document.getElementById("highscores").style.display = 'block';
	}
	
	if(displayHistory){
		document.getElementById("history").style.display = 'block';
	}
	
	if(displayFragments){
		//fragments counter
		document.getElementById("fragments-text").style.display = 'block';
		document.getElementById("fragments").style.display = 'block';
	}
	
	if(displayGoldenTurboStatistic){
		document.getElementById("goldenturbos-text").style.display = 'block';
		document.getElementById("goldenturbos").style.display = 'block';
	}
	
	if(displayUpdatesStatistic){
		document.getElementById("updates-text").style.display = 'block';
		document.getElementById("updates").style.display = 'block';
	}
}

//activate the turbo mode
function activateGoldenTurbo(){
	if(goldenTurbo == true){
		goldenTurboRounds = goldenTurboBaseRound * (1+gridShopIndex);
		goldenTurbo = false;
		
		//colorize grid
		document.getElementById("board").style.border = goldenTurboGridColor;
		
		//set turbo
		autoSpeed = goldenTurboSpeed;
		
		//restart  timer
		if(engine.autoplayActive){
			toggleAutoplay();
			toggleAutoplay();
		} else {
			autoplay("run");
			document.getElementById("autoplay").className = "buttonActivated";
		}
		
		goldenTurbosUsed++;
		displayGoldenTurboStatistic = true;
		
		//display Scoreboard
		displayShops();
	}
}
