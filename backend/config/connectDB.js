
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

let pool;

async function connectDB() {
    if (!pool)
        try {
            pool = await sql.connect(sqlConfig);
            console.log("Database connected");
        } catch (err) {
            console.error("Database connection failed:", err);
            throw err;
        }
    return pool;
}

module.exports = connectDB;