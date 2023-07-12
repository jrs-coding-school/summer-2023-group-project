/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates crimes table
exports.up = function(knex) {
  return knex.schema.createTable('crimes', function(table) {
    table.increments('id').primary();
    table.string('type', 50).notNullable();
    table.string('subtype', 50).notNullable();
    table.integer('points').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//Drops crimes table
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('crimes')
};
