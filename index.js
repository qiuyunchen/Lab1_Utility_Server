const {add, subtract, multiply, divide} = require('./services/math');
const {getGifUrls} = require('./services/gif');

const express = require('express');
const app = express();
const port = 3000;

// --------- HELPER FUNCTIONS
const beautifyJSON = (str) =>{
    const blockquote = `<blockquote style='margin-inline-start:20px;margin-block-start:0em;margin-block-end:0em'>`;
    const str0 = `{${blockquote} ${str.slice(1,-1)} </blockquote> }`;
    
    const newStr = str0.split('"').join(' ')
        .split('String : ').join("String: '")
        .split(" , sum").join("', sum")
        .split(" , diff").join("', diff")
        .split(" , product").join("', product")
        .split(" , quotient").join("', quotient")        
        .split(' :').join(': ')
        .split(',').join(', <br>')
        .split(': {').join(`: {${blockquote}`)
        .split('},').join('</blockquote> },')
    
    return newStr;
}
const beautifyArray = (arr) =>{
    const font = 'font-size:6px';
    const urls = arr.reduce( (acc, url) =>{
        return acc + `
        <a href='${url}' style='text-decoration:none;color:black'> 
            "${url}", 
        </a> 
        <br>
        `;
    }, '');
    
    const webResult = `
        <span style='${font}'> 
            [ 
        </span> 
        <br> 
            <blockquote style='${font};margin-inline-start:20px;margin-block-start:0em;margin-block-end:0em'> 
                ${urls} 
            </blockquote> 
        <span style='${font}'>
            ] 
        </span>`;

    return webResult;
}

// --------- SERVER FOR CLUELESS USER
app.get('/', (req,res)=>{
    res.send(`You may only request data using /math or /gif ...`);
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

    if (keys.length === 0) res.send(`You didn't pass in any arguments!!`);

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

// --------- SUBTRACT PATH
app.get('/math/subtract', (req, res)=>{
    const keys = Object.keys(req.query);
    const nums = [];

    if (keys.length === 0) res.send(`You didn't pass in any arguments!!`);

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

        json.subtractString = nums.join(' - ');

        [...args] = nums;
        json.difference = subtract(...args);
    }
    const str = JSON.stringify(json);
    res.send( beautifyJSON(str) );
});

// --------- MULTIPLY PATH
app.get('/math/multiply', (req, res)=>{
    const keys = Object.keys(req.query);
    const nums = [];

    if (keys.length === 0) res.send(`You didn't pass in any arguments!!`);

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

        json.productString = nums.join(' * ');

        [...args] = nums;
        json.product = multiply(...args);
    }
    const str = JSON.stringify(json);
    res.send( beautifyJSON(str) );
});

// --------- DIVIDE PATH
app.get('/math/divide', (req, res) =>{
    const keys = Object.keys(req.query);
    const nums = [];

    if (keys.length === 0) res.send(`You didn't pass in any arguments!!`);

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

        json.divideString = nums.join(' / ');

        [...args] = nums;
        json.quotient = divide(...args);
    }
    const str = JSON.stringify(json);
    res.send( beautifyJSON(str) );
});

// --------- SERVER FOR GIF SEARCH ROUTE ---------
app.get('/gif', (req, res)=>{

    const [key] = Object.keys(req.query);
    const searchTerm = req.query[key];

    if (!searchTerm){
        const error = `Please specify search query!
        <br> <br>
        in this format:
        <br>
        gif?s= whatever you want to search`;
        res.send(error);
    } else {
        getGifUrls(searchTerm.trim(), (arr) =>{
            res.send( beautifyArray(arr) );
        });
    }
});

// --------- SERVER PORT CONNECTION
app.listen(port, ()=>{
    console.log(`The server is listening to port ${port}`);
});