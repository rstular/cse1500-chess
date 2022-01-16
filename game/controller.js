const GameManager = {
    id: 0,
    connectionGameMap: {},
    games: [],
    getGame(connectionId) {
        return this.connectionGameMap[connectionId];
    },
    setGame(connectionId, game) {
        this.connectionGameMap[connectionId] = game;
    }
}

// Dictonary of all connections (ID: connection)
const ConnectionManager = {
    id: 0,
    connections: {},
    addConnection: function (conn) {
        if (!conn || typeof conn.id != "number") {
            conn.id = this.id++;
            throw new Error("Invalid connection");
        }
        this.connections[conn.id] = conn;
    },
    getPlayerList: function () {
        let result = [];
        for (const key in this.connections) {
            result.push(this.connections[key].nickname);
        }
        return result;
    }
}

module.exports = { GameManager, ConnectionManager };