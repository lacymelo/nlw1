import { Request, response, Response } from 'express';
import knex from '../database/connection';

class PointsController {
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
        // const trx = await knex.transaction()

        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }

        // inserte de novo ponto
        const insertedIds = await knex('points').insert(point);

        const point_id = insertedIds[0];
        if(point_id){
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
            await knex('point_items').insert(pointItems);

            return res.json({
                id: point_id,
                ...point

            });
        }else{
            return res.json({message: 'Error'});
        }
    }
}

export default PointsController;
