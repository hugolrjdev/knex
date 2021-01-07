import knex from 'knex' ;

export async function up(knex: knex) {

    //CRIAR A TABELA
       /* CAMPOS DA TABELA
        table.string  // texto
        table.decimal // numero decimal
        table.integer // numero inteiro
        table.date // datas
        */

    return knex.schema.createTable('clients', table => {
        table.increments('id').primary(); // id Cliente
        table.string('name').notNullable(); // nome
        table.date('record_date').nullable(); // data do registro do lead
        table.string('phone').notNullable(); // telefone
        table.string('gender').nullable(); // genero
        table.string('email').nullable(); // email
        table.date('birth').nullable(); // anivesário
        table.integer('age').nullable(); // idade
    });
}


export async function down(knex: knex) {
    // VOLTAR ATRÁS, (REMOVER O QUE FIZEMOS NO UP)
    return knex.schema.dropTable('clients');
}