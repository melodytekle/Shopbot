export function seed(knex) {
  return knex("orders")
    .del()
    .then(() => {
      return knex("orders").insert([
        {
          tracking_number: "123456789",
          status: "Shipped",
          estimated_delivery: "2024-12-01",
          user_id: 1,
          items: JSON.stringify([
            { productId: 1, name: "Hat", quantity: 2, price: 19.99 },
            { productId: 2, name: "Shirt", quantity: 1, price: 29.99 },
          ]),
        },
        {
          tracking_number: "987654321",
          status: "Processing",
          estimated_delivery: "2024-12-05",
          user_id: 1,
          items: JSON.stringify([
            { productId: 3, name: "Socks", quantity: 1, price: 49.99 },
          ]),
        },
      ]);
    });
}
