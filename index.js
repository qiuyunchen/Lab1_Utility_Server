const {add, subtract, multiply, divide} = require('./services/math');
const {getGifUrls} = require('./services/gif');

const express = require('express');
const app = express();
const port = 3000;

// --------- HELPER FUNCTION
const beautifyJSON = (str) =>{
    const blockquote = `<blockquote style='margin-inline-start:20px;margin-block-start:0em;margin-block-end:0em'>`;
    const str0 = `{${blockquote} ${str.slice(1,-1)} </blockquote> }`;
    
    const newStr = str0.split('"').join(' ')
        .split('String : ').join("String: '")
        .split(" , sum").join("', sum")
        .split(' :').join(': ')
        .split(',').join(', <br>')
        .split(': {').join(`: {${blockquote}`)
        .split('},').join('</blockquote> },')
    
    return newStr;
}

// --------- SERVER FOR CLUELESS USER
app.get('/', (req,res)=>{
    res.send(`You may only request data using /math/ or /gif/ ...`);
});

// --------- SERVER FOR MATH ROUTES ---------
app.get('/math', (req,res) =>{
    res.send(`
    <p> Please specify math operation: </p>
    <p> add/, subtract/, multiply/, or divide/ </p>
    <p> and provide inputs for the operation! </p>`);
});

// --------- ADD PATH
app.get('/math/add', (req, res) =>{
    const keys = Object.keys(req.query);
    const nums = [];

    keys.forEach(key =>{
        const num = parseInt(req.query[key]);
        nums.push(num);
    });

    const json = {};

    if (nums.includes(NaN)){
        json.error = "'You passed a non-number value into the parameters.'";
    } else {
        json.input = {};
        keys.forEach( (key, i) =>{
            json.input[key] = nums[i];
        });

        json.sumString = nums.join(' + ');

        [...args] = nums;
        json.sum = add(...args);
    }
    const str = JSON.stringify(json);
    res.send( beautifyJSON(str) );
});

// app.get();

// app.get();

// app.get();

// --------- SERVER FOR GIF SEARCH ROUTE
// app.get();

// --------- SERVER PORT CONNECTION
app.listen(port, ()=>{
    console.log(`The server is listening to port ${port}`);
});
