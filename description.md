# PostgreSQL Basics with Node.js

In this tutorial, we will learn the **basics of PostgreSQL** and how to interact with it using **Node.js**. PostgreSQL is a powerful, open-source relational database known for its reliability and performance.

---

## Steps:

1. **Install PostgreSQL** – Set up PostgreSQL on your system.
2. **Start the PostgreSQL Server** – Run PostgreSQL locally.
3. **Use the psql Shell** – Perform basic database operations.
4. **Connect PostgreSQL with Node.js** – Use the `pg` library to interact with the database.

---

## Installation

### **For Windows:**

Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/).  
During installation, you will set a password for the default PostgreSQL user (`postgres`).

### **For macOS (using Homebrew):**

```bash
brew install postgresql
```

### **For Linux (Ubuntu):**

```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
```

---

## Starting the PostgreSQL Server

After installation, start the PostgreSQL service:

```bash
# Start PostgreSQL (Windows)
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" start

# Start PostgreSQL (macOS & Linux)
brew services start postgresql
sudo systemctl start postgresql
```

To check if PostgreSQL is running, use:

```bash
psql -V
```

---

## Using the PostgreSQL Shell (`psql`)

### **1. Open the PostgreSQL shell:**

```bash
psql -U postgres
```

(If prompted, enter the password you set during installation.)

### **2. Create a new database:**

```sql
CREATE DATABASE my_database;
```

### **3. Switch to the new database:**

```sql
\c my_database
```

### **4. Create a table:**

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  city VARCHAR(100)
);
```

### **5. Insert data into the table:**

```sql
INSERT INTO users (name, age, city) VALUES ('Alice', 25, 'New York');
INSERT INTO users (name, age, city) VALUES ('Bob', 30, 'Los Angeles');
```

### **6. Retrieve all users:**

```sql
SELECT * FROM users;
```

### **7. Update a user's age:**

```sql
UPDATE users SET age = 26 WHERE name = 'Alice';
```

### **8. Delete a user:**

```sql
DELETE FROM users WHERE name = 'Bob';
```

### **9. Drop the table:**

```sql
DROP TABLE users;
```

---

## Connecting PostgreSQL with Node.js

To interact with PostgreSQL in a **Node.js application**, install the `pg` library:

```bash
npm install pg
```

Then, create a `server.js` file and add the following code:

```javascript
const { Client } = require('pg');

// PostgreSQL connection configuration
const client = new Client({
  user: 'postgres', // Change if needed
  host: 'localhost',
  database: 'my_database',
  password: 'postgres', // Replace with your actual password
  port: 5432, // Default PostgreSQL port
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

    // Retrieve all users
    const res = await client.query('SELECT * FROM users');
    console.log('Users:', res.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

run();
```

---

## Running the Node.js Application

Save the file and run the script using:

```bash
node server.js
```

Expected output:

```
Connected to PostgreSQL
Users: [ { id: 1, name: 'Charlie', age: 35, city: 'Chicago' } ]
```

---
