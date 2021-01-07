import Knex from 'knex';

export async  function seed(knex: Knex){

    await knex('dependents').insert([
        { name_dependent: 'Valentina Lélio', age_dependent: 3, },
        { name_dependent: 'Sophia Estelita', age_dependent: 11,},
    ]);
}