const express = require("express");
const db = require("./../lib/DBHelper");


let apiRouter = express.Router();
//注册
apiRouter.post("/reg", function (request, response, next) {
    let {
        uname,
        upwd,
        uemail
    } = request.body;
    let sql = "INSERT INTO `userinfo` (`uname`,`upwd`,`uemail`) VALUES (?,?,?);";
    let params = [uname, upwd, uemail];
    db.exec(sql, params, function (err, result) {
        if (err) {
            console.log("执行sql失败:" + err.message);
            response.json({
                msg: "注册失败",
                status: -1,
                info: err.message
            });
            return;
        }

        if (result.affectedRows >= 1) {
            response.json({
                msg: "注册成功",
                status: 1
            });
        } else {
            response.json({
                msg: "注册失败",
                status: 0
            });
        }
    });
})
//是否已经注册
apiRouter.get("/isReg", async function (request, response, next) {
    //1.得到用户名
    let {
        uname
    } = request.query; // request.query
    //2 准备sql语句
    let sql = 'SELECT * FROM userinfo WHERE uname= ? ;';
    //3. 准参数
    let parmas = [uname];
    //4.执行 判断结果
    let res = await db.execAsync(sql, parmas);
    if (res.length >= 1) {
        response.send('false'); // remote false 已经注册,
    } else {
        response.send('true'); // remote true 未注册,
    }
})


//登录
apiRouter.post("/login", async function (request, response, next) {
    //1.得到前端发送过来的数据
    let {
        uname,
        upwd
    } = request.body;
    //2.从数据里读取数据
    let sql = "SELECT `uId`,`uname` FROM userinfo WHERE uname=? AND upwd=?;"
    //准备参数
    let parmas = [uname, upwd];

    let result = await db.execAsync(sql, parmas);

    if (result.length >= 1) {
        //session属于 后台之间的传值
        request.session["users"] = result[0];
        response.json({
            msg: "登录成功",
            status: 1,
            data: result[0] //当前的登陆者的数据,发送到前端
        });
    } else {
        response.json({
            msg: "登录失败",
            status: 0
        });
    }
})


module.exports =apiRouter;
