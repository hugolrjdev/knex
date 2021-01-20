import express, {request, response} from 'express'; 
import knex from './database/connections';

const routes = express.Router();

import './server';



/*routes.get('/clients', async (request, response)=>{

    const clientslist = await knex('clients').select('*');
    return response.json({clientslist});
// vai retornar o codigo dentro da rota
}); */// Listagem de todos os dados da tabelas clientes


routes.get('/clients', async (request, response)=>{

    const clientslist = await knex('clients').select('id', 'name', 'phone', 'age')/*.then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });*/ // vai exbir o codigo somente dentro do nodejs console.log usar somente em caso de testes por enquento

    const dependentList = await knex('clients')
    .innerJoin('clients_dependents', 'clients.id', '=', 'clients_dependents.id').then(data=>{
        console.log(data)
    }).catch(err => {
        console.log(err);
    });



    return response.json({dependentList});
});

routes.get('/clientsjoin', async (request, response)=>{

    const clients = await knex('clients').select()

    const clientsMap = clients.map(client =>{
        console.log(client)
    })

    return response.json({clientsMap});

});


routes.get('/clientsjoin/:id', async (request, response)=>{
    const id = Number(request.params.id); 

    const client = await knex('clients').where('id', id).first();

    if(!client){
        return response.status(400).json('Client Not Found!');
    }

    const dependents = await knex('dependents')
    .join('clients_dependents', 'dependents.id', '=', 'clients_dependents.dependent_id') // confirme dentro de clients_dependents se dependents.id é igual a clients_depenendents.depenendent_id
    .where('clients_dependents.client_id', id); //mostre o client_id que seja igual ao id passado no params

    return response.json({client, dependents});
})

routes.get('/clients/:id', async (request, response)=>{

    const id = Number( request.params.id );
    const client = await knex('clients').where({id: id}).first();
    return response.json(client);
});


routes.put('/clients/:id', async (request, response)=>{

    const id = Number( request.params.id );
    const clientId = await knex('clients').where({id: id}).update({age: 25, email: "albermft@gmail.com"});
    return response.json(clientId);
});

routes.delete('/clients/:id', async (request, response)=>{
    const id = Number( request.params.id );
    const clientIdDel = await knex('clients').where({id: id}).delete();
    return response.json(clientIdDel);
});

routes.get('/clientsold', async (request, response)=>{
    const listOld = await knex('clients').select('*')
        //.where({name: "Hugo Lélio"}) // seleciona exatamente o que é pedido, se remover nesse caso passa a mostrar as varias opções do condicional a baixo,NÂO MISTURAR DOIS WHERE esse codigo é para testar as facilidades do knex
        .whereRaw("name = 'Hugo Lélio' OR age <= 31").then(data => {
            console.log(data);
        }).catch(err => {
            console.log(err);
        });
    return response.json({listOld});
});


routes.get('/clients-order-by', async (request, response)=>{
    const clientsList = await knex('clients').select('*').orderBy('name', 'asc'); // "desc" ordena do maior para o menor "asc" ordena do menor para o maior // Não trata CaseSentive 
    return response.json({clientsList});
});


routes.get('/clients_dependents/:id', async ( request, response )=>{

    const id = Number(request.params.id);

    const clientInsert = await knex('clients').where('id', id);

    return response.json({clientInsert});

});

routes.post('/insert-dependent', async (request, response)=>{

    const {
        name,
        record_date,
        phone,
        gender,
        email,
        birth,
        age,
        dependent,
        name_dependent,
        age_dependent,
    } = request.body;

    const depentent = [{
        name_dependent,
        age_dependent,
    }]

    const client = {
        name,
        record_date,
        phone,
        gender,
        email,
        birth,
        age,
    }


    const insertClient = await knex('clients').insert(client);
    const idClient = insertClient[0];
    const insertdependent = await knex('dependents').insert(depentent);
    const idDependent = insertdependent[0];

    await knex('clients_dependents').insert(
       [{ client_id:idClient,
        dependent_id:idDependent}]
    );

    return response.json({
        insertClient,
        insertdependent
    });
});


routes.post('/clients_dependents/:id', async (request, response)=>{
    const id = Number(request.params.id);

    const {
        name_dependent,
        age_dependent,
        client_id,
        dependent_id
    } = request.body;

    const dependent = {
        name_dependent,
        age_dependent
    }

    const dependentExtra = await knex('dependents').insert(dependent);
    const idDependent = dependentExtra;

    await knex('clients_dependents').insert(
        [{ client_id: id,
            dependent_id:idDependent}]
    );

    return response.json({idDependent});
})

/*
routes.get('/sqlpure', async (request, response) => {
    const sqlpure = await knex('clients').raw('SELECT * FROM name = "Hugo Lélio" ');
});*/


/*
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
         knex('clients').select('id', 'name', 'phone').then(data => {
            console.log(data);
        }) // uma query select dentro da query de insert ou seja após inserir ela exibe a mesma no console conforme campos selecionados.
        console.log(data);
    }).catch(err =>{
        console.log(err);
    });
    
    return response.json(console.log(insertClient));
})*/







export default routes;