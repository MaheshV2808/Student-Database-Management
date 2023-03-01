const mysql = require('mysql');
require("dotenv").config();
var connection = mysql.createConnection({
    host : process.env.DBHOST,
    user : process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DATABASENAME,
    multipleStatements : true
});

//connect to database
connection.connect((error)=>{
    if(!error){
        console.log('Connected!');
    }
    else{
        console.log("Connection Failed!",error);
    }
});

module.exports = connection;