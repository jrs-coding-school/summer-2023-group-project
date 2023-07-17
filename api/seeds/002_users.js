/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const mockUserData = require('./data/mockUserData.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert(mockUserData);
  // Correct the incrementing id to prevent conflict
  await knex.raw(`ALTER SEQUENCE users_id_seq RESTART WITH ${mockUserData.length + 1}`)
};
