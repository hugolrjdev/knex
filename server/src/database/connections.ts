import knex from 'knex';
import path from 'path';
// conexão com o banco de dados
const connection = knex({
    client:'sqlite3',
    connection: {
        filename: path.resolve( __dirname, 'database.sqlite' ),
    },
    useNullAsDefault: true,
});

export default connection;
//Migrations = Histotorico do banco de dados
// Migrition server pra CRUD também

