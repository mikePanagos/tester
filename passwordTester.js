"use strick";
var bcrypt = require("bcrypt");
// const uuidV4 = require("uuid/v4");

bcrypt.hash("N/7\"v#E(", 10, function (err, hash){
    if (err) {
     console.log("err "+err);
    }
    bcrypt.compare("N/7\"v#E(", hash, function (err, result) {

        if (result === true) {
            console.log("its true ");
    console.log("passward hash is "+hash);
        }else{
            console.log("nope ha ha");
        }
    });
  });



