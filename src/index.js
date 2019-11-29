const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');

// Initializations 
const app = express();
require('./database');
require('./config/passport');


// Settings 
app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use(require('./routes/articles'));
app.use(require('./routes/users'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server is Listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
