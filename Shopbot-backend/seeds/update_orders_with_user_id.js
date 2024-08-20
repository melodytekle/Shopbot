/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function seed(knex) {
  return knex("orders")
    .where("tracking_number", "123456789")
    .update({ user_id: 1 })
    .then(() =>
      knex("orders")
        .where("tracking_number", "987654321")
        .update({ user_id: 1 })
    );
}
