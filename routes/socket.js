import _function from "../utils/function.js";
const { sendNotification } = _function;

// const sqlite3 = require('sqlite3').verbose();

// const dbPATH = "./db/chat.db";
// const db = new sqlite3.Database(dbPATH, sqlite3.OPEN_READWRITE, (err) => {
//     if (err) console.log(err.message);
// });


const clients = {}
// io.on("connection", socket => {

// });

export default function (socket) {
    console.log("SOCKETS", socket.id);
    socket.emit("connected", socket.id);
    socket.on("join", (data) => {
        if (clients[data]) {
            delete clients[data];
            clients[data] = socket;
        } else {
            clients[data] = socket;
        }
    });
    socket.on("message", (data) => {
        console.log(data.id);
        if (clients[data.id]) clients[data.id].emit("message", data);
        // var dd = JSON.parse(data);
        sendNotification(data.token,data.senderName,data.msg,data);
    });

}