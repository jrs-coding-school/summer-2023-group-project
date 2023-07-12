/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates notificationSettings table
exports.up = function(knex) {
  return knex.schema.createTable('notificationSettings', function(table) {
    table.increments('id').primary();
    table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('title', 100)
    table.integer('crimeId').notNullable().references('id').inTable('crimes').onDelete('CASCADE');
    table.string('zipcode', 10).notNullable();
    table.boolean('isMuted').notNullable().defaultTo(false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// drop notificationSettings table
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('notificationSettings')
};
