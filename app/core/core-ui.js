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
	
	engine.infoMessageTimer = setTimeout(hideInfoMessage, 5000);
}

//display scoreboard
function displayScoreboardGUI(){
	if(progress.gui.displayStatistics){
		document.getElementById("max-games").innerHTML = statistics.game.gamesResetAutomatically;
		document.getElementById("max-resets").innerHTML = statistics.game.gamesResetManually;
		document.getElementById("min-ratio").innerHTML = statistics.game.lowestRatio;
		document.getElementById("max-ratio").innerHTML = statistics.game.highestRatio;
		document.getElementById("min-rounds").innerHTML = statistics.game.lowestGeneration;
		document.getElementById("max-rounds").innerHTML = statistics.game.highestGeneration;
		document.getElementById("min-rounds").innerHTML = statistics.game.lowestGeneration;
		document.getElementById("max-rounds").innerHTML = statistics.game.highestGeneration;
		if(progress.shopsystem.gui.displayFragments){
			document.getElementById("fragments").innerHTML = shopsystem.values.currentFragments;
		}
		if(progress.shopsystem.gui.displayVelocityStatistic){
			document.getElementById("autospeed").innerHTML = shopsystem.shops['velocity'].velocityValue();
		}
		if(progress.shopsystem.gui.displayGridStatistic){
			document.getElementById("gridsize").innerHTML = engine.gridColumns+"x"+engine.gridRows;
		}
		if(progress.shopsystem.gui.displayFragmentMultiplicatorStatistic && shopsystem.shops['generationbonus'].values.index > 0){
			document.getElementById("fragmentperroundsboost").innerHTML = Math.ceil(shopsystem.shops['generationbonus'].values.generationNeeded / shopsystem.shops['generationbonus'].values.generationBonus);
			document.getElementById("fragmentperrounds").innerHTML = shopsystem.getFragmentsPerGeneration(false);
		}
		if(progress.shopsystem.gui.displayFragmentChanceStatistic && shopsystem.shops['fragmentchance'].values.index > 0){
			document.getElementById("fragmentchance").innerHTML = "1/"+ shopsystem.shops['fragmentchance'].values.chance;
		}
		if(progress.shopsystem.gui.displayUpdatesStatistic){
			document.getElementById("updates").innerHTML = statistics.shopsystem.updatesBought;
		}
		if(displayGoldenTurboStatistic){
			document.getElementById("goldenturbos").innerHTML = goldenTurbosUsed;
		}
		
		//display shops if fragments have changed
		if(shopsystem.values.fragmentsLastGeneration != shopsystem.values.currentFragments){
			shopsystem.displayShops();
			shopsystem.values.fragmentsLastGeneration = shopsystem.values.currentFragments;
		}
	}
}

//keyboard usage
function checkKey(e) {
    var event = window.event ? window.event : e;
    
	//display keycode
	if(engine.debugMode == true)
	{
		console.log(event.keyCode);
	}
	
	//next round
	if(event.keyCode == 13 || event.keyCode == 78 || event.keyCode == 32){
		generateFields();
	}
	
	//reset
	if(event.keyCode == 82){
		if(progress.gui.displayReset == true){
			if(engine.exploitPrevention.resetBlocked == false)
			{
				resetGame(false);
			}
		}
	}
	
	//autoplay
	if(event.keyCode == 65){
		if(progress.gui.displayAutoPlay == true){
			toggleAutoplay();
		}
	}
	
	//golden turbo
	if(event.keyCode == 71){
		activateGoldenTurbo();
	}
	
	//SHOPS
	if(event.keyCode == 49 || event.keyCode == 97){
		//speed
		shopsystem.buy('velocity');
	} else if(event.keyCode == 50 || event.keyCode == 98){
		//grid
		shopsystem.buy('grid');
	} else if(event.keyCode == 51 || event.keyCode == 99){
		//fragment multiplicator rounds
		shopsystem.buy('generationbonus');
	} else if(event.keyCode == 52 || event.keyCode == 100){
		//fragment chance
		shopsystem.buy('fragmentchance');
	} else if(event.keyCode == 53 || event.keyCode == 101){
		//fragment multiplicator
		shopsystem.buy('multiplicator');
	} else if(event.keyCode == 54 || event.keyCode == 102){
		
	} else if(event.keyCode == 55 || event.keyCode == 103){
		
	} else if(event.keyCode == 56 || event.keyCode == 104){
		
	} else if(event.keyCode == 57 || event.keyCode == 105){
		
	} else if(event.keyCode == 48 || event.keyCode == 96){
		
	}
}