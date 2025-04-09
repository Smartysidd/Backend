const express = require("express");
const router = express.Router();
const {
  rateProduct,
  getRatings
} = require("../controllers/ratingController");

router.post("/", rateProduct);
router.get("/:id", getRatings); // Get all ratings for a product

module.exports = router;
