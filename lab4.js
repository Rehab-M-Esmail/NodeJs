const {Client} = require('pg');
const client = new Client({
    user: 'postgres', 
  host: 'localhost',
  database: 'my_database',
  password: 'postgres',
  port: 5432,
});
async function run() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    // Create a users table (if not exists)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        age INT,
        city VARCHAR(100)
      );
    `);

    // Insert a new user
    await client.query(
      'INSERT INTO users (name, age, city) VALUES ($1, $2, $3)',
      ['Charlie', 35, 'Chicago']
    );

    const res = await client.query('SELECT * FROM users');
    console.log('Users:', res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();