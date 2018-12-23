const getGifUrls = (searchStr, cb) =>{
    if (searchStr.trim() === '') return;

    const apiKey = 'uDbAwYnCUT9uP4l50rUhKQCOaubt4SK8';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchStr}`;

    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', e =>{
        const obj = JSON.parse(e.currentTarget.response);
        const arr = [];
        obj.data.forEach( o => arr.push(o.images.original.url) );
        cb(arr);
    });
    request.send();
}

module.exports = {getGifUrls};