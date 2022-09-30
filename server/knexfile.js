// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const postgresServer = process.env.DB_CONNECTION_STRING;
module.exports = {
  development: {
    client: 'pg',
    connection: postgresServer,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user: 'username',
  //     password: 'password',
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations',
  //   },
  // },
};
