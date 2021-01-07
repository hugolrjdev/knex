import Knex from 'knex';
import { createTempVariable } from 'typescript';

export async function up (knex: Knex) {
    return knex.schema.createTable('dependents', table =>{
        table.integer('id').primary(); // id dependente
        table.string('name_dependent'); // nome dependente
        table.integer('age_dependent'); // idade dependente
    });
}

export async function down (knex: Knex) {
    return knex.schema.dropTable('dependents');
}