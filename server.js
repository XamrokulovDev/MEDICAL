const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./routers/medical.router"));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5152;

app.listen(PORT, () => {
    console.log(`Dastur ${PORT} da ishlamoqda...`);
});