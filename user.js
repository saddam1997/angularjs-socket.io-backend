"use strict";

module.exports = class User {
  constructor(socketid, randomstring) {
    this.socketid = socketid;
    this.randomstring = randomstring;
  }
  display() {
    console.log("New User : " + this.socketid + " " + this.randomstring);
  }
};
