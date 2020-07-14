const mysql = require("mysql");
let db = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    password: "root",
    database: "shasha" //还没创建库和表
});

//链接
function conn() {
    db.connect();
};
conn();

function exec(sql, params, callback) {
    db.query(sql, params, callback);
}

//支持primse的
function execAsync(sql, params) {
    return new Promise(function (resolve, reject) {
        db.query(sql, params, function (err, result) {
            if (err) {
                reject(err.message);
            }
            resolve(result)
        });
    })
}

function close() {
    db.resume(); //
}

module.exports = {
    exec,
    execAsync
}