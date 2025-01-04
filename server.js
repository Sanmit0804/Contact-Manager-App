const express = require('express');
const { errorHandler } = require('./middlewares/error.middleware');
const connectDb = require('./config/db.config');
const dotenv = require('dotenv').config();

connectDb();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/contacts", require('./routes/contact.routes'))
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`)
})
