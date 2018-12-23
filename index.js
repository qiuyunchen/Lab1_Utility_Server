const {add, subtract, multiply, divide} = require('./services/math');
const {getGifUrls} = require('./services/gif');

const express = require('express');
const app = express();
const port = 3000;

// --------- SERVER FOR CLUELESS USER
app.get('/', (req,res)=>{
    res.send(`You may only request data using /math/ or /gif/ ...`);
});

// --------- SERVER FOR MATH ROUTES
app.get('/math', (req,res)=>{
    res.send(`Please specify math operation: 
    add, subtract, multiply, or divide`);
});

// app.get();

// app.get();

// app.get();

// app.get();

// --------- SERVER FOR GIF SEARCH ROUTE
// app.get();

// --------- SERVER PORT CONNECTION
app.listen(port, ()=>{
    console.log(`The server is listening to port ${port}`);
});
