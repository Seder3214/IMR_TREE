addLayer("r", {
    name: "Rage", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    image: "resources/rage.png",
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "r") return "main-display"},
            function() { if (player.tab == "r")  return ["column", [
                "prestige-button",
               ["blank", "25px"],
               "upgrades",
            ]]
        }
    ],
},
"Tickspeed": {
    content:[
        function() {if (player.tab == "r") return "main-display"},
        function() { if (player.tab == "r")  return ["column", [
            "prestige-button",
           ["blank", "25px"],
           "buyables",
        ]]
    }
],
},
    },
    color: "red",
    branches: ['m'],
    requires: new Decimal(1.5e42), // Can be a function that takes requirement increases into account
    resource: "Rage Powers", // Name of prestige currency
    baseResource: "mass", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normalMass", // normal: cost to gain currency depends on amount gained. normalMass: cost to gain currency depends on amount gained ( IMR mass format). static: cost depends on how much you already have
    exponent: 0.07, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (player.m.buyables[101].gte(3)) mult = mult.mul(3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    buyables: {
        11: {
            
            unlocked() {return player.r.points.gte(0)},
            cost(x) {  let maxSuper = new Decimal(50)
                let cost = new Decimal(2)
                        if (player.r.buyables[11].gte(maxSuper)) return cost = cost.pow(x.add(1)).sub(1).pow(player.m.points.gte(8)?new Decimal(2.15).div(1.3):2.15)
                if (player.r.buyables[11].gte(1)) return cost = cost.pow(x.add(1)).sub(1)
                else return cost = new Decimal(1) },
            display() {
                let maxSuper = new Decimal(50) 
                let res = player.r.buyables[11].gte(maxSuper)? " Super":""
                 return "<h3>[" + formatWhole(player.r.buyables[11]) + `] - [` + res + ` Tickspeeds ]</h3><span style='font-size: 12px'><br> Cost: <b>` + format(this.cost()) + " Rage Powers</b><br>Power: +" + format(this.effect().step.sub(1).mul(100),2) + "%<br>Effect: x" + format(this.effect().x,3) + " to mass gain</span>" },
            canAfford() { return player.r.points.gte(this.cost()) },
            buy() {
                player.r.points = player.r.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                
            },
            effect(x) {
                let step = new Decimal(1.5)
                 x = step.mul(x).add(1)
                return {x: x, step: step}
            },
            style() {
                return {
                'height': '100px',
                'width': '240px',
                'border': '4px solid',
                'border-radius': '0',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
        },
    },
    upgrades: {
        11: {
            title: "[r1]",
            description: "[Booster] adds [Muscler]",
            cost: new Decimal(1),
effect() { return player.m.buyables[12]},
effectDisplay() {return "+" + formatWhole(this.effect())},
        },
        12: {
            title: "[r2]",
            description: "[Stronger] adds [Booster]",
            cost: new Decimal(10),
effect() { return player.m.buyables[13]},
effectDisplay() {return "+" + formatWhole(this.effect())},
        },
        13: {
            title: "[r3]",
            description: "You can automatically buy Mass buyables (autobuying doenst spent mass).",
            cost: new Decimal(25),
        },
        14: {
            title: "[r4]",
            description: "Hyper Mass Buyables starts 1.5x later.",
            cost: new Decimal(100),
        },
        15: {
            title: "[r5]",
            description: "You can automate tiering-up and rank-up.",
            cost: new Decimal(10000),
        },
        16: {
            title: "[r6]",
            description: "For every 2 tickspeeds add free stronger.",
            effect() { return player.r.buyables[11].div(2)},
effectDisplay() {return "+" + formatWhole(this.effect())},
            cost: new Decimal(35000),
        },
    },
    doReset() {
layerDataReset('m')
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset mass, but get a rank", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return (player.m.buyables[101].gte(2) || player[this.layer].unlocked)}
})
