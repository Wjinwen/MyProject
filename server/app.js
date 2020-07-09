const express =require("express");
let server=express();

server.get("/index",function(request,response,next){
    response.header({
        "Content-Type":"text/html;charset=utf-8"
    })
    response.end("welcome index");
})

server.get("/reg",function(request,response,next){
    response.header({
        "Content-Type":"text/html;charset=utf-8"
    })
    response.end("welcome reg");
})

server.get("/login",function(request,response,next){
    response.header({
        "Content-Type":"text/html;charset=utf-8"
    })
    response.end("welcome login");
})

server.listen(8001,function(){
    console.log("8001 服务已启动")
})