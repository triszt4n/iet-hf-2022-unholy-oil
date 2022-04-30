const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const moment = require('moment');

moment.defaultFormat = "YYYY-MM-DD";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({
  secret: 'topscecret123456',
  resave: false,
  name: 'sessionId',
  saveUninitialized: true,
  cookie: { }
}))


//routing
require('./routes')(app);


//404route
app.use((req,res,next)=>{
  return res.render('notfound');
})

//error-handle
app.use((err,req,res,next)=>{
    console.log('error: ',err);
    return res.render('notfound');
});

var server = app.listen(3000, function () {
    console.log("On: 3000");
    console.log("Login: admin");
    console.log("Password: 123456")
});