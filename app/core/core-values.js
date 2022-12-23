var statistics = {
	game: {
		gamesOverall: 0,
		gamesResetManually: 0,
		gamesResetAutomatically: -1,
		currentGenerations: 0,
		currentActiveFields: 0,
		highestGeneration: 0,
		lowestGeneration: 0,
		currentRatio: 0,
		lowestRatio: 0,
		highestRatio: 0,
		manuallyClicked: 0,
		automaticallyClicked: 0
	}
};

var engine = {
	gridRows: 12,
	gridColumns: 12,
	resetNeeded: false,
	manualReset: false,
	gridHistory: new Array(),
	autoplayActive: false,
	autoplayTimer: 0,
	infoMessageTimer: 0,
	debugMode: false,
	exploitPrevention: {
		resetCounter: 0,
		resetBlocked: false
	}
};

var progress = {
	gui: {
		displayReset: false,
		displayAutoPlay: false,
		displayStatistics: false,
		displayGenerationsInfo: false,
		displayCurrentGameInfo: false,
		displayHistory: false
	},
	engine: {
		autoReset: false
	}
};