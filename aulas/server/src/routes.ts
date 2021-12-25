import express from "express";

const routes = express.Router();

//Rota: endereço completo da requisição
//Recurso: Qual entidades estamos acessando do sistema

routes.get('/', (req, res) => {
    return res.json({ok: 'lacy'});
});

export default routes;