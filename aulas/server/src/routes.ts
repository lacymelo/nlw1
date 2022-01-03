import express from "express";
import { celebrate, Joi, Segments } from "celebrate";

import multer from 'multer';
import multerConfig from './config/multer';

import ItemsController from "./controllers/ItemsController";
import PointsController from "./controllers/PointsController";

//index, show, create, update, delete

const routes = express.Router();
const upload = multer(multerConfig);


const itemsController = new ItemsController();
const pointsController = new PointsController();

//Rota: endereço completo da requisição
//Recurso: Qual entidades estamos acessando do sistema

//listar items
routes.get('/items', itemsController.index);
//criar um ponto
routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    }, {
        //para validar todos os campos ao mesmo tempo
        abortEarly: false,
    }),
    pointsController.create);
//busca por points por palavras chaves
routes.get('/points', pointsController.index);
//busca um point específico
routes.get('/points/:id', pointsController.show);

export default routes;