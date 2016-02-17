//default values
var intervalListener = null
var autoplayActive = false;
var globalActiveFields = new Array();
var firstRound = true;
var countRows = 12;
var countColumns = 12;
var ratio = 0;
var resetNeeded = false;
var manualReset = false;
var gridColorNotDefault = false;
var fragmentColor = "";
var fragmentDefaultColor = "black";

//timer
var infoMessageTimer = 0;

//data values
var lowestRatio = 0;
var highestRatio = 0;
var countActions = 0;
var countActiveFields = 0;
var gameCounter = 0;
var gameResets = 0;
var goldenTurbosUsed = 0;
var updatesBought = 0;
var highestActionCount = 0;
var fragments = 0;
var oldFragments = 0;
var lowestActionCount = 0;
var clicks = 0;
var autoSpeedValue = 600;
var autoSpeed = autoSpeedValue;
var fragmentBonus = 5;
var fragmentMultiplicator = 1;
var fragmentChance = 1000;
var fragmentMuliplicatorRounds = 205;
var goldenTurbo = false;
var goldenTurboChance = 3333;
var goldenTurboRounds = 0;
var goldenTurboSpeed = 25;
var goldenTurboBaseRound = 7;
var goldenTurboGridColor = "2px solid yellow";
var defaultGridColor = "1px solid black";

//shop systems
var gridShopIndex = 0;
var fragmentGridShop = new Array(
	10, 	//13
	25,	
	50,		//15
	75,	
	100,	//17	
	150,
	200,	//19
	300,
	400,	//21
	500,
	666,	//23
	700,
	800,	//25
	900,
	1001,	//27
	1337,
	1500,	//29
	2000,	//30
	2500,
	3700,	//32
	4900,
	6100,	//34
	8300,	
	10000,	//36
	13000,
	18000,	//38
	25000,
	30000	//40
);

var speedShopIndex = 0;
var fragmentSpeedShop = new Array(
	5,
	10,
	15,
	20,
	25,
	30,
	35,
	40,
	45,
	50,
	55,
	60,
	75,
	90,
	100,
	125,
	150,
	200,
	250,
	400,
	600,
	800,
	1000,
	1200,
	1400,
	1600,
	1800,
	2000
);
var fragmentSpeedBoost = 20;


//fragments rounds boost
var fragmentPerRoundsShopIndex = 0;
var fragmentPerRoundsShop = new Array(
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
);
var fragmentPerRoundsBoost = 5;


//fragment chance boost
var fragmentChanceShopIndex = 0;
var fragmentChanceShop = new Array(
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
);
var fragmentChanceBoost = 20;


//fragment multiplicator
var fragmentMultiplicatorShopIndex = 0;
var fragmentMultiplicatorShop = new Array(
	100,	//2
	250,
	500,	//4
	1000,
	2500,	//6
	5000,
	7500,	//8
	10000,
	15000	//10
);
var fragmentMultiplicatorBoost = 1;


//check values
var displayReset = false;
var displayAutoPlay = false;
var displayScoreboard = false;
var displayRounds = false;
var displayGameInfo = false;
var displayFragments = false;
var displayHistory = false;
var displaySpeedShop = false;
var displayGridShop = false;
var displayFragmentMultiplicatorShop = false;
var displayFragmentMultiplicatorPerRoundsShop = false;
var displayFragmentChanceShop = false;
var progressAutoReset = false;
var displayGoldenTurboStatistic = false;
var displayUpdatesStatistic = false;


//deactivate progress message
function hideProgressMessage(){
	document.getElementById("progressMessage").style.display = 'none';
}

//display progress message
function displayProgressMessage(message){
	document.getElementById("progressMessage").innerHTML = message;
	document.getElementById("progressMessage").style.display = 'block';
	
	setTimeout(hideProgressMessage, 2500);
}

//deactivate info message
function hideInfoMessage(){
	document.getElementById("infoMessage").style.display = 'none';
}

//display info message
function displayInfoMessage(message){
	document.getElementById("infoMessage").innerHTML = message;
	document.getElementById("infoMessage").style.display = 'block';
	
	infoMessageTimer = setTimeout(hideInfoMessage, 5000);
}

//autoplay interval
function autoplay(val) {
	if (val == "run") {
		autoplayActive = true;
		intervalListener = window.setInterval(generateFields, autoSpeed);
	} else {
		autoplayActive = false;
		window.clearInterval(intervalListener);
	}
}

