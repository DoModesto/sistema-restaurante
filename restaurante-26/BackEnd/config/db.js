//Configuração da string de conexão com o banco de dados
const mysql = require("mysql2/promise");

const connection = mysql.createPool({  
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "restaurante_26"
});

module.exports = connection;
