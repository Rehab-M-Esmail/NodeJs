const { Pool } = require('pg');
const pgPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blog',
  password: 'password224',
  port: 5432,
});


const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const result = await pgPool.query('SELECT * FROM authors');
        res.send(result.rows);
    }
    catch (err) {
        console.log("Error with connecting to database");}
    });

router.get('/:id', async (req, res) => {
    try {
        const result = await pgPool.query(`SELECT * FROM authors WHERE id = ${req.params.id}`);
        if (result.rows.length == 0) {
            res.status(404).send(`Author with ID = ${req.params.id} is not found`);
            return;
        }
        res.send(result.rows[0]);
    }
    catch (err) {
        console.log("Error with connecting to database");}
});

router.post('/', async (req, res) => {
    try {
        if (!req.body.name) {
            res.status(400).send("There's no name to add");
            return;
        }
        const result = await pgPool.query(`INSERT INTO authors (name) VALUES ('${req.body.name}') RETURNING *`);
        res.status(200).send(result.rows[0]);
    }
    catch (err) {
        console.log("Error with connecting to database");}
});

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.name) {
            res.status(400).send("There's no name to update");
            return;
        }
        const result = await pgPool.query(`UPDATE authors SET name = '${req.body.name}' WHERE id = ${req.params.id} RETURNING *`);
        if (result.rows.length == 0) {
            res.status(404).send(`Author with ID = ${req.params.id} is not found`);
            return;
        }
        res.send(result.rows[0]);
    }
    catch (err) {
        console.log("Error with connecting to database");}
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await pgPool.query(`DELETE FROM authors WHERE id = ${req.params.id} RETURNING *`);
        if (result.rows.length == 0) {
            res.status(404).send(`Author with ID = ${req.params.id} is not found`);
            return;
        }
        res.send(result.rows[0]);
    }
    catch (err) {
        console.log("Error with connecting to database");}
});
module.exports = router;