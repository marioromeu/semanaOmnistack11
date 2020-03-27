const connection = require('../database/connection');

module.exports = {

    async index(request,response) {    
        const ong_id_logged = request.headers.authorization;
        console.log(ong_id_logged);
        
        if (ong_id_logged != null) {
            const incidents = await connection('incidents').select('*').where('ong_id', ong_id_logged);
            return response.json(incidents);
        } else {
            return response.status(401).send({error:"User not Logged"});            
        }
    },

};