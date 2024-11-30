
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('username').notNullable().unique(); // Nome de usuário único
      table.string('email').notNullable().unique(); // Email único
      table.string('password').notNullable(); // Senha criptografada
      table.timestamps(true, true); // Created_at e updated_at
  });
}

export async function down(knex) {
  return knex.schema.dropTable('users');
}
