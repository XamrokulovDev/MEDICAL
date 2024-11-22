const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", require("./routers/medical.router"));

const PORT = process.env.PORT || 5152;

app.listen(PORT, () => {
    console.log(`Dastur ${PORT} da ishlamoqda...`);
});