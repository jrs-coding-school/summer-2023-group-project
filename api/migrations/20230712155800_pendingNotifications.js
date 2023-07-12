/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates pendingNotifications table
exports.up = function(knex) {
  return knex.schema.createTable('pendingNotifications', function(table) {
    table.increments('id').primary();
    table.integer('reportId').notNullable().references('id').inTable('reports').onDelete('CASCADE');
    table.integer('userId').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.boolean('isRead').notNullable().defaultTo(false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// drops pendingNotifications table
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('pendingNotifications')
};
