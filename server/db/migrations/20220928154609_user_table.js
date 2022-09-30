/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user_table', table => {
    table.increments('id');
    table.string('first_name', 64).notNullable();
    table.string('last_name', 64).notNullable();
    table.string('user_name', 128).notNullable();
    table.string('password', 255).notNullable();
    table.timestamps(true, true); // adds created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_table');
};
