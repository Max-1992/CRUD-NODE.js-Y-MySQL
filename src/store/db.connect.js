const mySql = require('mysql');
const { promisify } = require('util');

let mySqlConnection = mySql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER_DB,
    password : process.env.PASSWORD_DB,
    database : process.env.DATABASE
});

mySqlConnection.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`Database is connected on`, `${process.env.HOST}`.green);
    }
});

// Promisify DBconnection Qurys.
mySqlConnection.query = promisify(mySqlConnection.query);

module.exports = mySqlConnection;