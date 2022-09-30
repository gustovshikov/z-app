/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE user_table CASCADE');
  await knex('user_table').del();
  await knex('user_table').insert([
    {
      first_name: 'Eric',
      last_name: 'Sheridan',
      user_name: 'esheridan',
      password: 'password',
    },
    {
      first_name: 'Steve',
      last_name: 'Wozniak',
      user_name: 'swozniak',
      password: 'password',
    },
    {
      first_name: 'John',
      last_name: 'Carmack',
      user_name: 'jcarmack',
      password: 'password',
    },
    {
      first_name: 'Neil',
      last_name: 'Armstrong',
      user_name: 'narmstrong',
      password: 'password',
    },
    {
      first_name: 'George',
      last_name: 'Washington',
      user_name: 'gwashington',
      password: 'password',
    },
  ]);
};
