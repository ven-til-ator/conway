//autoplay interval
function autoplay(val) {
	if (val == "run") {
		engine.autoplayActive = true;
		engine.autoplayTimer = window.setInterval(generateFields, autoSpeed);
	} else {
		engine.autoplayActive = false;
		window.clearInterval(engine.autoplayTimer);
	}
}

//toggle autoplay
function toggleAutoplay() {
	if(!engine.autoplayActive) {
		autoplay("run");
		document.getElementById("autoplay").className = "buttonActivated";
	} else {
		autoplay("stop");
		document.getElementById("autoplay").className = "buttonDeactivated";
	}
} 

//display board
function generateFields(){
	if(engine.resetNeeded) {
		if(engine.autoplayActive){
			toggleAutoplay();
		}
		return false;
	} else {
		engine.manualReset = false;
	}

	var countFields = engine.gridRows * engine.gridColumns;
	
	var currentValues = new Array();
	var nextValues = new Array();
	
	statistics.game.currentActiveFields = 0;
	
	//check if very lucky player
	if((Math.random()*goldenTurboChance) < 2){
		goldenTurbo = true;
	}
	
	//count rounds for turbo down
	if(goldenTurboRounds > 1) {
		goldenTurboRounds--;
		
		//after reset colorize again
		if(statistics.game.currentRounds == 0){
			//colorize grid
			document.getElementById("board").style.border = goldenTurboGridColor;
		}
		
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
		
		if(statistics.game.currentRounds != 0){
			currentValues.push(fieldInput.value);
		}else{
			//random first action
			currentValues.push(Math.round(Math.random()));
		}
	}
	
	
	
	//manipulating data

	for(var i = 0; i < engine.gridRows; i++){
	
		for(var j = 1; j <= engine.gridColumns; j++){
		
			//current Field
			var fieldNumber = j + (i * engine.gridRows);
			
			var additionalDiv = "";
			
			//check alive cells around
			
			var countAliveNeighbours = 0;
			var	newValue = 0;
			
			
			//check if there are three alive cells around
			
			//start with left column
			if(i > 0){
				if(j > 1){
					//top
					var checkFieldNumber = fieldNumber - engine.gridColumns - 1;
					if(currentValues[checkFieldNumber - 1] == 1){
						countAliveNeighbours++;
					}	
				}
				
				
				//middle
				var checkFieldNumber = fieldNumber - 1;
				if(currentValues[checkFieldNumber - 1] == 1){
					countAliveNeighbours++;
				}
				
				
				if(i < (engine.gridRows - 1)){
					//bottom
					var checkFieldNumber = fieldNumber + engine.gridColumns - 1;
					if(currentValues[checkFieldNumber - 1] == 1){
						countAliveNeighbours++;
					}
				}					
			}
			
			//middle column
			if(j > 1){
				//top
				var checkFieldNumber = fieldNumber - engine.gridColumns;
				if(currentValues[checkFieldNumber - 1] == 1){
					countAliveNeighbours++;
				}
			}
			
			
			if(i < (engine.gridRows - 1)){
				//bottom
				var checkFieldNumber = fieldNumber + engine.gridColumns;
				if(currentValues[checkFieldNumber - 1] == 1){
					countAliveNeighbours++;
				}
			}
			
			
			//right column
			if(i < engine.gridColumns){
				if(j > 1){
					//top
					var checkFieldNumber = fieldNumber - engine.gridColumns + 1;
					if(currentValues[checkFieldNumber - 1] == 1){
						countAliveNeighbours++;
					}
				}
				
				
				//middle
				var checkFieldNumber = fieldNumber + 1;
				if(currentValues[checkFieldNumber - 1] == 1){
					countAliveNeighbours++;
				}
				
				if(i < (engine.gridRows - 1)){
					//bottom
					var checkFieldNumber = fieldNumber + engine.gridColumns + 1;
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
						tempFragmentMultiplicator = fragmentMultiplicator + Math.floor(statistics.game.currentRounds/fragmentMuliplicatorRounds);
						
						//multiplicator is active
						if(statistics.game.currentRounds >= fragmentMuliplicatorRounds){
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
			if(statistics.game.currentRounds == 0){
				if(currentValues[fieldNumber] == 1){
					newValue = 1;
					additionalDiv = "<div class=\"black\"></div>";
				}else{
					newValue = 0;
					additionalDiv = "";
				}
			}
			if(newValue == 1){
				statistics.game.currentActiveFields++;
			}
			
			nextValues.push(newValue);
			
		
			var fieldElement = document.getElementById("square" + getInputFieldNumber(fieldNumber));
			fieldElement.innerHTML = "<input type=\"hidden\" id=\"inputSquare" + getInputFieldNumber(fieldNumber) + "\" value=" + newValue + " />" + additionalDiv;
		}
	}
	
	if(engine.gridHistory.length == 7){
		engine.gridHistory.shift();
	}
	engine.gridHistory.push(currentValues.toString());
	
	statistics.game.currentRounds++;
	clicks++;
	document.getElementById("action-counter").innerHTML = "Round: " + statistics.game.currentRounds;
	statistics.game.currentRatio = roundNumber(statistics.game.currentActiveFields / (engine.gridRows * engine.gridColumns) * 100, 2);
	document.getElementById("active-fields-counter").innerHTML = "Fields alive: " + statistics.game.currentActiveFields + " / " + engine.gridRows * engine.gridColumns + " | ratio: " + getRatioHtml(statistics.game.currentRatio, "none");
	
	//check progress
	checkProgress();
	
	if(statistics.game.currentActiveFields == 0){
		engine.resetNeeded = true;
		document.getElementById("reset").className = "button-reset-focused";
		
		if(progressAutoReset){
			resetGame(true)
		} else {
			document.getElementById("reset").className = "button-reset-focused";
			displayInfoMessage("No lives left, please reset game.");
		}
	} 
	//infinite loop
	else if(engine.gridHistory[0] == engine.gridHistory[1] || engine.gridHistory[0] == engine.gridHistory[2] || engine.gridHistory[0] == engine.gridHistory[6] || engine.gridHistory[0] == engine.gridHistory[3]){
		engine.resetNeeded = true;
		
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
	engine.resetNeeded = false;
	engine.gridHistory = new Array();

	var ratioText = "";
	ratioText = statistics.game.currentRatio + "%";
	
	var countActionsText = statistics.game.currentRounds;
	
	//scores only with automatic reset (no cheating)
	if(automatic){
		//first round => set all statistics
		if(engine.firstRound == true){
			engine.firstRound = false;
			statistics.game.gamesResetAutomatically++;
		} else if(statistics.game.currentRounds > 1){
			if (statistics.game.lowestRatio == 0 && statistics.game.highestRatio == 0) {
				statistics.game.lowestRatio = statistics.game.currentRatio;
				statistics.game.highestRatio = statistics.game.currentRatio;
			} 
			
			if (statistics.game.currentRatio < statistics.game.lowestRatio) {
				statistics.game.lowestRatio = statistics.game.currentRatio;
				ratioText = getRatioHtml(statistics.game.currentRatio, "low");
			}
			
			if(statistics.game.currentRatio > statistics.game.highestRatio){
				statistics.game.highestRatio = statistics.game.currentRatio;
				ratioText = getRatioHtml(statistics.game.currentRatio, "high");
			}
			
			if (statistics.game.highestRound == 0 && statistics.game.lowestRound == 0) {
				statistics.game.highestRound = statistics.game.currentRounds;
				statistics.game.lowestRound = statistics.game.currentRounds;
			} else if (statistics.game.currentRounds > statistics.game.highestRound) {
				statistics.game.highestRound = statistics.game.currentRounds;
				countActionsText = "<span style=\"color: \#90EE90; font-weight:bold;\">"+ statistics.game.currentRounds +"</span>"
			} else if(statistics.game.currentRounds < statistics.game.lowestRound){
				statistics.game.lowestRound = statistics.game.currentRounds;
				countActionsText = "<span style=\"color: indianred; font-weight:bold;\">"+ statistics.game.currentRounds +"</span>"
			}
		}
	}
		
	var message = "<div class=\"round\">Round "+ countActionsText +"</div><div class=\"fields\"><div class=\"square\"></div><div class=\"text\">"+ statistics.game.currentActiveFields +"</div></div><div class=\"ratio\">"+ ratioText +"</div>";
	
	//bonus fragments
	if(displayFragments && statistics.game.currentRatio == 0){
		//calculate fragment multiplicator aswell
		var tempFragmentMultiplicator = fragmentMultiplicator;
		if(displayFragmentMultiplicatorPerRoundsShop && fragmentPerRoundsShopIndex > 0){
			tempFragmentMultiplicator = fragmentMultiplicator + Math.floor(statistics.game.currentRounds/fragmentMuliplicatorRounds);
		}
		
		message += "<div class=\"fragmentBonus\">"+ ((fragmentBonus * (gridShopIndex + 1)) * tempFragmentMultiplicator) +" <i class=\"fa fa-money\"></i></div>";
		fragments += (fragmentBonus * (gridShopIndex + 1)) * tempFragmentMultiplicator;
	}
	
	if(automatic == false){
		message = message + "<div class=\"message\">Manual reset!</div>";
		engine.manualReset = true;
	}
	
	message = message + "<div style=\"clear: both;\"></div>";
	
	//display history
	if(statistics.game.gamesResetManually != 0){
		document.getElementById('history').innerHTML = message + document.getElementById('history').innerHTML;
	}
	
	//game not manually boosted
	if(engine.manualReset){
		statistics.game.gamesResetManually++;
	} else {
		statistics.game.gamesResetAutomatically++;
	}

	//display grid
	document.getElementById('board').setAttribute("style","width: "+ engine.gridColumns*20 +"px; height: "+ engine.gridRows*20 +"px");
	document.getElementById('board').innerHTML = buildGrid(engine.gridRows * engine.gridColumns);
	statistics.game.currentRounds = 0;
	
	//change reset button
	document.getElementById("reset").className = "button-reset";
	
	//hide info message
	hideInfoMessage();
	clearTimeout(engine.infoMessageTimer);
	
	//display scoreboard
	displayScoreboardGUI();
}

//reset game statistics
function resetStatistics(){
	//engine.firstRound = true;
	statistics.game.lowestRatio = 0;
	statistics.game.highestRatio = 0;
	statistics.game.highestRound = 0;
	statistics.game.lowestRound = 0;
	
	//reset history
	document.getElementById('history').innerHTML = "";
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