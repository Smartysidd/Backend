const Rating = require("../models/Rating");

const rateProduct = async (req, res) => {
  const { user_id, product_id, rating } = req.body;

  console.log("👉 Incoming Rating Data:", req.body); // log karne ke liye
  try {
    await Rating.rateProduct(user_id, product_id, rating);
    res.json({ message: "Rating submitted successfully" });
  } catch (err) {
    console.error("❌ Error in rateProduct controller:", err); // 🧨 This will show us real error
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.getRatingsForProduct(req.params.id);
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { rateProduct, getRatings };
