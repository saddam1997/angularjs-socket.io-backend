const express = require("express");
const app = express();
var lodash = require("lodash");
var User = require("./user.js");
var myUsers = [];
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
});
server = app.listen(3000);
const io = require("socket.io")(server);
io.on("connection", socket => {
  console.log("New user connected ::: " + socket.id);
  let randomstring = Math.random()
    .toString(36)
    .substr(2, 10);
  var newUser = new User(socket.id, randomstring);
  newUser.display();
  myUsers.push(newUser);
  console.log(myUsers);
  socket.emit("generaterondom", {
    socket_id: socket.id,
    random_string: randomstring
  });
  socket.on("new_message", data => {
    console.log("new_message ");
    io.sockets.emit("new_message", {
      message: data.message,
      username: socket.username
    });
  });
  socket.on("scan_qr_code", data => {
    var newUser = new User(data.data.socketid, data.data.randomstring);
    console.log("newUser :: ", newUser);
    var picked = lodash.filter(myUsers, newUser);
    if (picked.length >= 1) {
      console.log("Please allow login ", picked);
      socket.to(data.data.socketid).emit("varifieduser", "for your eyes only");
    } else {
      console.log("Access denied !!!!");
    }
  });
});
