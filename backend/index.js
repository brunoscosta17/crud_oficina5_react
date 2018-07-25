var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var pass = require('pwd');
var session = require('express-session');

var app = express();
app.use(bodyParser.json());

// TODO secure secret
app.use(session({ secret: "Shh, its a secret!" }));

if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "mongodb://localhost/oficina5"
}

var conString = process.env.DATABASE_URL;

mongoose.connect(conString, function (error) {
    if (error == null) console.log("Connection to the DB ok");
    else console.log("Error while connecting to the DB: " + error);
});

var userSchema = mongoose.Schema({
    Contacts: [{ Name: String, PhoneNumber: String, DateOfBirth: Date }],
    Hash: String,
    Salt: String,
    UserName: String,
});

var User = mongoose.model("User", userSchema);

function checkSignIn(req, res, next) {
    if (req.session && req.session.sessionInfo) next();
    else {
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        return next(err);
    }
};

app.get('/user', checkSignIn, function (req, res) {
    User.find({}, 'UserName', function (err, response) {
        if (err) res.json({ Operation: false, Message: "Erro ao buscar usuários." });
        else res.json({ Operation: true, Items: response });
    });
});

app.get('/user/:userName', checkSignIn, function (req, res) {
    var searchInfo = req.params;
    User.findOne({ UserName: searchInfo.userName }, 'UserName', function (err, response) {
        if (err) res.json({ Operation: false, Message: "Erro ao buscar usuário." });
        else res.json({ Operation: true, Item: response });
    });
});

app.post('/user', function (req, res) {
    var personInfo = req.body; // Get parsed information

    User.findOne({ UserName: personInfo.UserName }, function (err, response) {
        if (response == null || response.length === 0) {

            pass.hash(personInfo.Password, function (err, salt, hash) {

                var newUser = new User({
                    UserName: personInfo.UserName,
                    Password: personInfo.Password,
                    Salt: salt,
                    Hash: hash
                });

                newUser.save(function (err, User) {
                    if (err) res.json({ Operation: false, Message: "Erro ao criar usuário" });
                    else {
                        res.location(`/user/${newUser.UserName}`);
                        res.json({ Operation: true });
                    }
                });
            });
        }
        else res.json({ Operation: false, Message: "Usuário já cadastrado." });
    });
});

app.post('/login', function (req, res) {
    var errorMsg = "Usuário/senha inválidos!";
    var loginInfo = req.body;

    User.findOne({ UserName: loginInfo.UserName }, function (err, response) {
        if (response !== null && response.length != 0) {
            pass.hash(loginInfo.Password, response.Salt, function (err, hash) {
                if (response.Hash === hash) {
                    req.session.sessionInfo = {
                        UserName: response.UserName
                    };
                    res.json({ Operation: true });
                }
                else res.json({ Operation: false, Message: errorMsg });
            })
        }
        else res.json({ Operation: false, Message: errorMsg });
    });

});

app.delete('/user/:userName', checkSignIn, function (req, res) {

    User.deleteOne({ UserName: req.params.userName }, function (err, response) {
        if (response.n !== 0 && err === null) res.json({ Operation: true });
        else res.json({ Operation: false, Message: "Não foi possível remover o usuário." });
    });
})

app.listen(3001);


