/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('item', table => {
    table.increments('id');
    table.string('item_name', 128).notNullable();
    table.string('description', 512).notNullable();
    table.integer('quantity', 128).notNullable();
    table.integer('user_id');
    table.foreign('user_id').references('user_table.id');
    table.timestamps(true, true); // adds created_at and updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('item');
};
