// importar conexão do banco
const { Pool } = require('pg');

const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool(
    {
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    }
);


module.exports = { pool };