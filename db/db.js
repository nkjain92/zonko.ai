const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? {
          rejectUnauthorized: false, // required to connect to Heroku Postgres without a certificate
        }
      : undefined,
});

module.exports = pool;