//toggle autoplay
function toggleAutoplay() {
	if(!autoplayActive) {
		autoplay("run");
		document.getElementById("autoplay").className = "buttonActivated";
	} else {
		autoplay("stop");
		document.getElementById("autoplay").className = "buttonDeactivated";
	}
} 

//display scoreboard
function displayScoreboardGUI(){
	if(displayScoreboard){
		document.getElementById("max-games").innerHTML = gameCounter;
		document.getElementById("max-resets").innerHTML = gameResets;
		document.getElementById("min-ratio").innerHTML = lowestRatio;
		document.getElementById("max-ratio").innerHTML = highestRatio;
		document.getElementById("min-rounds").innerHTML = lowestActionCount;
		document.getElementById("max-rounds").innerHTML = highestActionCount;
		document.getElementById("min-rounds").innerHTML = lowestActionCount;
		document.getElementById("max-rounds").innerHTML = highestActionCount;
		if(displayFragments){
			document.getElementById("fragments").innerHTML = fragments;
		}
		if(displaySpeedShop){
			document.getElementById("autospeed").innerHTML = autoSpeed;
		}
		if(displayGridShop){
			document.getElementById("gridsize").innerHTML = countColumns+"x"+countRows;
		}
		if(displayFragmentMultiplicatorPerRoundsShop && fragmentPerRoundsShopIndex > 0){
			document.getElementById("fragmentperroundsboost").innerHTML = fragmentMuliplicatorRounds;
			document.getElementById("fragmentperrounds").innerHTML = fragmentMultiplicator + Math.floor(countActions/fragmentMuliplicatorRounds);
		}
		if(displayFragmentChanceShop){
			document.getElementById("fragmentchance").innerHTML = "1/"+ fragmentChance;
		}
		if(displayUpdatesStatistic){
			document.getElementById("updates").innerHTML = updatesBought;
		}
		if(displayGoldenTurboStatistic){
			document.getElementById("goldenturbos").innerHTML = goldenTurbosUsed;
		}
		
		//display shops if fragments have changed
		if(oldFragments != fragments){
			displayShops();
			oldFragments = fragments;
		}
	}
}

