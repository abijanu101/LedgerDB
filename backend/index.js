require("dotenv").config();



// express boilerplate
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

// routes

app.use('/', require("./routes/auth"));
app.use('/', require("./routes/user"));

app.use((req, res) => {
    res.status(404).send('Route not found');
});

// sql connection
const connectDB = require("./config/connectDB");
connectDB().then(() =>
    app.listen(process.env.PORT, () => {
        console.log(`Listening at Port ${process.env.PORT}`);
    })
)
