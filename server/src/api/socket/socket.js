let connection = null;
class socket {
    constructor() {
        this._socket = null;
    }
    connect(server) {
        const io = require('socket.io')(server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });
        io.on('connection', (socket) => {
            this._socket = socket;
        });
    }
    sendEvent(event, data) {
        this._socket.emit(event, data);
    }

    listenEvent(event, status, customerID) {
        console.log('testing')
    }

    static init(server) {
        if (!connection) {
            connection = new socket();
            connection.connect(server, {
                cors: {
                    origin: "http://localhost:3000",
                    methods: ["GET", "POST"]
                }
            });
        }
    }

    static getConnection() {
        if (!connection) {
            throw new Error("no active connection");
        }
        return connection;
    }
}

module.exports = {
    connect: socket.init,
    connection: socket.getConnection
}