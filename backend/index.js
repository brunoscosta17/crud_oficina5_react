var express = require('express');
var mongoose = require('mongoose');

var app = express();
// var conString = process.env.DATABASE_URL;

var conString = "mongodb://oficina5user:102938@localhost:27017/oficina5";

mongoose.connect(conString, function(error) {
    console.log(error);
  });

var userSchema = mongoose.Schema({
    name: String,
    email: String
});

var User = mongoose.model("User", userSchema)

app.get('/user', function(req, res){
    User.find(function(err, response){
        if (err) { res.send("DB Error: " + err) }
        else {
            res.send(response);
        }
     });
}); 

app.post('/user', function(req, res) {
    var newUser = new User({
        name: "Bruno",
        email: "brunoscosta17@gmail.com"
    });

    newUser.save(function(err, User){
        if (err) { res.send("DB Error: " + err) }
        else {
            res.send("User created sucessfully.");
        }
    });

});

app.listen(3001);


