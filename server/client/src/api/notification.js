// api/index.js
import openSocket from "socket.io-client";
import AuthenticationService from "./../components/Authentication";
const socket = openSocket("http://localhost:5000/");

function connect(cb) {
    const user = AuthenticationService.getCurrentUser();
    socket.on("order", message => {
        cb(message);
    });
}

export { connect };