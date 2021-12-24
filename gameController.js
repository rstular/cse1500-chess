const games = {
    initializing: [],
    active: [],
    finished: []
}

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

module.exports = { games, ConnectionManager };