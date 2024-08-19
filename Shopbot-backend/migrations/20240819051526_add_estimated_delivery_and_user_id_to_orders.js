/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.table("orders", (table) => {
    // Set a fake default date for mock data
    table.date("estimated_delivery").defaultTo("2024-12-01").notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.table("orders", (table) => {
    table.dropColumn("estimated_delivery");
    table.dropColumn("user_id");
  });
}
