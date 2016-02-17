var displayGridShop = false;

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
	3700/*,	//32
	4900,
	6100,	//34
	8300,	
	10000,	//36
	13000,
	18000,	//38
	25000,
	30000	//40*/
);

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
			engine.gridRows++;
			engine.gridColumns++;
			
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