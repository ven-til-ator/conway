var displaySpeedShop = false;
var autoSpeedValue = 660;
var autoSpeed = autoSpeedValue;

var speedShopIndex = 0;
var fragmentSpeedShop = new Array(
	5,	//640
	10,
	15,	//600
	20,
	25,	//560
	30,
	35,	//520
	40,
	45,	//480
	50,
	55,	//440
	60,
	75,	//400
	90,
	100,//360
	125,
	150,//320
	200,
	250,//280
	400,
	600,//240
	800,
	1000,//200
	1200,
	1400,//160
	1600,
	1800,//120
	2000 //100
);
var fragmentSpeedBoost = 20;

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