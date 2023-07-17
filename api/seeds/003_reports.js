/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const mockReportData = require('./data/mockReportData.json')
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('reports').del()
  await knex('reports').insert(mockReportData);
  // Correct the incrementing id to prevent conflict
  await knex.raw(`ALTER SEQUENCE reports_id_seq RESTART WITH ${mockReportData.length + 1}`)
};
