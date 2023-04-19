addLayer("bh", {
    name: "Black Hole", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BH", // This appears on the layer's node. Default is the id with the first letter capitalized
    image: "resources/bh.png",
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "bh") return "main-display"},
            function() { if (player.tab == "bh")  return ["column", [
                "prestige-button",
               ["blank", "25px"],
               "upgrades",
            ]]
        }
    ],
},
"BH Condenser": {
    content:[
        function() {if (player.tab == "bh") return "main-display"},
        function() { if (player.tab == "bh")  return ["column", [
            "prestige-button",
           ["blank", "25px"],
           "buyables",
        ]]
    }
],
},
    },
    color: "yellow",
    branches: ['m'],
    requires: new Decimal(1000000), // Can be a function that takes requirement increases into account
    resource: "Black Hole", // Name of prestige currency
    baseResource: "rage powers", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. normalMass: cost to gain currency depends on amount gained ( IMR mass format). static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    doReset() {
layerDataReset('m')
layerDataReset('e')
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "b: Reset everything for Black Hole", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (player.m.buyables[101].gte(3)) || player.bh.unlocked}
})
