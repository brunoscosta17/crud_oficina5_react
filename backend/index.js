var express = require('express');
var mongoose = require('mongoose');

var app = express();

if (!process.env.DATABASE_URL) 
{
    process.env.DATABASE_URL = "mongodb://localhost/oficina5"
}

var conString = process.env.DATABASE_URL;

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


