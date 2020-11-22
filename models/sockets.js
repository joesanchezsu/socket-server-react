class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    // io: All online sockets (to send message to all)
    this.io.on("connection", (socket) => {
      //socket: "client" (server side)
      //   socket.emit("welcome-message", {
      //     message: "Welcome to my server",
      //     date: new Date(),
      //   });

      // Listen event
      socket.on("message-to-server", (data) => {
        console.log(data);
        this.io.emit("message-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
