import pg from "pg"
import env from "dotenv"

const db = new pgClient(
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
));
db.conntect();

db.on('error', (err) => (
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
)); 

export const query = (text, params) => db.query(text,params);
 