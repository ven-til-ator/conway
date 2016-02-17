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
		highestRatio: 0
	}
}

var engine = {
	firstRound: true,
	gridRows: 12,
	gridColumns: 12,
	resetNeeded: false,
	manualReset: false,
	gridHistory: new Array(),
	autoplayActive: false,
	autoplayTimer: null,
	infoMessageTimer: 0
}