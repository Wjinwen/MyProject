$(function(){
    //自定义规则
    //addMethod("规则名称",回调函数,"message");
    //添加邮箱规则
    $.validator.addMethod("checkEmail", function (val, ele, params) {
        //value 输入的值
        //ele 那个元素
        return /^\w+(\.\w+)*@\w+(\.\w+)*\.\w+$/.test($(ele).val())
        // console.log(arguments);
    }, "请检查内容是否正确");

    //添加用户名校验规则
    $.validator.addMethod("checkUser", function (val, ele, params) {
        //value 输入的值
        //ele 那个元素
        return /^[a-z]\w{5,17}$/.test($(ele).val())
        // console.log(arguments);
    }, "用户名不合法");

    $("form").validate({
        //规则
        rules: {
            uname: {
                required: true,
                rangelength: [6, 18],
                checkUser: true,
                remote: "http://127.0.0.1:8585/api/isReg"
            },
            upwd: {
                required: true,
                rangelength: [6, 18]
            },
            pwd: {
                equalTo: "#upwd"
            },
            uemail: {
                checkEmail: true
            },
            capcha:{
                equalTo: "#yzm"
            }


        },
        //消息提示
        messages: {
            uname: {
                required: "请填写用户名",
                rangelength: "长度为{0}-{1}位",
                remote: "该用户名已注册!"
            },
            upwd: {
                required: "请填写密码",
                rangelength: "密码长度为{0}-{1}位"
            },
            pwd: {
                equalTo: "两次密码不一致"
            },
            capcha:{
                equalTo: "验证码错误,请重新输入"
            }
        },
        //提交 等价于 onsubmit
        submitHandler(form){
            var dataStr = $(form).serialize();
            console.log(dataStr);
            if(!$(".must").prop("checked")){
                layer.msg('请阅读使用条款及隐私政策,同意后勾选');
                return;
            }
            $.ajax({
                url: "http://127.0.0.1:8585/api/reg", // url地址
                data: dataStr, // 参数
                async: true, //异步
                type: "post", //请求方式
                dataType: "json", //返回的数据格式
            }).done(function (res) {
                layer.alert(res.msg);
                setTimeout(function(){
                    javascrtpt:window.location.href='http://localhost:8585/login.html'
                },1000)
            })
            return false;
        }

    })
})