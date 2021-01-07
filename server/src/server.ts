import express from 'express';
import routes from './routes';
import knex from './database/connections';

const app = express();

app.use( express.json() );
app.use( routes );

app.listen(3333, ()=>{
    console.log('🚀 BackEnd ok 200 🔥');
});