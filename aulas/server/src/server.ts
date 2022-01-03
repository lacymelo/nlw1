import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(cors());

//para entender o corpo da requisição como JSON
app.use(express.json());

//exportando o arquivo de rotas
app.use(routes);

//para acessar arquivos estáticos da api
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

//porta de execução
app.listen(3333); 