//default values
var gridColorNotDefault = false;
var fragmentColor = "";
var fragmentDefaultColor = "black";

//data values
var goldenTurbosUsed = 0;
var goldenTurbo = false;
var goldenTurboChance = 3333;
var goldenTurboGenerations = 0;
var goldenTurboSpeed = 25;
var goldenTurboBaseGeneration = 7;
var goldenTurboGridColor = "2px solid yellow";
var defaultGridColor = "1px solid black";

//check values
var displayGoldenTurboStatistic = false;

//activate the turbo mode
function activateGoldenTurbo(){
	if(goldenTurbo == true){
		goldenTurboGenerations = goldenTurboBaseGeneration * (1+shopsystem.shops['grid'].values.index);
		goldenTurbo = false;
		
		//colorize grid
		document.getElementById("board").style.border = goldenTurboGridColor;
		
		//set turbo
		shopsystem.shops['velocity'].values.currentAutoSpeed = goldenTurboSpeed;
		
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
		shopsystem.displayShops();
	}
}
