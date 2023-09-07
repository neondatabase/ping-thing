const { neon } = require('@neondatabase/serverless');

module.exports = {
  sql: neon(process.env.DATABASE_URL),
};
