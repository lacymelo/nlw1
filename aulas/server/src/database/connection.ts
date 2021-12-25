import knex from 'knex';
//para unir caminhos
import path from 'path'

/**
 * ##### OBSERVAÇÕES #####
 * esta é a conexão com o banco de dados
 * __dirname -> retorna o diretório do arquivo em que uma variável esteja sendo executada
 */

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;

// Migrations = Histórico do banco de dados