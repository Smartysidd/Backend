const app = require("./app");
const dotenv = require("dotenv");
const userRoutes = require("./routes/authRoutes");
dotenv.config();

const PORT = process.env.PORT || 5000;
app.use("/api/users", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
