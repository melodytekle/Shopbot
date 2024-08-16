/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export function seed(knex) {
  return knex("orders")
    .del()
    .then(() => {
      return knex("orders").insert([
        {
          status: "Shipped",
          tracking_number: "123456789",
          items: JSON.stringify([
            { productId: 1, name: "Product 1", quantity: 2, price: 19.99 },
            { productId: 2, name: "Product 2", quantity: 1, price: 29.99 },
          ]),
        },
        {
          status: "Processing",
          tracking_number: "987654321",
          items: JSON.stringify([
            { productId: 3, name: "Product 3", quantity: 1, price: 49.99 },
          ]),
        },
      ]);
    });
}
