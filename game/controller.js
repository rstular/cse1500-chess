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
    }
}

module.exports = { GameManager, ConnectionManager };