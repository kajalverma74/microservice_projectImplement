const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db");
const path = require("path");
const categoryRoutes = require("./routes/categoriesRoutes");

const subcategoriesRoutes = require("./routes/subcategoriesRoutes");

const app = express();
const PORT = 5000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json());

app.use("/api", categoryRoutes);

app.use("/api", subcategoriesRoutes);

connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Product Service started successfully is running on http://localhost:${PORT}`);
});
