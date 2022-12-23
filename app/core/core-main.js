//display board
function generateFields(automatic){
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
	if(goldenTurboGenerations > 1) {
		goldenTurboGenerations--;
		
		//after reset colorize again
		if(statistics.game.currentGenerations == 0){
			//colorize grid
			document.getElementById("board").style.border = goldenTurboGridColor;
		}
	} else if (goldenTurboGenerations == 1){
		goldenTurboGenerations--;
		
		//colorize grid
		document.getElementById("board").style.border = defaultGridColor;
		
		//set speed
		shopsystem.shops['velocity'].values.currentAutoSpeed = shopsystem.shops['velocity'].values.autoSpeedValue;
		
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
		
		if(statistics.game.currentGenerations != 0){
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
				
				if(progress.shopsystem.gui.displayFragments && (Math.random()*shopsystem.shops['fragmentchance'].values.chance) < 2){
					fragmentColor = 'rgb(' + (Math.floor(Math.random() * 255)) + ','
									 + (Math.floor(Math.random() * 255)) + ','
									 + (Math.floor(Math.random() * 255)) + ')';
									 
					style = " style=\"background-color: "+ fragmentColor +";\" ";
					
					var tempFragmentMultiplicator = shopsystem.shops['multiplicator'].values.fragmentMultiplicator;
					if(progress.shopsystem.gui.displayFragmentMultiplicatorStatistic && shopsystem.shops['generationbonus'].values.index > 0){
						tempFragmentMultiplicator = shopsystem.shops['multiplicator'].values.fragmentMultiplicator + Math.floor(statistics.game.currentGenerations/shopsystem.shops['generationbonus'].values.bonusEveryGeneration);
						
						//multiplicator is active
						if(statistics.game.currentGenerations >= shopsystem.shops['generationbonus'].values.bonusEveryGeneration){
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
					
					shopsystem.values.currentFragments += shopsystem.getFragmentsPerGeneration(false);
					displayScoreboardGUI();
					
					document.getElementById("money-icon").style.color = fragmentColor;
				}
				
				additionalDiv = "<div class=\"black\" "+ style +"></div>";
			}	
			
			//first action -> return random to check
			if(statistics.game.currentGenerations == 0){
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
	
	statistics.game.currentGenerations++;
	if(automatic == true){
		statistics.game.automaticallyClicked++;
	} else {
		statistics.game.manuallyClicked++;
	}
	document.getElementById("action-counter").innerHTML = "Generation: " + statistics.game.currentGenerations;
	statistics.game.currentRatio = roundNumber(statistics.game.currentActiveFields / (engine.gridRows * engine.gridColumns) * 100, 2);
	document.getElementById("active-fields-counter").innerHTML = "Fields alive: " + statistics.game.currentActiveFields + " / " + engine.gridRows * engine.gridColumns + " | ratio: " + getRatioHtml(statistics.game.currentRatio, "none");
	
	//check progress
	checkProgress();
	
	if(statistics.game.currentActiveFields == 0){
		engine.resetNeeded = true;
		document.getElementById("reset").className = "button-reset-focused";
		
		if(progress.engine.autoReset){
			resetGame(true)
		} else {
			document.getElementById("reset").className = "button-reset-focused";
			displayInfoMessage("No lives left, please reset game.");
		}
	} 
	//infinite loop
	else if(engine.gridHistory[0] == engine.gridHistory[1] || engine.gridHistory[0] == engine.gridHistory[2] || engine.gridHistory[0] == engine.gridHistory[6] || engine.gridHistory[0] == engine.gridHistory[3]){
		engine.resetNeeded = true;
		
		if(progress.engine.autoReset){
			resetGame(true)
		} else {
			document.getElementById("reset").className = "button-reset-focused";
			displayInfoMessage("Infinite loop, please reset game.");
		}
	}
	
	displayScoreboardGUI();
	return true;
}


function generateFieldsAuto(){
	generateFields(true);
}

function nextGeneration(){
	generateFields(false);
}

function newGame(){
	resetGame(false);
}

//autoplay interval
function autoplay(val) {
	if(progress.gui.displayAutoPlay) {
		if (val == "run") {
			engine.autoplayActive = true;
			engine.autoplayTimer = window.setInterval(generateFieldsAuto, shopsystem.shops['velocity'].values.currentAutoSpeed);
		} else {
			engine.autoplayActive = false;
			window.clearInterval(engine.autoplayTimer);
		}
	}
}

//toggle autoplay
function toggleAutoplay() {
	if(progress.gui.displayAutoPlay) {
		if(!engine.autoplayActive) {
			autoplay("run");
			document.getElementById("autoplay").className = "buttonActivated";
		} else {
			autoplay("stop");
			document.getElementById("autoplay").className = "buttonDeactivated";
		}
	}
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
	
	var countActionsText = statistics.game.currentGenerations;
	
	//scores only with automatic reset (no cheating)
	if(automatic){
		//first round => set all statistics
		if(engine.firstGeneration == true){
			engine.firstGeneration = false;
			statistics.game.gamesResetAutomatically++;
		} else if(statistics.game.currentGenerations > 1){
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
			
			if (statistics.game.highestGeneration == 0 && statistics.game.lowestGeneration == 0) {
				statistics.game.highestGeneration = statistics.game.currentGenerations;
				statistics.game.lowestGeneration = statistics.game.currentGenerations;
			} else if (statistics.game.currentGenerations > statistics.game.highestGeneration) {
				statistics.game.highestGeneration = statistics.game.currentGenerations;
				countActionsText = "<span style=\"color: \#90EE90; font-weight:bold;\">"+ statistics.game.currentGenerations +"</span>"
			} else if(statistics.game.currentGenerations < statistics.game.lowestGeneration){
				statistics.game.lowestGeneration = statistics.game.currentGenerations;
				countActionsText = "<span style=\"color: indianred; font-weight:bold;\">"+ statistics.game.currentGenerations +"</span>"
			}
		}
	}
		
	var message = "<div class=\"round\">Generation "+ countActionsText +"</div><div class=\"fields\"><div class=\"square\"></div><div class=\"text\">"+ statistics.game.currentActiveFields +"</div></div><div class=\"ratio\">"+ ratioText +"</div>";
	
	//bonus fragments
	if(progress.shopsystem.gui.displayFragments && statistics.game.currentRatio == 0){
		//calculate fragment multiplicator aswell
		var tempFragmentMultiplicator = shopsystem.shops['multiplicator'].values.fragmentMultiplicator;
		if(progress.shopsystem.gui.displayFragmentMultiplicatorStatistic && shopsystem.shops['generationbonus'].values.index > 0){
			tempFragmentMultiplicator = shopsystem.shops['multiplicator'].values.fragmentMultiplicator + Math.floor(statistics.game.currentGenerations/shopsystem.shops['generationbonus'].values.bonusEveryGeneration);
		}
		
		message += "<div class=\"fragmentBonus\">"+ (shopsystem.getFragmentsPerGeneration(true)) +" <i class=\"fa fa-money\"></i></div>";
		shopsystem.values.currentFragments += shopsystem.getFragmentsPerGeneration(true);
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
	statistics.game.currentGenerations = 0;
	
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
	//engine.firstGeneration = true;
	statistics.game.lowestRatio = 0;
	statistics.game.highestRatio = 0;
	statistics.game.highestGeneration = 0;
	statistics.game.lowestGeneration = 0;
	
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

//check progress
function checkProgress(){
	//display reset after 1 click
	if(statistics.game.manuallyClicked >= 1 && !progress.gui.displayReset){
		progress.gui.displayReset = true;
		//console.log("Reset Button Unlocked!");
		displayProgressMessage("Reset Button Unlocked!");
	}
	
	//display rounds after 10 click
	if(statistics.game.manuallyClicked >= 10 && !progress.gui.displayGenerationsInfo){
		progress.gui.displayGenerationsInfo = true;
		//console.log("Generations Unlocked!");
		displayProgressMessage("Generations Unlocked!");
	}
	
	//display game info after 25 click
	if(statistics.game.manuallyClicked >= 25 && !progress.gui.displayCurrentGameInfo){
		progress.gui.displayCurrentGameInfo = true;
		//console.log("Game Info Unlocked!");
		displayProgressMessage("Game Info Unlocked!");
	}
	
	//display auto play after 50 click
	if(statistics.game.manuallyClicked >= 50 && !progress.gui.displayAutoPlay){
		progress.gui.displayAutoPlay = true;
		//console.log("Autoplay Unlocked!");
		displayProgressMessage("Autoplay Unlocked!");
	}
	
	//activate auto reset after 3 resets
	if(statistics.game.gamesResetManually >= 3 && !progress.engine.autoReset){
		progress.engine.autoReset = true;
		//console.log("Auto Reset Unlocked!");
		displayProgressMessage("Auto Reset Unlocked!");
	}
	
	//display history
	if(statistics.game.gamesResetAutomatically >= 3 && !progress.gui.displayHistory){
		progress.gui.displayHistory = true;
		//console.log("History Unlocked!");
		displayProgressMessage("History Unlocked!");
	}
	
	//display highscores
	if(statistics.game.gamesResetAutomatically >= 6 && !progress.gui.displayStatistics){
		progress.gui.displayStatistics = true;
		//console.log("Scoreboard Unlocked!");
		displayProgressMessage("Scoreboard Unlocked!");
	}
	
	//display fragments
	if(statistics.game.gamesResetAutomatically >= 9 && !progress.shopsystem.gui.displayFragments){
		progress.shopsystem.gui.displayFragments = true;
		//console.log("Fragments Unlocked!");
		displayProgressMessage("Fragments Unlocked!");
	}
	
	//check shop progress
	shopsystem.checkProgress();
	
	//updates counter
	if(statistics.shopsystem.updatesBought > 0 && !progress.shopsystem.gui.displayUpdatesStatistic){
		progress.shopsystem.gui.displayUpdatesStatistic = true;
	}
	
	
	//display functionalities
	if(progress.gui.displayReset){
		document.getElementById("reset").style.display = 'inline-block';
	}
	
	if(progress.gui.displayGenerationsInfo){
		document.getElementById("action-counter").style.display = 'block';
	}
	
	if(progress.gui.displayCurrentGameInfo){
		document.getElementById("active-fields-counter").style.display = 'block';
	}
	
	if(progress.gui.displayAutoPlay){
		document.getElementById("autoplay").style.display = 'inline-block';
	}
	
	if(progress.gui.displayStatistics){
		document.getElementById("highscores").style.display = 'block';
	}
	
	if(progress.gui.displayHistory){
		document.getElementById("history").style.display = 'block';
	}
	
	if(progress.shopsystem.gui.displayFragments){
		//fragments counter
		document.getElementById("fragments-text").style.display = 'block';
		document.getElementById("fragments").style.display = 'block';
	}
	
	if(displayGoldenTurboStatistic){
		document.getElementById("goldenturbos-text").style.display = 'block';
		document.getElementById("goldenturbos").style.display = 'block';
	}
	
	if(progress.shopsystem.gui.displayUpdatesStatistic){
		document.getElementById("updates-text").style.display = 'block';
		document.getElementById("updates").style.display = 'block';
	}
}