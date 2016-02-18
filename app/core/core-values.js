var statistics = {
	game: {
		gamesOverall: 0,
		gamesResetManually: 0,
		gamesResetAutomatically: 0,
		currentRounds: 0,
		currentActiveFields: 0,
		highestRound: 0,
		lowestRound: 0,
		currentRatio: 0,
		lowestRatio: 0,
		highestRatio: 0,
		manuallyClicked: 0,
		automaticallyClicked: 0
	}
};

var engine = {
	firstRound: true,
	gridRows: 12,
	gridColumns: 12,
	resetNeeded: false,
	manualReset: false,
	gridHistory: new Array(),
	autoplayActive: false,
	autoplayTimer: 0,
	infoMessageTimer: 0
};

var progress = {
	gui: {
		displayReset: false,
		displayAutoPlay: false,
		displayStatistics: false,
		displayRoundsInfo: false,
		displayCurrentGameInfo: false,
		displayHistory: false
	},
	engine: {
		autoReset: false
	}
};