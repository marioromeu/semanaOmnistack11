const connection = require('../database/connection');

module.exports = {

    async create(request,response) {
    
        const {title, description, value} = request.body;

        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
    
        return response.json({id});
    },

    async index(request,response) {   
        const {page = 1} = request.query;
        const ong_id_logged = request.headers.authorization;
        
        if (ong_id_logged != null) { 

            const [count] =  await connection('incidents').count();

            response.header('X-Total-Count', count['count(*)']);

            const incidents = 
                await connection('incidents') 
                    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
                    .limit(5)
                    .offset( (page-1) * 5)
                    .select([
                        'incidents.*',
                        'ongs.name',                        
                        'ongs.email',
                        'ongs.whatsapp',
                        'ongs.city',
                        'ongs.uf'
                    ]);

            return response.json(incidents);
        }else {
            return response.status(401).send({error:"User not Logged"});
        }
    },

    async delete(request,response) {  

        const ong_id_logged = request.headers.authorization;
        const {id} = request.params;

        console.log(id);

        const {ong_id} = await connection('incidents').select('ong_id').where('id', id).first();

        console.log(ong_id);
        console.log(ong_id_logged);

        if(ong_id != ong_id_logged) {
            return response.status(401).json({error:'Operation Not Permitted'});
        } else {        
            await connection('incidents').where('id', id).delete();
        }

        return response.status(204).send();

    }

};