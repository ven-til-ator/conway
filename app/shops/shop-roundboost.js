//fragments rounds boost
var displayFragmentMultiplicatorPerRoundsShop = false;
var fragmentMuliplicatorRounds = 205;

var fragmentPerRoundsShopIndex = 0;
var fragmentPerRoundsShop = new Array(
	25,
	50,		//2
	75,
	100,	
	125,	//5
	150,
	175,
	200,
	225,
	250,	//10
	275,
	300,
	325,
	350,
	375,	//15
	400,
	425,
	450,
	475,
	500,	//20
	555
);
var fragmentPerRoundsBoost = 5;

//update fragmentMuliplicatorRounds
function updateFragmentMuliplicatorRounds(){
	//shop available
	if(displayFragmentMultiplicatorPerRoundsShop){
		//enough money
		if(fragments >= fragmentPerRoundsShop[fragmentPerRoundsShopIndex]){
			//pay
			fragments = fragments - fragmentPerRoundsShop[fragmentPerRoundsShopIndex];
			fragmentPerRoundsShopIndex++;
			
			//adjust fragment rounds multiplicator
			fragmentMuliplicatorRounds -= fragmentPerRoundsBoost;
		
			displayProgressMessage("Fragment Rounds Multiplicator "+ fragmentPerRoundsShopIndex +" Unlocked!");
			document.getElementById("fragmentperrounds-text").style.display = 'block';
			document.getElementById("fragmentperrounds").style.display = 'block';
			
			document.getElementById("fragmentperroundsboost-text").style.display = 'block';
			document.getElementById("fragmentperroundsboost").style.display = 'block';
			
			updatesBought++;
		}
	}
	
	displayScoreboardGUI();
}