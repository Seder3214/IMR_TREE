addLayer("m", {
    name: "Main", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    image: "resources/mass.png",
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        auto: true,
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
    automate() {},
autoPrestige() {
 return (hasUpgrade("r", 15) && player.m.auto)},
    color: "white",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Ranks", // Name of prestige currency
    effectDescription() {return `<h2 style='color: white; text-shadow: 0 0 10px white'>` + formatWhole(player.m.buyables[101]) + "</h2> Tiers"},
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
    tierAuto() {
        let x = player.m.buyables[101]
        let cost = new Decimal(4).mul(x.add(1).pow(1.15)).ceil()
        return cost
    },
    muscAuto() {
        let x = player.m.buyables[11]
        let cost = new Decimal(10)
        let maxHyper = new Decimal(275)
      let maxSuper = new Decimal(30) 
      if (hasUpgrade("r", 14)) maxHyper = maxHyper.mul(1.5)
      if (player.m.points.gte(13)) maxHyper.add(player.r.buyables[11].pow(2))
            if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
            if (player.m.buyables[11].gte(maxHyper)) return cost = cost.pow(x.add(1).times(0.15).add(1)).pow(player.m.points.gte(8)?new Decimal(2.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25).max(1):1):2.15).pow(1.05)
                    if (player.m.buyables[11].gte(maxSuper)) return cost = cost.pow(x.add(1).times(0.15).add(1)).pow(player.m.points.gte(8)?new Decimal(2.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25):1):2.15)
            if (player.m.buyables[11].gte(1)) return cost = cost.pow(x.add(1).times(0.15).add(1))
    },
    boostAuto() {
        let x = player.m.buyables[12]
        let maxHyper = new Decimal(275)
        let maxSuper = new Decimal(30) 
        if (hasUpgrade("r", 14)) maxHyper = maxHyper.mul(1.5)
        if (player.m.points.gte(13)) maxHyper = maxHyper.add(player.r.buyables[11].pow(2))
        if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
        let cost = new Decimal(500)
        if (player.m.points.gte(4)) cost = cost.div(3)
        if (player.m.buyables[12].gte(maxHyper)) return cost = cost.pow(x.add(1).times(0.1).add(1)).pow(player.m.points.gte(8)?new Decimal(1.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25).max(1):1):1.15).pow(1.05)
        if (player.m.buyables[12].gte(maxSuper)) return cost = cost.pow(x.add(1).times(0.1).add(1)).pow(player.m.points.gte(8)?new Decimal(1.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25).max(1):1):1.15)
        if (player.m.buyables[12].gte(1)) return cost = cost.pow(x.add(1).times(0.1).add(1))
return cost
    },
    strAuto() {
        let x = player.m.buyables[13]
        let cost = new Decimal(30000)
        let maxSuper = new Decimal(30) 
        let maxHyper = new Decimal(275)
        if (hasUpgrade("r", 14)) maxHyper = maxHyper.mul(1.5)
        if (player.m.points.gte(13)) maxHyper = maxHyper.add(player.r.buyables[11].pow(2))
        if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
        if (player.m.buyables[13].gte(maxHyper)) return cost = cost.pow(x.add(1).times(0.15).add(1)).pow(player.m.points.gte(8)?new Decimal(1.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25).max(1):1):1.15).pow(1.05)
        if (player.m.buyables[13].gte(maxSuper)) return cost = cost.pow(x.add(1).times(0.15).add(1)).pow(player.m.points.gte(8)?new Decimal(1.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25).max(1):1):1.15)
        if (player.m.buyables[13].gte(1)) return cost = cost.pow(x.add(1).times(0.15).add(1))
