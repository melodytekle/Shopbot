/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
import bcrypt from "bcryptjs";

export async function seed(knex) {
  await knex("users").del();
  await knex("users").insert([
    {
      id: 1,
      fName: "John",
      lName: "Doe",
      email: "john@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "admin",
    },
    {
      id: 2,
      fName: "Jane",
      lName: "Smith",
      email: "jane@example.com",
      password: await bcrypt.hash("password123", 10),
      role: "user",
    },
  ]);
}
