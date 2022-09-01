const passport = require('passport');
const LocalStrategy = require('passport-local');
const { User } = require("../database/models");
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
    done(null, user.email);
});


passport.deserializeUser(async (email, done) => {

    try {
        const user = await User.findOne({
            where: { email }
        });

        if (user) {
            done(null, user);
        }
    }

    catch {
        done(err, null);
    }


});


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        // Try to find User with matching email in database
        const user = await User.findOne({ where: { email: email } }, (err, user) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
        });

        // If user with this email is found, compare passwords
        const passwordHash = user.passwordHash;
        if (!await bcrypt.compare(password, passwordHash)) {
            return done(null, false);
        };

        // If both email and password match, return the User object
        return done(null, user);
    }
));