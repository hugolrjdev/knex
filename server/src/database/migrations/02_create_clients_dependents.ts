import Knex from 'knex';

export async function up (knex: Knex){

return knex.schema.createTable('clients_dependents', table =>{
    table.increments('id').primary();

    table.integer('client_id')
    .notNullable()
    .references('id')
    .inTable('clients');

    table.integer('dependent_id')
    .notNullable()
    .references('id')
    .inTable('dependents');
});

}

export async function down (knex: Knex){
    return knex.schema.dropTable('clients_dependents');
}