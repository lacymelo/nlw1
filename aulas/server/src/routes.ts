import express from "express";

import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";

//index, show, create, update, delete

const routes = express.Router();
const itemsController = new ItemsController();
const pointsController = new PointsController();

//Rota: endereço completo da requisição
//Recurso: Qual entidades estamos acessando do sistema

//listar items
routes.get('/items', itemsController.index);
//criar um ponto
routes.post('/points', pointsController.create);
//busca por points por palavras chaves
routes.get('/points', pointsController.index);
//busca um point específico
routes.get('/points/:id', pointsController.show);

export default routes;