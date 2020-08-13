const mysql = require('mysql');

const db = mysql.createConnection({

/* host:"us-cdbr-iron-east-05.cleardb.net",
	user:"b24ce8a7f7fa6d",
	password:"7694df1d",
	database:"heroku_e27e0d4a5cacfd8" */
	host:"localhost",
	user:"root",
	password:"",
	database:"coeminna",
	multipleStatements: true
});

module.exports = db;
