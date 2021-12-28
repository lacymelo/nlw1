import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

    // filtra por: cidade, uf, items
    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query;

        //trim é para limpar espaços em branco
        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*'); 

        return res.json(points);

    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return res.status(400).json({message: 'Point not found.'})
        }

        /**
         * SELECT * items
         * JOIN point_items 
         * ON item.id = point_items.item_id
         * WHERE point_items.point_id = {id}
         */
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id' )
            .where('point_items.point_id', id);

        return res.json({ point, items });
    }

    async create(req: Request, res: Response){
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;

        /**
         * caso o primeiro insert falhe, o segundo não
         * será executado
         */
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }

        // inserte de novo ponto
        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];
        /**
         * percorre os items, monta o array de items ligados aum ponto
         */
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        })

        /**
         * inserte na tabela point_items
         */
        await trx('point_items').insert(pointItems);

        //caso tudo esteja correto, o insert terá o commit executado
        await trx.commit();

        return res.json({
            id: point_id,
            ...point
        });
    }
}

export default PointsController;
