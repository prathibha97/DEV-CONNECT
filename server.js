require('dotenv').config();
const express = require("express");
const connectDB = require('./services/mongo')

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.get('/',(req, res)=>{
    res.send('Hello World!');
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
