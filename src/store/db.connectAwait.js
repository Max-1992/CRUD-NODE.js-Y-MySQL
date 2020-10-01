const mySql = require('mysql');
const { promisify } = require('util');

let mySqlConnection = mySql.createPool({
    host     : process.env.HOST,
    user     : process.env.USER_DB,
    password : process.env.PASSWORD_DB,
    database : process.env.DATABASE
});

mySqlConnection.getConnection((err, connection) => {
    if(err) {
        console.log(err);
    } else {
        connection.release();
        console.log(`Database is connected on`, `${process.env.HOST}`.green);
        return;
    }
});

// Promisify DBconnection Qurys.
mySqlConnection.query = promisify(mySqlConnection.query);

module.exports = mySqlConnection;