addLayer("m", {
    name: "Main", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    image: "resources/mass.png",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "m") return "main-display"},
            function() { if (player.tab == "m")  return ["column", [
               ["row", ["prestige-button", ["buyable", [101]],]],
               ["blank", "25px"],
               ["buyables", [1]],
            ]]
        }
    ],
},
"Rewards": {
    content: [
    function() {if (player.tab == "m") return ["column", [ ["infobox", "rankrewards"],
    ["infobox", "tierrewards"]]]
 }],
},
    },
    color: "white",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Ranks", // Name of prestige currency
    baseResource: "mass", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2.15, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    buyables: {
        101: {
            cost(x) { return new Decimal(4).mul(x.add(1).pow(1.15)).ceil() },
            display() { return "<span style='font-size: 12px'>Reset your Ranks to get Tier.<br> Req: <b>" + format(this.cost()) + " Ranks</b></span>" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                player.m.buyables[11] = new Decimal(0)
                player.m.buyables[12] = new Decimal(0)
                player.m.buyables[13] = new Decimal(0)
                player.m.maxSuper = new Decimal(30)
            },
            style() {
                return {
                'height': '120px',
                'width': '180px',
                'border': '4px solid',
                'border-radius': '0',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
        },
        11: {
            
            unlocked() {return player.m.points.gte(1)},
            cost(x) {  let maxSuper = new Decimal(30) 
                if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
                        if (player.m.buyables[11].gte(maxSuper)) return cost = new Decimal(10).pow(x.add(1).times(0.15).add(1)).pow(player.m.points.gte(8)?new Decimal(2.15).div(1.3):2.15)
                if (player.m.buyables[11].gte(1)) return cost = new Decimal(10).pow(x.add(1).times(0.15).add(1))
                else return cost = new Decimal(10) 
            return cost},
            display() {
                let maxSuper = new Decimal(30) 
                if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
                let res = player.m.buyables[11].gte(maxSuper)? " Super":""
                 return "<h3>[" + formatWhole(player.m.buyables[11]) + `] - [` + res + ` Muscler ]</h3><span style='font-size: 12px'><br> Cost: <b>` + formatMass(this.cost()) + "  of mass</b><br>Power: +" + formatMass(this.effect().step,3) + "<br>Effect: +" + formatMass(this.effect().x,3) + " to mass gain</span>" },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                
            },
            effect(x) {
                let step = new Decimal(1)
                if (player.m.points.gte(2)) step = step.add(x.div(50))
                if (player.m.buyables[12].gte(1)) step = step.times(buyableEffect("m", 12).x)
                 x = step.mul(x)
                return {x: x, step: step}
            },
            style() {
                return {
                'height': '100px',
                'width': '200px',
                'border': '4px solid',
                'border-radius': '0',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
        },
        12: {
            unlocked() {return player.m.points.gte(2)},
            cost(x) {let maxSuper = new Decimal(30) 
                if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
                let cost = new Decimal(500)
                 if (player.m.points.gte(4)) cost = cost.div(3)
                if (player.m.buyables[12].gte(maxSuper)) return cost = cost.pow(x.add(1).times(0.1).add(1)).pow(player.m.points.gte(8)?new Decimal(1.15).div(1.3):1.15)
                if (player.m.buyables[12].gte(1)) return cost = cost.pow(x.add(1).times(0.1).add(1))
        return cost},
            display() {
                let maxSuper = new Decimal(30) 
                if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
                let res = player.m.buyables[12].gte(maxSuper)?" Super":""
            return "<h3>[" + formatWhole(player.m.buyables[12]) + `] - [` + res + ` Booster ]` + "</h3><span style='font-size: 12px'><br> Cost: <b>" + formatMass(this.cost()) + "  of mass</b><br>Power: +x" + format(this.effect().step,3) + "<br>Effect: x" + format(this.effect().x,3) + " to [Muscler] power</span>" },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let step = new Decimal(2)
                if (player.m.buyables[12].gte(1)) step = step.add(x.div(75))
                if (player.m.buyables[13].gte(1)) step = step.pow(buyableEffect("m", 13).x)
                 x = step.mul(x).add(1)
                return {x: x, step: step}
            },
            style() {
                return {
                'height': '100px',
                'width': '200px',
                'border': '4px solid',
                'border-radius': '0',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
        },
        13: {
            unlocked() {return player.m.points.gte(3)},
            cost(x) { if (player.m.buyables[13].gte(1)) return new Decimal(30000).pow(x.add(1).times(0.15).add(1))
            else return new Decimal(30000) },
            display() { return "<h3>[" + formatWhole(player.m.buyables[13]) + "] - [ Stronger ]</h3><span style='font-size: 12px'><br> Cost: <b>" + formatMass(this.cost())+"  of mass</b><br>Power: +^" + format(this.effect().step,3) + "<br>Effect: ^" + format(this.effect().x,3) + " to [Booster] power</span>" + (this.effect().x.gte(10)?" (softcapped)":"")},
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let step = new Decimal(2)
                x = step.mul(x).add(1)
                x = softcap(x, new Decimal(10), new Decimal(0.5))
                return {x: x, step: step}
            },
            style() {
                return {
                'height': '100px',
                'width': '200px',
                'border': '4px solid',
                'border-radius': '0',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
        },
    },
    infoboxes: {
        rankrewards: {
            title: "Rank Rewards",
            body() {let table = "No rewards right now..."
            if (player.m.points.gte(1)) table = "Rank 1: Unlock [Muscler]."
            if (player.m.points.gte(2)) table += "<br>Rank 2: Unlock [Booster], [Muscler] boosts itself. Currently: +" + format(player.m.buyables[11].div(50))
            if (player.m.points.gte(3)) table += "<br>Rank 3: Unlock [Stronger], [Booster] boosts itself. Currently: +" + format(player.m.buyables[12].div(75))
            if (player.m.points.gte(4)) table += "<br>Rank 4: [Booster] is 3.00x cheaper."
            if (player.m.points.gte(5)) table += "<br>Rank 5: Super Mass Buyables starts 50 later."
            if (player.m.points.gte(6)) table += "<br>Rank 6: Mass is boosted by 2<sup>x*3</sup>, where x is rank. Currently: x" + format(Decimal.pow(2,player.m.points.times(3)))
            if (player.m.points.gte(8)) table += "<br>Rank 8: Super Mass Buyables scaling is 30% weaker."
            return table },
        },
        tierrewards: {
            title: "Tier Rewards",
            body() {let table = "No rewards right now..."
                if (player.m.buyables[101].gte(1)) table = "Tier 1: raise mass gain by 1.15."
                if (player.m.buyables[101].gte(2)) table += "<br>Tier 2: Unlock Rage Power."
            return table },
        },
    },
    doReset() {
        player.m.buyables[11] = new Decimal(0)
        player.m.buyables[13] = new Decimal(0)
        player.m.buyables[12] = new Decimal(0)
        player.m.maxSuper = new Decimal(30)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset mass, but get a rank", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
