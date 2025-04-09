const db = require("../config/db");

const Product = {
  create: async (name, description, price, rating) => {
    const [result] = await db.execute(
      "INSERT INTO products (name, description, price, rating) VALUES (?, ?, ?, ?)",
      [name, description, price, rating]
    );
    return result;
  },

  getAll: async () => {
    const [rows] = await db.execute("SELECT * FROM products");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  },

  update: async (id, name, description, price, rating) => {
    const [result] = await db.execute(
      "UPDATE products SET name = ?, description = ?, price = ?, rating = ? WHERE id = ?",
      [name, description, price, rating, id]
    );
    return result;
  },

  delete: async (id) => {
    const [result] = await db.execute("DELETE FROM products WHERE id = ?", [id]);
    return result;
  }
};

module.exports = Product;
