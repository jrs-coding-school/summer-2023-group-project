/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const mockCrimeData = require('./data/mockCrimeData.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('crimes').del()
  await knex('crimes').insert(mockCrimeData);
};
