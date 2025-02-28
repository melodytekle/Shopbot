/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("orders", (table) => {
    table.increments("id").primary();
    table.string("status").notNullable();
    table.string("tracking_number").notNullable();
    table.json("items").notNullable();
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("orders");
}
