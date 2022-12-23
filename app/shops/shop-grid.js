progress.shopsystem.gui.displayGridStatistic = false;

shopsystem.shops['grid'] = {
	values: {
		index: 0
	},
	priority: 2,
	visible: false,
	display: function(){
		var output = "";
	
		if(shopsystem.shops['grid'].visible && shopsystem.shops['grid'].values.index < shopsystem.shops['grid'].pricing.length){
			//check if button is payable
			if(shopsystem.values.currentFragments >= shopsystem.shops['grid'].pricing[shopsystem.shops['grid'].values.index]){
				buttonClass = "paybutton-active";
			} else {
				buttonClass = "paybutton";
			}
		
			//display html
			output += "<div>";
				output += "<div id=\"payGridButton\" class=\"shop-tooltip "+ buttonClass +"\" onClick=\"shopsystem.buy('grid');\">";
					output += "<div class=\"key\">(2)</div>";
					output += "<div class=\"title\">Extend Grid "+ (shopsystem.shops['grid'].values.index+1) +"</div>";
					output += "<div class=\"price\">"+ shopsystem.shops['grid'].pricing[shopsystem.shops['grid'].values.index] +" <i class=\"fa fa-money\"></i></div>";
					output += "<div class=\"clearfix\"> </div>";
					output += "<span class=\"shop-tooltiptext shop-tooltip-left\">The bigger the grid, the more cells can be alive (and generate a fragment).</span>"
				output += "</div>";
			output += "</div>";
			output += "<div class=\"clearfix\"> </div>";
		}
		
		return output;
	},
	update: function(){
		//gridshop is activated
		if(shopsystem.shops['grid'].visible){
			//enough money
			if(shopsystem.values.currentFragments >= shopsystem.shops['grid'].pricing[shopsystem.shops['grid'].values.index]){
				//pay
				shopsystem.values.currentFragments -= shopsystem.shops['grid'].pricing[shopsystem.shops['grid'].values.index];
				shopsystem.shops['grid'].values.index++;
				
				//update grid
				engine.gridRows++;
				engine.gridColumns++;
				
				//reset game values
				resetGame();
				resetStatistics();
				
				displayProgressMessage("Extend Grid "+ shopsystem.shops['grid'].values.index +" Unlocked (Statistics Reset)!");
				document.getElementById("gridsize-text").style.display = 'block';
				document.getElementById("gridsize").style.display = 'block';
				
				statistics.shopsystem.updatesBought++;
				
				//display statistics
				progress.shopsystem.gui.displayGridStatistic = true;
			}
		}
		
		displayScoreboardGUI();
	},
	pricing: [
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
		3700/*,	//32
		4900,
		6100,	//34
		8300,	
		10000,	//36
		13000,
		18000,	//38
		25000,
		30000	//40*/
	]
}