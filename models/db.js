//const Pool = require('pg').Pool;
//const { Pool } = require('pg');
import { Pool } from 'pg';

const pool = new Pool({
    user: "postgres",
    password: "Domo",
    host: "localhost",
    port: 5432,
    database: "pupsuser"
});

//module.exports = pool;
export default pool;