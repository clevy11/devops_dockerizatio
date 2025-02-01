const express = require("express");
const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const result = await req.pool.query(
      `SELECT * FROM ${process.env.DB_TABLENAME}`
    );
    res.json(result.rows); // ✅ PostgreSQL uses .rows
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal server error");
  }
});

// POST - Add a new user
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send("All fields are required");
  }

  try {
    const checkResults = await req.pool.query(
      `SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE email = $1`,
      [email]
    );

    if (checkResults.rows[0].count > 0) {
      return res.status(409).send("User already exists");
    }

    const insertResults = await req.pool.query(
      `INSERT INTO ${process.env.DB_TABLENAME} (name, email) VALUES ($1, $2) RETURNING *`,
      [name, email]
    );

    res.status(201).json(insertResults.rows[0]);
  } catch (error) {
    console.error("Error inserting data: ", error);
    res.status(500).send("Internal server error");
  }
});

// PUT - Update an existing user
router.put("/", async (req, res) => {
  const { id, name, email } = req.body;

  if (!id || !name || !email) {
    return res.status(400).send("All fields are required");
  }

  try {
    const checkIfUserExists = await req.pool.query(
      `SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE id = $1`,
      [id]
    );

    if (checkIfUserExists.rows[0].count === 0) {
      return res.status(404).send("User does not exist.");
    }

    await req.pool.query(
      `UPDATE ${process.env.DB_TABLENAME} SET name = $1, email = $2 WHERE id = $3`,
      [name, email, id]
    );

    res.status(200).json({ id, name, email });
  } catch (error) {
    console.error("Error updating data: ", error);
    res.status(500).send("Internal server error");
  }
});

// DELETE - Remove a user
router.delete("/", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).send("ID is required");
  }

  try {
    const checkIfUserExists = await req.pool.query(
      `SELECT COUNT(*) AS count FROM ${process.env.DB_TABLENAME} WHERE id = $1`,
      [id]
    );

    if (checkIfUserExists.rows[0].count === 0) {
      return res.status(404).send("User does not exist.");
    }

    await req.pool.query(
      `DELETE FROM ${process.env.DB_TABLENAME} WHERE id = $1`,
      [id]
    );

    res.status(200).send(`User with id ${id} deleted successfully`);
  } catch (error) {
    console.error("Error deleting data: ", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
