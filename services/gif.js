// const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// const getGifUrls = (searchStr, cb) =>{

//     const apiKey = 'uDbAwYnCUT9uP4l50rUhKQCOaubt4SK8';
//     const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchStr}`;

//     const request = new XMLHttpRequest();
//     request.open('GET', url);
//     request.addEventListener('load', e =>{
//         const obj = JSON.parse(e.currentResponse.data);
//         const arr = [];
//         obj.data.forEach( o => arr.push(o.images.original.url) );
//         cb(arr);
//     });
//     request.send();
// }


const request = require('request');

const getGifUrls = (searchStr, cb) =>{
    const apiKey = 'uDbAwYnCUT9uP4l50rUhKQCOaubt4SK8';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchStr}`;

    request(url, (err, res, body) =>{
        if(err) console.log("Error Code:", res.statusCode);

        const obj = JSON.parse(body);
        const arr = [];
        obj.data.forEach( o => arr.push(o.images.original.url) );
        cb(arr);
    });
}

module.exports = {getGifUrls};

