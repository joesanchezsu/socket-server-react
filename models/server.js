const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = socketio(this.server, {
      /* settings */
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  }

  // *middleware: lógica de intercambio de información entre aplicaciones
  middlewares() {
    // Deploy public directory
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    // CORS
    this.app.use(cors()); // I dont know if still necessary
    // CORS Solution from forum when using independent index.html
    this.app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, GET, POST, DELETE, OPTIONS"
      );
      next();
    });
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute() {
    this.middlewares();
    this.configSockets();
    this.server.listen(this.port, () => {
      console.log("Server running on port :8080");
    });
  }
}

module.exports = Server;
