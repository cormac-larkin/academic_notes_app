require('dotenv').config();

const express = require("express");
const passport = require('passport');
const session = require('express-session');
const userRoutes = require("./routes/userRoutes");
const { sequelize } = require("./database/models");

const store = new session.MemoryStore();

const app = express();
const PORT = 3000;

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: (60000 * 30) },
    saveUninitialized: false,
    resave: false,
    store
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// Routes to use
app.use('/users', userRoutes);


app.listen(PORT, async () => {
    await sequelize.sync({ force: true });
    console.log('*** Database Synced ***');
    console.log(`*** Server listening on http://localhost:${PORT} ***`);
});

