// pages/api/some-api-route.js
import pool from "../../lib/db";

export default async function handler(req, res) {
  try {
    const client = await pool.connect();
    // your database operations...
    const result = await client.query("SELECT * FROM your_table");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Database query error", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    // Always release the client back to the pool
    client?.release();
  }
}
