import Knex from 'knex';

export async function seed (knex: Knex){
    await knex('clients').insert([
        {
            name: 'hugo lelio',
            record_date: '16-12-2020',
            phone:'85 996434504',
            gender: 'Masculino',
            email: 'hugo@gmail.com',
            birth: '18/08/1988',
            age: 31,
        },
        {
            name: 'Thuany Lima',
            record_date: '17-12-2020',
            phone:'85 97755704',
            gender: 'Feminino',
            email: 'thuanyrodrigues@gmail.com',
            birth: '17/02/1988',
            age: 23,
            
        },
        {
            name: 'Shirley Maria',
            record_date: '01-01-2021',
            phone:'85 996333333',
            gender: 'Feminino',
            email: 'shirleylrj@gmail.com',
            birth: '02/02/1985',
            age: 35,
        },
        {
            name: 'Cavalcante Neto',
            record_date: '04-01-2021',
            phone:'85 99666666',
            gender: 'Masculino',
            email: 'netofcl@gmail.com',
            birth: '10/10/1989',
            age: 31,
        },
    ]);
}
