import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

//para entender o corpo da requisição como JSON
app.use(express.json());

//exportando o arquivo de rotas
app.use(routes);

//para acessar arquivos estáticos da api
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

//porta de execução
app.listen(3333);