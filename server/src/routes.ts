import express from 'express'; 
import knex from './database/connections';

const routes = express.Router();

import './server';



/*routes.get('/clients', async (request, response)=>{

    const clientslist = await knex('clients').select('*');
    return response.json({clientslist});
// vai retornar o codigo dentro da rota
}); */// Listagem de todos os dados da tabelas clientes


routes.get('/clients', async (request, response)=>{

    const clientslist = await knex('clients').select('id', 'name', 'phone').then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    }); // vai exbir o codigo somente dentro do nodejs console.log usar somente em caso de testes por enquento
    return response.json(clientslist);
});


routes.post('/clients', async (request, response)=>{

    const {
        name,
        record_date,
        phone,
        gender,
        email,
        birth,
        age
    } = request.body;

    const client = {
        name,
        record_date,
        phone,
        gender,
        email,
        birth,
        age
    }

    const insertClient = await knex('clients').insert(client).then(data => {
        console.log(data);
    }).catch(err =>{
        console.log(err);
    });
    
    return response.json(console.log(insertClient));
})

export default routes;