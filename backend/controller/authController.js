const jwt = require('jsonwebtoken');
const sql = require('mssql');
const bcrypt = require('bcrypt');

async function signup(req, res) {
    const { email, fname, lname, password } = req.body;


    await bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(400).send(err);
        }

        sql.query(`
            USE SERVERDB;

            INSERT INTO USERS (USR_EMAIL, USR_FNAME, USR_LNAME, USR_PW)
            VALUES ('${email}', '${fname}', '${lname}', '${hash}')
        `)
            .then(success => res.status(201).send('User created'))
            .catch(err => res.status(400).send(err));
    });
};

async function login(req, res) {
    const { email, password } = req.body;

    const result = await sql.query(`
        USE SERVERDB;

        SELECT * FROM USERS
        WHERE USR_EMAIL = '${email}'
    `);

    const user = result.recordset[0];

    if (!user)
        return res.status(400).send('No User By That Email');

    bcrypt.compare(password, user.USR_PW, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(400).send("bruh moment");
        }
            
        if (!result)
            return res.status(400).send('Invalid Credentials');

        jwt.sign({ email: user.EMAIL }, process.env.JWT_SECRET, { expiresIn: '3d' })
            .then(token => res.status(200).json({ token }));
})
};

module.exports = { signup, login };