var gameId = 0;
var connectionId = 0;

const games = [];

// Dictonary of all connections (ID: connection)
const ConnectionManager = {
    connections: {},
    addConnection: function (conn) {
        if (!conn || typeof conn.id != "number") {
            throw new Error("Invalid connection");
        }
        this.connections[conn.id] = conn;
    }
}

module.exports = { games, ConnectionManager, gameId, connectionId };