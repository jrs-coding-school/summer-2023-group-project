/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates reports table
exports.up = function(knex) {
  return knex.schema.createTable('reports', function(table) {
    table.increments('id').primary();
    table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('address', 255).notNullable();
    table.string('zipcode', 10).notNullable();
    table.string('city', 50).notNullable();
    table.string('county', 50).notNullable();
    table.string('state', 50).notNullable();
    table.string('lat', 50).notNullable();
    table.decimal('lon', 50).notNullable();
    table.text('description').notNullable();
    table.boolean('isOngoing').notNullable()
    table.integer('crimeId').notNullable().references('id').inTable('crimes').onDelete('CASCADE');
    table.datetime('datetime').notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// drops reports table
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('reports')
};
