require('dotenv').config();

const express = require("express");
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require("./routes/authRoutes");
const classRoutes = require("./routes/classRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { sequelize } = require("./database/models");

const store = new session.MemoryStore();

const app = express();
const PORT = 4000;

app.use(cors({ origin: true, credentials: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: ((60000 * 60) * 24)
    },
    saveUninitialized: false,
    resave: false,
    store
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// Routes to use
app.use('/auth', authRoutes);
app.use('/classes', classRoutes);
app.use('/notes', noteRoutes);


app.listen(PORT, async () => {
    await sequelize.sync({ force: true });
    console.log('*** Database Synced ***');
    console.log(`*** Server listening on http://localhost:${PORT} ***`);
});

