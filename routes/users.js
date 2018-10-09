const express = require('express');
const router = express.Router();
const query = require('querystring');
const url = require('url');
/* GET users listing. */
router.get('/', function (req, res, next) {
    //GET请求
    const parse = url.parse(req.url, true);
    const Get = parse.query;
    res.send('respond with a resource');
    //Post请求
    let str = '';
    req.on('data', (string) => {
        str = str + string;
    });
    req.on('end', () => {
        const Post = query.parse(str);
    });
});

module.exports = router;
