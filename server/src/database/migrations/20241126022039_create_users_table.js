
export const up = (knex) => {
    return knex.schema.createTable("task", (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string("name").notNullable();
      table.float("cost").nullable(); 
      table.timestamp("deadline").nullable();  
      table.integer("order").defaultTo(0);  
  
      table.uuid("user_id").notNullable(); 
      table.foreign("user_id").references("id").inTable("users").onDelete("CASCADE");  // Chave estrangeira

    });
  };
  
  export const down = (knex) => {
    return knex.schema.dropTable("task");
  };
  