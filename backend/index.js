require("dotenv").config();

const sql = require("mssql");
const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    
    driver: process.env.DB_DRIVER,
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
        encrpt: false
    }
};

async function connectDB() {
    const result = await sql.connect(sqlConfig);
}

connectDB();

const express = require("express");
const app = express();


app.get('/:id', (req, res) => {
    res.status(200).send('Working at ' + req.params.id);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening at Port ${process.env.PORT}`);
});


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);