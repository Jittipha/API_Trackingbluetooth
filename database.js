let mysql = require('mysql');

let dbCon = mysql.createConnection({
    host : '192.168.1.192',
    user : 'user',
    password : 'p12345678',
    database :'trackingbluetooth'

})

module.exports = dbCon;
