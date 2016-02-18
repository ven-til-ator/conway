//fragment multiplicator
var displayFragmentMultiplicatorShop = false;
var fragmentMultiplicator = 1;

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