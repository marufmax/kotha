const express = require("express");
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
app.io = io;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("index.ejs");
});

io.on("connection", function(socket) {
  socket.broadcast.emit("showMessage", {
    name: "KothaBot",
    message: "A NEW USER HAS JOINED",
  });

  socket.on("sendMessage", message => io.emit("showMessage", message));

  socket.on("disconnect", function(data) {
    socket.broadcast.emit("user_leave", this.username);
  });
});

server.listen(3000, () => {
  console.log("server started: http://localhost:3000");
});
