const game = {
    resources: {
        gold: 250,
        lumber: 100,
    },
    addResource(resource, amount) {
        if (resource === "gold") {
            return game.resources.gold += amount
        } else if (resource === "lumber") {
            return game.resources.lumber += amount
        } else {
            console.log("Invalid resource")
        }
    }
}