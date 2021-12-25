import express from 'express';
import routes from './routes';

const app = express();

//para entender o corpo da requisição como JSON
app.use(express.json());

//exportando o arquivo de rotas
app.use(routes);

//porta de execução
app.listen(3333);