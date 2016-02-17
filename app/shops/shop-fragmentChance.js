//fragment chance boost
var displayFragmentChanceShop = false;
var fragmentChance = 1000;

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