return cost
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
            cost(x) {        let cost = new Decimal(10)
                let maxHyper = new Decimal(275)
              let maxSuper = new Decimal(30) 
              if (hasUpgrade("r", 14)) maxHyper = maxHyper.mul(1.5)
              if (player.m.points.gte(13)) maxHyper.add(player.r.buyables[11].pow(2))
                    if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
                    if (player.m.buyables[11].gte(maxHyper)) return cost = cost.pow(x.add(1).times(0.15).add(1)).pow(player.m.points.gte(8)?new Decimal(2.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25).max(1):1):2.15).pow(1.05)
                            if (player.m.buyables[11].gte(maxSuper)) return cost = cost.pow(x.add(1).times(0.15).add(1)).pow(player.m.points.gte(8)?new Decimal(2.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25).max(1):1):2.15)
                    if (player.m.buyables[11].gte(1)) return cost = cost.pow(x.add(1).times(0.15).add(1))},
            display() {
                let maxSuper = new Decimal(30) 
                let maxHyper = new Decimal(275)
                if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
                if (player.m.points.gte(13)) maxHyper = maxHyper.add(player.r.buyables[11].pow(2))
                if (hasUpgrade("r", 14)) maxHyper = maxHyper.mul(1.5)
                let res = player.m.buyables[11].gte(maxHyper)? " Hyper":player.m.buyables[13].gte(maxSuper)? " Super":""
                if (hasUpgrade("r",11 )) return "<h3>[" + formatWhole(player.m.buyables[11]) + ` + ` + formatWhole(this.effect().bonus) + `] - [` + res + ` Muscler ]</h3><span style='font-size: 12px'><br> Cost: <b>` + formatMass(this.cost()) + "  of mass</b><br>Power: +" + formatMass(this.effect().step,3) + "<br>Effect: +" + formatMass(this.effect().x,3) + " to mass gain</span>"
                 else return "<h3>[" + formatWhole(player.m.buyables[11]) + `] - [` + res + ` Muscler ]</h3><span style='font-size: 12px'><br> Cost: <b>` + formatMass(this.cost()) + "  of mass</b><br>Power: +" + formatMass(this.effect().step,3) + "<br>Effect: +" + formatMass(this.effect().x,3) + " to mass gain</span>" },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                
            },
            effect(x) {
                let step = new Decimal(1)
                let bonus = new Decimal(0)
                if (hasUpgrade('r',11)) bonus = bonus.add(upgradeEffect("r",11))
                if (player.m.points.gte(2)) step = step.add(x.div(50))
                if (player.m.buyables[12].gte(1)) step = step.times(buyableEffect("m", 12).x)
                 x = step.mul(x.add(bonus))
                return {x: x, step: step, bonus: bonus}
            },
            style() {
                return {
                'height': '100px',
                'width': '250px',
                'border': '4px solid',
                'border-radius': '0',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
        },
        12: {
            unlocked() {return player.m.points.gte(2)},
            cost(x) {
                let maxHyper = new Decimal(275)
                let maxSuper = new Decimal(30) 
                if (hasUpgrade("r", 14)) maxHyper = maxHyper.mul(1.5)
                if (player.m.points.gte(13)) maxHyper = maxHyper.add(player.r.buyables[11].pow(2))
                if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
                let cost = new Decimal(500)
                if (player.m.points.gte(4)) cost = cost.div(3)
                if (player.m.buyables[12].gte(maxHyper)) return cost = cost.pow(x.add(1).times(0.1).add(1)).pow(player.m.points.gte(8)?new Decimal(1.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25).max(1):1):1.15).pow(1.05)
                if (player.m.buyables[12].gte(maxSuper)) return cost = cost.pow(x.add(1).times(0.1).add(1)).pow(player.m.points.gte(8)?new Decimal(1.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25).max(1):1):1.15)
                if (player.m.buyables[12].gte(1)) return cost = cost.pow(x.add(1).times(0.1).add(1))
        return cost},
            display() {
                let maxSuper = new Decimal(30) 
                let maxHyper = new Decimal(275)
                if (hasUpgrade("r", 14)) maxHyper = maxHyper.mul(1.5)
                if (player.m.points.gte(13)) maxHyper = maxHyper.add(player.r.buyables[11].pow(2))
                if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
                let res = player.m.buyables[12].gte(maxHyper)? " Hyper":player.m.buyables[13].gte(maxSuper)? " Super":""
           if (hasUpgrade("r", 12)) return "<h3>[" + formatWhole(player.m.buyables[12]) + ` + ` + formatWhole(this.effect().bonus) + `] - [` + res + ` Booster ]` + "</h3><span style='font-size: 12px'><br> Cost: <b>" + formatMass(this.cost()) + "  of mass</b><br>Power: +x" + format(this.effect().step,3) + "<br>Effect: x" + format(this.effect().x,3) + " to [Muscler] power</span>"
        else return "<h3>[" + formatWhole(player.m.buyables[12]) + `] - [` + res + ` Booster ]` + "</h3><span style='font-size: 12px'><br> Cost: <b>" + formatMass(this.cost()) + "  of mass</b><br>Power: +x" + format(this.effect().step,3) + "<br>Effect: x" + format(this.effect().x,3) + " to [Muscler] power</span>" },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let bonus = new Decimal(0)
                if (hasUpgrade('r',12)) bonus = bonus.add(upgradeEffect("r",12))
                let step = new Decimal(2)
                if (player.m.points.gte(3)) step = step.add(x.div(75))
                if (player.m.buyables[13].gte(1)) step = step.pow(buyableEffect("m", 13).x)
                 x = step.mul(x.add(bonus)).add(1)
                return {x: x, step: step, bonus: bonus}
            },
            style() {
                return {
                'height': '100px',
                'width': '250px',
                'border': '4px solid',
                'border-radius': '0',
                'border-color': 'rgba(0, 0, 0, 0.125)',
                }
            },
        },
        13: {
            unlocked() {return player.m.points.gte(3)},
            cost(x) {        let cost = new Decimal(30000)
                let maxSuper = new Decimal(30) 
                let maxHyper = new Decimal(275)
                if (hasUpgrade("r", 14)) maxHyper = maxHyper.mul(1.5)
                if (player.m.points.gte(13)) maxHyper = maxHyper.add(player.r.buyables[11].pow(2))
                if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
                if (player.m.buyables[13].gte(maxHyper)) return cost = cost.pow(x.add(1).times(0.15).add(1)).pow(player.m.points.gte(8)?new Decimal(1.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25).max(1):1):1.15).pow(1.05)
                if (player.m.buyables[13].gte(maxSuper)) return cost = cost.pow(x.add(1).times(0.15).add(1)).pow(player.m.points.gte(8)?new Decimal(1.15).div(1.3).div(player.m.points.gte(10)?player.r.points.div(2).pow(0.05).min(1.25).max(1):1):1.15)
                if (player.m.buyables[13].gte(1)) return cost = cost.pow(x.add(1).times(0.15).add(1))
        return cost},
            display() {                let maxSuper = new Decimal(30) 
                let maxHyper = new Decimal(275)
                if (hasUpgrade("r", 14)) maxHyper = maxHyper.mul(1.5)
                if (player.m.points.gte(13)) maxHyper = maxHyper.add(player.r.buyables[11].pow(2))
                if (player.m.points.gte(5)) maxSuper = maxSuper.add(50)
                 let res = player.m.buyables[13].gte(maxHyper)? " Hyper":player.m.buyables[13].gte(maxSuper)? " Super":""
                 if (hasUpgrade("r", 16)) return "<h3>[" + formatWhole(player.m.buyables[13]) + ` + ` + formatWhole(this.effect().bonus) + `] - [` + res + ` Booster ]` + "</h3><span style='font-size: 12px'><br> Cost: <b>" + formatMass(this.cost()) + "  of mass</b><br>Power: +x" + format(this.effect().step,3) + "<br>Effect: x" + format(this.effect().x,3) + " to [Muscler] power</span>"
                 else return "<h3>[" + formatWhole(player.m.buyables[13]) + `] - [` + res + ` Booster ]` + "</h3><span style='font-size: 12px'><br> Cost: <b>" + formatMass(this.cost()) + "  of mass</b><br>Power: +x" + format(this.effect().step,3) + "<br>Effect: x" + format(this.effect().x,3) + " to [Muscler] power</span>" },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x) {
                let step = new Decimal(2)
                let bonus = new Decimal(0)
                if (hasUpgrade('r',16)) bonus = bonus.add(upgradeEffect("r",16))
                x = step.mul(x.add(bonus)).add(1)
                x = softcap(x, new Decimal(10), new Decimal(0.5))
                return {x: x, step: step, bonus: bonus}
            },
            style() {
                return {
                'height': '100px',
                'width': '250px',
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
            if (player.m.points.gte(10)) table += "<br>Rank 10: Super Mass Buyables scaling is weaker by Rage Powers. Currently: " + format(player.r.points.div(2).pow(0.05).sub(1).mul(100).min(25).max(0)) + "%"
            if (player.m.points.gte(13)) table += "<br>Rank 13: Tickspeeds scales Super Mass Buyables start later. Currently: +" + format(player.r.buyables[11].pow(1.4))
            return table },
        },
        tierrewards: {
            title: "Tier Rewards",
            body() {let table = "No rewards right now..."
                if (player.m.buyables[101].gte(1)) table = "Tier 1: raise mass gain by 1.15."
                if (player.m.buyables[101].gte(2)) table += "<br>Tier 2: Unlock Rage Power, 10x mass.<br> Rank doesnt resets anything."
                if (player.m.buyables[101].gte(3)) table += "<br>Rank 15: Unlock Black Hole, triple rage powers gain"
            return table },
        },
    },
    update(diff) {
        if (hasUpgrade('r', 13) && (player.points.gte(tmp.m.muscAuto))) player.m.buyables[11] = player.m.buyables[11].add(1)
        if (hasUpgrade('r', 13) && (player.points.gte(tmp.m.boostAuto))) player.m.buyables[12] = player.m.buyables[12].add(1)
        if (hasUpgrade('r', 13) && (player.points.gte(tmp.m.strAuto))) player.m.buyables[13] = player.m.buyables[13].add(1)
        if (hasUpgrade('r', 15) && (player.m.points.gte(tmp.m.tierAuto))) {
            player.m.buyables[11] = new Decimal(0)
        player.m.buyables[13] = new Decimal(0)
        player.m.buyables[12] = new Decimal(0)
        player.m.maxSuper = new Decimal(30)
            player.m.buyables[101] = player.m.buyables[101].add(1)}
    },
    doReset() {
     if (!player.m.buyables[101].gte(2))   {player.m.buyables[11] = new Decimal(0)
        player.m.buyables[13] = new Decimal(0)
        player.m.buyables[12] = new Decimal(0)
        player.m.maxSuper = new Decimal(30)}
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset mass, but get a rank", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
