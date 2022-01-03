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

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.10.165:3333/uploads/${point.image}`,
            }
        })

        return res.json(serializedPoints);

    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return res.status(400).json({message: 'Point not found.'})
        }

        const serializedPoint =  {
            ...point,
            image_url: `http://192.168.10.165:3333/uploads/${point.image}`,
        };

        /**
         * SELECT * items
         * JOIN point_items 
         * ON item.id = point_items.item_id
         * WHERE point_items.point_id = {id}
         */
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id' )
            .where('point_items.point_id', id);

        return res.json({ point: serializedPoint, items });
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
            image: req.file?.filename,
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

        // convertendo string em array de números
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
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
