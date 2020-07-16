const express = require("express");
const db = require("./../lib/DBHelper");
const md5 = require("md5");
const jwt = require("jsonwebtoken"); 
const secret = require("./../config").secret;
const fs = require("fs");


let apiRouter = express.Router();
//注册
apiRouter.post("/reg", function (request, response, next) {
    let {
        uname,
        upwd,
        uemail
    } = request.body;
    upwd=md5(upwd);
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
    upwd=md5(upwd);
    //2.从数据里读取数据
    let sql = "SELECT `uId`,`uname` FROM userinfo WHERE uname=? AND upwd=?;"
    //准备参数
    let parmas = [uname, upwd];

    let result = await db.execAsync(sql, parmas);

    if (result && result.length >= 1) {

        var token = jwt.sign(JSON.parse(JSON.stringify(result[0])), secret, {
            expiresIn: 60 * 60 * 24 //一天有效
        })
        //session属于 后台之间的传值
        request.session["users"] = result[0];
        response.json({
            msg: "登录成功",
            status: 1,
            data: result[0],//当前的登陆者的数据,发送到前端
            token //发送到前端
        });
    } else {
        response.json({
            msg: "登录失败",
            status: 0
        });
    }
})


apiRouter.get("/index", function (request, response, next) {
    response.json({
        msg: "查询成功",
        status: 1,
        data: JSON.parse(fs.readFileSync("./data/goodslist.json").toString())
    })
})



//加入购车
apiRouter.post("/addCart", async function (request, response, next) {
    var {
        uid,
        gid,
        gtitle,
        gbrand,
        gnowpirce,
        giconimgsrc,
        num,
    } = request.body;
    //1.先查询数据库是否存在,
    let querySql = 'SELECT*FROM `carts` WHERE uid=? AND gid=?;';
    let queryPrams = [uid, gid]

    let queryResult = await db.execAsync(querySql, queryPrams);
    if (queryResult && queryResult.length >= 1) {
        //如果存在就只做数量的修改
        let updateSql = "UPDATE carts SET num=num+? WHERE `gid`=? AND `uid`=? and gstatus=1 ;";
        let updatePrams = [num, gid, uid];
        let udapteResult = await db.execAsync(updateSql, updatePrams);

        if (udapteResult && udapteResult.affectedRows >= 1) {
            response.json({
                msg: "加入购车成功u",
                status: 1
            })
        } else {
            // 状态为1的 数据不存在  就查找状态为0的 如果存在 就更改状态为1 
            let updateStatusSql = "UPDATE carts SET num=? , gstatus=1 WHERE `gid`=? AND `uid`=?;";
            let updateStatusResult = await db.execAsync(updateStatusSql, updatePrams);

            if (updateStatusResult && updateStatusResult.affectedRows >= 1) {
                response.json({
                    msg: "加入购车成功uu",
                    status: 1
                })}else{
                    response.json({
                        msg: "加入购车失败uu",
                        status: -1
                    })
                }
            
        }
            
        
    }else {
        //否则数据库没有,就做插入
        let insertSql = 'INSERT INTO `carts` (`gid`,`uid`,`gbrand`,gtitle,`gnowpirce`,`num`,`giconimgsrc`)';
        insertSql += 'VALUES(?,?,?,?,?,?,?);';
        let insertPrams = [gid, uid, gbrand, gtitle, gnowpirce, num, giconimgsrc,];
        console.log(insertPrams)
        let insertReuslt = await db.execAsync(insertSql, insertPrams);
        if (insertReuslt && insertReuslt.affectedRows >= 1) {
            response.json({
                msg: "加入购车成功i",
                status: 1
            })
        } else {
            response.json({
                msg: "加入购车失败i",
                status: -1
            })
        }

    }



})


//显示购物车
apiRouter.post("/getCart", async (request, response, next) => {
    //谁看谁的购物车
    let {
        uid
    } = request.body;

    let sql = "SELECT*FROM carts WHERE uid=? and gStatus=1;";
    let parmas = [uid];
    var result = await db.execAsync(sql, parmas);

    if (result && result.length >= 1) {
        response.json({
            msg: "查询成功",
            status: 1,
            data: result
        })

    } else {
        response.json({
            msg: "查询失败",
            status: 0
        })
    }
})

//修改数量
apiRouter.post("/changeCartNum", async (request, response, next) => {
    let {
        cid,
        num
    } = request.body;
    let sql = 'UPDATE carts SET num=? WHERE cid=? and gstatus=1';
    let params = [num, cid];
    let result = await db.execAsync(sql, params);

    if (result && result.affectedRows >= 1) {
        response.json({
            msg: "修改成功",
            status: 1
        })
    } else {
        response.json({
            msg: "修改失败",
            status: -1
        })
    }
})

//删除 ,不能进行物理,软删除,修改状态
apiRouter.post("/delete", async (request, response, next) => {
    let {
        cid
    } = request.body;
    let sql = 'UPDATE carts SET gstatus=0 WHERE cid=? ;';
    let params = [cid];
    let result = await db.execAsync(sql, params);

    if (result && result.affectedRows >= 1) {
        response.json({
            msg: "删除成功",
            status: 1
        })
    } else {
        response.json({
            msg: "删除失败",
            status: -1
        })
    }
})





module.exports =apiRouter;
