export const up = (knex) => {
    return knex.schema.createTable("task", (table) => {
      table.uuid("id").primary();
      table.string("name").notNullable();
      table.float("cost").nullable();
      table.timestamp("deadline").nullable();
      table.integer("order").defaultTo(0);
    });
  };
  
  export const down = (knex) => {
    return knex.schema.dropTable("task");
  };