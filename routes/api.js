const express = require('express');
const router = express.Router();
const query = require('querystring');
const url = require('url');
const mysql = require('mysql');
const MongoClient = require('mongodb').MongoClient;
const tarUrl = "mongodb://119.27.186.189:27017/test";
const fs = require("fs");

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
router.get('/download/ssx-2.6.3.dmg', function (req, res) {
    fs.readFile("download/ssx-2.6.3.dmg", 'utf8', function (err, data) {
        res.end(data);
    });
});
router.post('/checkUpdate', function (req, res) {
    const {versionCode, versionName} = req.body;
    let result = {code: 200, message: "已是最新版本", data: {}};

    res.end(result);

});

router.post('/login', function (req, res, next) {

    const Body = req.body;
    const {username, password} = Body;
    let ref;
    //查
    MongoClient.connect(tarUrl, function (err, db) {
        if (err) throw err;

        const dbase = db.db("onemonth");
        // const myobj = { username: "gao", password: "1234" };

        const whereStr = {"username": username};  // 查询条件
        dbase.collection("user_info").find(whereStr).toArray(function (err, result) {
            if (err) {
                let respond = {code: 400, message: "登录失败", data: result[0]};

                res.send(JSON.stringify(respond));
                throw err;
            }
            if (!result[0]) {
                let respond = {code: 400, message: "账号不存在", data: result[0]};
                res.send(JSON.stringify(respond));
                return;
            }
            ref = result[0].password;
            if (ref === password) {
                let respond = {code: 200, message: "登录成功", data: result[0]};

                res.send(JSON.stringify(respond));
            } else {
                let respond = {code: 400, message: "账号密码不匹配", data: result[0]};
                res.send(JSON.stringify(respond));

            }


        });
    });

    let str = '';
    req.on('data', (string) => {
        str = str + string;
    });
    req.on('end', () => {
        const Post = query.parse(str);
    });

});
module.exports = router;
