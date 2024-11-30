import knex from "../database/index.js";

export async function getUserByEmail(email) {
    return knex("users").where({ email }).first();
}

export async function createUser({ username, email, password }) {
    const [newUser] = await knex("users").insert({ username, email, password }).returning("*");
    return newUser;
}
