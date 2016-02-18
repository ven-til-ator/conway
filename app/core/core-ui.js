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
		document.getElementById("min-rounds").innerHTML = statistics.game.lowestRound;
		document.getElementById("max-rounds").innerHTML = statistics.game.highestRound;
		document.getElementById("min-rounds").innerHTML = statistics.game.lowestRound;
		document.getElementById("max-rounds").innerHTML = statistics.game.highestRound;
		if(progress.shopsystem.gui.displayFragments){
			document.getElementById("fragments").innerHTML = shopsystem.currentFragments;
		}
		if(displaySpeedShop){
			document.getElementById("autospeed").innerHTML = roundNumber((1/autoSpeed*10000),2);
		}
		if(displayGridShop){
			document.getElementById("gridsize").innerHTML = engine.gridColumns+"x"+engine.gridRows;
		}
		if(displayFragmentMultiplicatorPerRoundsShop && fragmentPerRoundsShopIndex > 0){
			document.getElementById("fragmentperroundsboost").innerHTML = fragmentMuliplicatorRounds;
			document.getElementById("fragmentperrounds").innerHTML = fragmentMultiplicator + Math.floor(statistics.game.currentRounds/fragmentMuliplicatorRounds);
		}
		if(displayFragmentChanceShop){
			document.getElementById("fragmentchance").innerHTML = "1/"+ fragmentChance;
		}
		if(progress.shopsystem.gui.displayUpdatesStatistic){
			document.getElementById("updates").innerHTML = statistics.shopsystem.updatesBought;
		}
		if(displayGoldenTurboStatistic){
			document.getElementById("goldenturbos").innerHTML = goldenTurbosUsed;
		}
		
		//display shops if fragments have changed
		if(shopsystem.fragmentsLastRound != shopsystem.currentFragments){
			displayShops();
			shopsystem.fragmentsLastRound = shopsystem.currentFragments;
		}
	}
}

//keyboard usage
function checkKey(e) {
    var event = window.event ? window.event : e;
    //console.log(event.keyCode)
	
	//next round
	if(event.keyCode == 13 || event.keyCode == 78){
		generateFields();
	}
	
	//reset
	if(event.keyCode == 82){
		if(progress.gui.displayReset == true){
			resetGame(false);
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