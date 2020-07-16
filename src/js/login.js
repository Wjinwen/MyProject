$(function(){
    $("form").validate({
        //规则
        rules: {
            uname: {
                required: true
            },
            upwd: {
                required: true
            }
        },
        //消息提示
        messages: {
            uname: {
                required: "请填写用户名"
            },
            upwd: {
                required: "请填写密码"
            }
        },
        //提交 等价于 onsubmit
        submitHandler(form) {
            var dataStr = $(form).serialize();
            $.ajax({
                url: "http://127.0.0.1:8585/api/login", // url地址
                data: dataStr, // 参数
                async: true, //异步
                type: "post", //请求方式
                dataType: "json", //返回的数据格式
            }).done(function (res) {
                console.log(res)
                console.log(res.token)
                if (res.status) {
                    //localStorage  5M  不手动清除,永远存在浏览器里
                    // 它也只能存储 字符串
                    //当前的登陆者的信息保存到  本地存储
                    localStorage.setItem('users', JSON.stringify(res.data));
                    localStorage.setItem("token", res.token);
                }
                console.log(localStorage)
                layer.msg(res.msg);
                setTimeout(function(){
                   javascrtpt:window.location.href='http://localhost:8585/index.html'
                },1000)
            })

            return false;
        }

    })
})