//display board
function generateFields(){
	if(resetNeeded) {
		if(autoplayActive){
			toggleAutoplay();
		}
		return false;
	} else {
		manualReset = false;
	}

	var countFields = countRows * countColumns;
	
	var currentValues = new Array();
	var nextValues = new Array();
	
	countActiveFields = 0;
	
	//check if very lucky player
	if((Math.random()*goldenTurboChance) < 2){
		goldenTurbo = true;
	}
	
	//count rounds for turbo down
	if(goldenTurboRounds > 1) {
		goldenTurboRounds--;
	} else if (goldenTurboRounds == 1){
		goldenTurboRounds--;
		
		//colorize grid
		document.getElementById("board").style.border = defaultGridColor;
		
		//set speed
		autoSpeed = autoSpeedValue;
		
		//activate speed
		toggleAutoplay();
		toggleAutoplay();
	}
	
	for(var i = 1; i <= countFields; i++){
	
		//leading zeros 003
		var counter = getInputFieldNumber(i);
		
	
		//get current value
		var fieldInput = document.getElementById("inputSquare" + counter);
		
		//add to array
		
		if(countActions != 0){
			currentValues.push(fieldInput.value);
		}else{
			//random first action
			currentValues.push(Math.round(Math.random()));
		}
	}
	
	
	
	//manipulating data

	for(var i = 0; i < countRows; i++){
	
		for(var j = 1; j <= countColumns; j++){
		
			//current Field
			var fieldNumber = j + (i * countRows);
			
			var additionalDiv = "";
			
			//check alive cells around
			
			var countAliveNeighbours = 0;
			var	newValue = 0;
			
			
			//check if there are three alive cells around
			
			//start with left column
			if(i > 0){
				if(j > 1){
					//top
					var checkFieldNumber = fieldNumber - countColumns - 1;
					if(currentValues[checkFieldNumber - 1] == 1){
						countAliveNeighbours++;
					}	
				}
				
				
				//middle
				var checkFieldNumber = fieldNumber - 1;
				if(currentValues[checkFieldNumber - 1] == 1){
					countAliveNeighbours++;
				}
				
				
				if(i < (countRows - 1)){
					//bottom
					var checkFieldNumber = fieldNumber + countColumns - 1;
					if(currentValues[checkFieldNumber - 1] == 1){
						countAliveNeighbours++;
					}
				}					
			}
			
			//middle column
			if(j > 1){
				//top
				var checkFieldNumber = fieldNumber - countColumns;
				if(currentValues[checkFieldNumber - 1] == 1){
					countAliveNeighbours++;
				}
			}
			
			
			if(i < (countRows - 1)){
				//bottom
				var checkFieldNumber = fieldNumber + countColumns;
				if(currentValues[checkFieldNumber - 1] == 1){
					countAliveNeighbours++;
				}
			}
			
			
			//right column
			if(i < countColumns){
				if(j > 1){
					//top
					var checkFieldNumber = fieldNumber - countColumns + 1;
					if(currentValues[checkFieldNumber - 1] == 1){
						countAliveNeighbours++;
					}
				}
				
				
				//middle
				var checkFieldNumber = fieldNumber + 1;
				if(currentValues[checkFieldNumber - 1] == 1){
					countAliveNeighbours++;
				}
				
				if(i < (countRows - 1)){
					//bottom
					var checkFieldNumber = fieldNumber + countColumns + 1;
					if(currentValues[checkFieldNumber - 1] == 1){
						countAliveNeighbours++;
					}
				}
			}
			
			
			//RULES TO BE ALIVE:
			
			//dead: exactly three alive neighbours
			//alive: two or three alive neighbours
			if((currentValues[fieldNumber - 1] == 0 && countAliveNeighbours == 3) || (currentValues[fieldNumber - 1] == 1 && (countAliveNeighbours == 2 || countAliveNeighbours == 3))){
				newValue = 1;
				var style = "";
				
				if(displayFragments && (Math.random()*fragmentChance) < 2){
					fragmentColor = 'rgb(' + (Math.floor(Math.random() * 255)) + ','
									 + (Math.floor(Math.random() * 255)) + ','
									 + (Math.floor(Math.random() * 255)) + ')';
									 
					style = " style=\"background-color: "+ fragmentColor +";\" ";
					
					var tempFragmentMultiplicator = fragmentMultiplicator;
					if(displayFragmentMultiplicatorPerRoundsShop && fragmentPerRoundsShopIndex > 0){
						tempFragmentMultiplicator = fragmentMultiplicator + Math.floor(countActions/fragmentMuliplicatorRounds);
						
						//multiplicator is active
						if(countActions >= fragmentMuliplicatorRounds){
							//change color of grid
							var boardSquareList = document.querySelectorAll(".square");
 
							for (var i = 0; i < boardSquareList.length; i++) {
								boardSquareList[i].style.border = "1px solid "+fragmentColor;
							}
							
							gridColorNotDefault = true;
						} else if(gridColorNotDefault) {
							//change color of grid
							var boardSquareList = document.querySelectorAll(".square");
 
							for (var i = 0; i < boardSquareList.length; i++) {
								boardSquareList[i].style.border = "1px solid "+fragmentDefaultColor;
							}
							
							gridColorNotDefault = false;
						}
					}
					
					fragments += 1 * tempFragmentMultiplicator;
					displayScoreboardGUI();
					document.getElementById("money-icon").style.color = fragmentColor;
				}
				
				additionalDiv = "<div class=\"black\" "+ style +"></div>";
			}	
			
			//first action -> return random to check
			if(countActions == 0){
				if(currentValues[fieldNumber] == 1){
					newValue = 1;
					additionalDiv = "<div class=\"black\"></div>";
				}else{
					newValue = 0;
					additionalDiv = "";
				}
			}
			if(newValue == 1){
				countActiveFields++;
			}
			
			nextValues.push(newValue);
			
		
			var fieldElement = document.getElementById("square" + getInputFieldNumber(fieldNumber));
			fieldElement.innerHTML = "<input type=\"hidden\" id=\"inputSquare" + getInputFieldNumber(fieldNumber) + "\" value=" + newValue + " />" + additionalDiv;
		}
	}
	
	if(globalActiveFields.length == 7){
		globalActiveFields.shift();
	}
	globalActiveFields.push(currentValues.toString());
	
	countActions++;
	clicks++;
	document.getElementById("action-counter").innerHTML = "Round: " + countActions;
	ratio = roundNumber(countActiveFields / (countRows * countColumns) * 100, 2);
	document.getElementById("active-fields-counter").innerHTML = "Fields alive: " + countActiveFields + " / " + countRows * countColumns + " | ratio: " + getRatioHtml(ratio, "none");
	
	//check progress
	checkProgress();
	
	if(countActiveFields == 0){
		resetNeeded = true;
		document.getElementById("reset").className = "button-reset-focused";
		
		if(progressAutoReset){
			resetGame(true)
		} else {
			document.getElementById("reset").className = "button-reset-focused";
			displayInfoMessage("No lives left, please reset game.");
		}
	} 
	//infinite loop
	else if(globalActiveFields[0] == globalActiveFields[1] || globalActiveFields[0] == globalActiveFields[2] || globalActiveFields[0] == globalActiveFields[6] || globalActiveFields[0] == globalActiveFields[3]){
		resetNeeded = true;
		
		if(progressAutoReset){
			resetGame(true)
		} else {
			document.getElementById("reset").className = "button-reset-focused";
			displayInfoMessage("Infinite loop, please reset game.");
		}
	}
	
	displayScoreboardGUI();
	return true;
}

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
		console.log("Reset Button Unlocked!");
		displayProgressMessage("Reset Button Unlocked!");
	}
	
	//display rounds after 10 click
	if(clicks >= 10 && !displayRounds){
		displayRounds = true;
		console.log("Rounds Unlocked!");
		displayProgressMessage("Rounds Unlocked!");
	}
	
	//display game info after 25 click
	if(clicks >= 25 && !displayGameInfo){
		displayGameInfo = true;
		console.log("Game Info Unlocked!");
		displayProgressMessage("Game Info Unlocked!");
	}
	
	//display auto play after 50 click
	if(clicks >= 50 && !displayAutoPlay){
		displayAutoPlay = true;
		console.log("Autoplay Unlocked!");
		displayProgressMessage("Autoplay Unlocked!");
	}
	
	//activate auto reset after 3 resets
	if(gameResets >= 3 && !progressAutoReset){
		progressAutoReset = true;
		console.log("Auto Reset Unlocked!");
		displayProgressMessage("Auto Reset Unlocked!");
	}
	
	//display history
	if(gameCounter >= 3 && !displayHistory){
		displayHistory = true;
		console.log("History Unlocked!");
		displayProgressMessage("History Unlocked!");
	}
	
	//display highscores
	if(gameCounter >= 6 && !displayScoreboard){
		displayScoreboard = true;
		console.log("Scoreboard Unlocked!");
		displayProgressMessage("Scoreboard Unlocked!");
	}
	
	//display fragments
	if(gameCounter >= 9 && !displayFragments){
		displayFragments = true;
		console.log("Fragments Unlocked!");
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

//get ratio color
function getRatioHtml(ratio, type){
	var ratioText = "";
	
	if (type == "low") {
		ratioText = "<span style=\"color: indianred;font-weight:bold;\">" + ratio + "%</span>";
	} else if (type == "high") {
		ratioText = "<span style=\"color: \#90EE90;font-weight:bold;\">" + ratio + "%</span>";
	} else {
		if (ratio < 10){
			ratioText = "<span style=\"color: indianred;font-weight:bold;\">" + ratio + "%</span>";
		}else{
			ratioText = ratio + "%";
		}
	}
	
	return ratioText;
}

function getInputFieldNumber(number){
	var output = "";
	//leading zeros 003
	if(number < 10){
		output = "00" + number;
	}else if(number < 100){
		output = "0" + number;
	}else{
		output = number;
	}

	return output;
}

//display grid
function buildGrid(numberOfInputs){
	var output = "";
	
	for(var i = 1; i <= numberOfInputs; i++){
		var fieldNumber = getInputFieldNumber(i);
		output += "\n<div id=\"square" + fieldNumber + "\" class=\"square\"><input type=\"hidden\" id=\"inputSquare" + fieldNumber + "\" value=0 /></div>";
	}
	
	return output;
}

function roundNumber(rnum, rlength) {
  var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
  return parseFloat(newnumber);
}

//reset the game and store highscores
function resetGame(automatic){
	resetNeeded = false;
	globalActiveFields = new Array();

	var ratioText = "";
	ratioText = ratio + "%";
	
	var countActionsText = countActions;
	
	//scores only with automatic reset (no cheating)
	if(automatic){
		//first round => set all statistics
		if(firstRound == true){
			firstRound = false;
			gameCounter++;
		} else if(countActions > 1){
			if (lowestRatio == 0 && highestRatio == 0) {
				lowestRatio = ratio;
				highestRatio = ratio;
			} 
			
			if (ratio < lowestRatio) {
				lowestRatio = ratio;
				ratioText = getRatioHtml(ratio, "low");
			}
			
			if(ratio > highestRatio){
				highestRatio = ratio;
				ratioText = getRatioHtml(ratio, "high");
			}
			
			if (highestActionCount == 0 && lowestActionCount == 0) {
				highestActionCount = countActions;
				lowestActionCount = countActions;
			} else if (countActions > highestActionCount) {
				highestActionCount = countActions;
				countActionsText = "<span style=\"color: \#90EE90; font-weight:bold;\">"+ countActions +"</span>"
			} else if(countActions < lowestActionCount){
				lowestActionCount = countActions;
				countActionsText = "<span style=\"color: indianred; font-weight:bold;\">"+ countActions +"</span>"
			}
		}
	}
		
	var message = "<div class=\"round\">Round "+ countActionsText +"</div><div class=\"fields\"><div class=\"square\"></div><div class=\"text\">"+ countActiveFields +"</div></div><div class=\"ratio\">"+ ratioText +"</div>";
	
	//bonus fragments
	if(displayFragments && ratio == 0){
		//calculate fragment multiplicator aswell
		var tempFragmentMultiplicator = fragmentMultiplicator;
		if(displayFragmentMultiplicatorPerRoundsShop && fragmentPerRoundsShopIndex > 0){
			tempFragmentMultiplicator = fragmentMultiplicator + Math.floor(countActions/fragmentMuliplicatorRounds);
		}
		
		message += "<div class=\"fragmentBonus\">"+ ((fragmentBonus * (gridShopIndex + 1)) * tempFragmentMultiplicator) +" <i class=\"fa fa-money\"></i></div>";
		fragments += (fragmentBonus * (gridShopIndex + 1)) * tempFragmentMultiplicator;
	}
	
	if(automatic == false){
		message = message + "<div class=\"message\">Manual reset!</div>";
		manualReset = true;
	}
	
	message = message + "<div style=\"clear: both;\"></div>";
	
	//display history
	if(gameResets != 0){
		document.getElementById('history').innerHTML = message + document.getElementById('history').innerHTML;
	}
	
	//game not manually boosted
	if(manualReset){
		gameResets++;
	} else {
		gameCounter++;
	}

	//display grid
	document.getElementById('board').setAttribute("style","width: "+ countColumns*20 +"px; height: "+ countRows*20 +"px");
	document.getElementById('board').innerHTML = buildGrid(countRows * countColumns);
	countActions = 0;
	
	//change reset button
	document.getElementById("reset").className = "button-reset";
	
	//hide info message
	hideInfoMessage();
	clearTimeout(infoMessageTimer);
	
	//display scoreboard
	displayScoreboardGUI();
}

//reset game statistics
function resetStatistics(){
	//firstRound = true;
	lowestRatio = 0;
	highestRatio = 0;
	highestActionCount = 0;
	lowestActionCount = 0;
	
	//reset history
	document.getElementById('history').innerHTML = "";
}

//update fragmentChance
function updateFragmentChance(){
	//shop available
	if(displayFragmentChanceShop){
		//enough money
		if(fragments >= fragmentChanceShop[fragmentChanceShopIndex]){
			//pay
			fragments = fragments - fragmentChanceShop[fragmentChanceShopIndex];
			fragmentChanceShopIndex++;
			
			//adjust fragment chance
			fragmentChance -= fragmentChanceBoost;
		
			displayProgressMessage("Fragment Chance "+ fragmentChanceShopIndex +" Unlocked!");
			document.getElementById("fragmentchance-text").style.display = 'block';
			document.getElementById("fragmentchance").style.display = 'block';
			
			updatesBought++;
		}
	}
	
	displayScoreboardGUI();
}

//update fragmentMuliplicatorRounds
function updateFragmentMuliplicatorRounds(){
	//shop available
	if(displayFragmentMultiplicatorPerRoundsShop){
		//enough money
		if(fragments >= fragmentPerRoundsShop[fragmentPerRoundsShopIndex]){
			//pay
			fragments = fragments - fragmentPerRoundsShop[fragmentPerRoundsShopIndex];
			fragmentPerRoundsShopIndex++;
			
			//adjust fragment rounds multiplicator
			fragmentMuliplicatorRounds -= fragmentPerRoundsBoost;
		
			displayProgressMessage("Fragment Rounds Multiplicator "+ fragmentPerRoundsShopIndex +" Unlocked!");
			document.getElementById("fragmentperrounds-text").style.display = 'block';
			document.getElementById("fragmentperrounds").style.display = 'block';
			
			document.getElementById("fragmentperroundsboost-text").style.display = 'block';
			document.getElementById("fragmentperroundsboost").style.display = 'block';
			
			updatesBought++;
		}
	}
	
	displayScoreboardGUI();
}

//update speed
function updateSpeed(){
	//speed shop available
	if(displayFragments){
		//enough money
		if(fragments >= fragmentSpeedShop[speedShopIndex]){
			//pay
			fragments = fragments - fragmentSpeedShop[speedShopIndex];
			speedShopIndex++;
			
			//adjust autoSpeed
			autoSpeedValue = autoSpeedValue - fragmentSpeedBoost;
			if(autoSpeedValue < 50){
				autoSpeedValue = 50;
			}
			
			autoSpeed = autoSpeedValue;
			
			//restart  timer
			toggleAutoplay();
			toggleAutoplay();
		
			displayProgressMessage("Speedboost "+ speedShopIndex +" Unlocked!");
			document.getElementById("autospeed-text").style.display = 'block';
			document.getElementById("autospeed").style.display = 'block';
			
			updatesBought++;
		}
	}
	
	displayScoreboardGUI();
}

//update grid size with fragments
function updateGrid(){
	//gridshop is activated
	if(displayGridShop){
		//enough money
		if(fragments >= fragmentGridShop[gridShopIndex]){
			//pay
			fragments = fragments - fragmentGridShop[gridShopIndex];
			gridShopIndex++;
			
			//update grid
			countRows++;
			countColumns++;
			
			//reset game values
			resetGame();
			resetStatistics();
			
			displayProgressMessage("Extend Grid "+ gridShopIndex +" Unlocked (Statistics Reset)!");
			document.getElementById("gridsize-text").style.display = 'block';
			document.getElementById("gridsize").style.display = 'block';
			
			updatesBought++;
		}
	}
	
	displayScoreboardGUI();
}

//update fragment multiplicator with fragments
function updateFragmentMultiplicator(){
	//shop is activated
	if(displayFragmentMultiplicatorShop){
		//enough money
		if(fragments >= fragmentMultiplicatorShop[fragmentMultiplicatorShopIndex]){
			//pay
			fragments = fragments - fragmentMultiplicatorShop[fragmentMultiplicatorShopIndex];
			fragmentMultiplicatorShopIndex++;
			
			fragmentMultiplicator += fragmentMultiplicatorBoost;
			
			displayProgressMessage("Fragment Multiplicator "+ fragmentMultiplicatorShopIndex +" Unlocked!");
			
			updatesBought++;
		}
	}
	
	displayScoreboardGUI();
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
		if(autoplayActive){
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

//keyboard usage
function checkKey(e) {
    var event = window.event ? window.event : e;
    console.log(event.keyCode)
	
	//next round
	if(event.keyCode == 13 || event.keyCode == 78){
		generateFields();
	}
	
	//reset
	if(event.keyCode == 82){
		if(displayReset == true){
			resetGame(false);
		}
	}
	
	//autoplay
	if(event.keyCode == 65){
		if(displayAutoPlay == true){
			toggleAutoplay();
		}
	}
	
	//golden turbo
	if(event.keyCode == 71){
		activateGoldenTurbo();
	}
	
	//SHOPS
	if(event.keyCode == 49){
		//speed
		updateSpeed();
	} else if(event.keyCode == 50){
		//grid
		updateGrid();
	} else if(event.keyCode == 51){
		//fragment multiplicator rounds
		updateFragmentMuliplicatorRounds()
	} else if(event.keyCode == 52){
		//fragment chance
		updateFragmentChance();
	} else if(event.keyCode == 53){
		//fragment multiplicator
		updateFragmentMultiplicator();
	} else if(event.keyCode == 54){
		
	} else if(event.keyCode == 55){
		
	} else if(event.keyCode == 56){
		
	} else if(event.keyCode == 57){
		
	} else if(event.keyCode == 48){
		
	}
	
}
