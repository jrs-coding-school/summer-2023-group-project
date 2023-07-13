/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// Creates users table
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('username', 50).unique().notNullable();
    table.string('email', 150).unique().notNullable();
    table.string('password', 72).notNullable();
    table.string('firstname', 50).notNullable();
    table.string('lastname', 50).notNullable();
    table.string('zipcode', 10).notNullable();
    table.string('bio', 255)
    table.string('avatar', 255)
    table.integer('points').defaultTo(0);
    table.enu("role", ["admin", "user"]).nullable().defaultTo("user")
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// drops users table
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
