const express = require("express");
const userRoutes = require("./routes/userRoutes");
const { sequelize, User } = require("./models");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRoutes);


app.listen(PORT, async () => {
    await sequelize.sync({force: true});
    console.log('*** Database Synced ***');
    console.log(`*** Server listening on http://localhost:${PORT} ***`);
});

