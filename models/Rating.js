const db = require("../config/db");

const Rating = {
  rateProduct: async (userId, productId, ratingValue) => {
    // Check if rating exists
    const [existing = []] = await db.execute(
      "SELECT * FROM ratings WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (existing.length > 0) {
      await db.execute(
        "UPDATE ratings SET rating = ? WHERE user_id = ? AND product_id = ?",
        [ratingValue, userId, productId]
      );
    } else {
      await db.execute(
        "INSERT INTO ratings (user_id, product_id, rating) VALUES (?, ?, ?)",
        [userId, productId, ratingValue]
      );
    }

    // Update average rating in products table
    const [avgResult = []] = await db.execute(
      "SELECT AVG(rating) AS avgRating FROM ratings WHERE product_id = ?",
      [productId]
    );

    const avgRating = avgResult[0]?.avgRating || 0;

    await db.execute(
      "UPDATE products SET rating = ? WHERE id = ?",
      [avgRating, productId]
    );
  },

  getRatingsForProduct: async (productId) => {
    const [rows = []] = await db.execute(
      "SELECT * FROM ratings WHERE product_id = ?",
      [productId]
    );
    return rows;
  },
};

module.exports = Rating;
