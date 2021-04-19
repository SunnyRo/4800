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
            this._socket.on('statusConnetion', (data) => {
                console.log(data)
            });
            this._socket.on('disconnect', function () {
                console.log(socket.id, "disconnect socket");
            });
            console.log(socket.room, socket.message)
            console.log(`New socket connection: ${socket.id}`);
        });
    }
    sendEvent(event, data, customerID) {
        // this._socket.emit(event, data);
        console.log(customerID)
        // this._socket.join(customerID);
        this._socket.to(customerID).emit(event, data);
        // this._socket.leave(customerID);
    }

    listenEvent(event, status, customerID) {
        this._socket.on(event, (data) => {
            this._socket.join(data.room)
            this.__socket.to(customerID).emit('order', status)
        });
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