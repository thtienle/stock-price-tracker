import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const yourBearerToken = "";

// Setting EJS template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static file
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
