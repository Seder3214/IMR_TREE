let modInfo = {
	name: "IMR: TREE",
	id: "IMR-TREE",
	author: "Seder3214",
	pointsName: "mass",
	modFiles: ["layers/main.js","layers/rage.js","layers/bh.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2.3",
	name: "IMR: TREE - Rage Powers",
}

let changelog = `<h1>Changelog:</h1><br>
<h3 style='color: red'>v0.2.3 - Rage Powers</h3><br>
- Added pre-black hole content.<br>
	<h3 style='color: gray'>v0.1 - Mass</h3><br>
		- Added pre-rage power content.<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(1)
	let gain = new Decimal(1)
	// Buyables effects
	if (player.m.buyables[11].gte(1)) gain = gain.add(buyableEffect("m",11).x)
	if (player.r.buyables[11].gte(1)) gain = gain.mul(buyableEffect("r",11).x)
	// Rank Effects
	if (player.m.points.gte(6)) gain = gain.times(Decimal.pow(2,player.m.points.times(3)))
	// Tier Effects
	if (player.m.buyables[101].gte(1)) gain = gain.pow(1.15)
	if (player.m.buyables[101].gte(2)) gain = gain.mul(10)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}