var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cookieSession = require("cookie-session");
var logger = require('morgan');
var jwt = require("jsonwebtoken");

//路由模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require("./routes/api");



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cookieSession({
  name: "youker.net",
  keys: ["aaa", 'bbb'],
  maxAge: 1000 * 60 * 20 // 有效时间20分钟
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './../src')));


app.use(function(request, response, next){
    response.setHeader("Access-Control-Allow-Origin", "*");
    next();
})
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use("*", function (request, resposne, next) {
  var reg = /^\/api\/.*/i;
  // if (reg.test(request.originalUrl)) {
  //访问带有 api的接口 ,login和reg是免 token校验
  if (request.originalUrl.includes("/api/login") || request.originalUrl.includes("/api/reg")||request.originalUrl.includes("/api/isReg")) {
    next();
  } else {
    //必须token校验
    //拦截 是否 token
    //request.headers.token 请求头里是否带有 token
    var token = request.headers.token || request.body.token || request.query.token;
    jwt.verify(token, require("./config/index").secret, function (err, code) {
      if (err) {
        //校验没通过,提示 重新登录
        resposne.json({
          msg: "token失效,请重新登录",
          status:-200
        })
      } else {
        next();
      }
    })
  }
  // }
})

app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;