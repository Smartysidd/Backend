const db = require("../config/db");

const User = {
  create: async (username, email, passwordHash) => {
    const [result] = await db.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, passwordHash]
    );
    return result;
  },

  findByEmail: async (email) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }
};

module.exports = User;
