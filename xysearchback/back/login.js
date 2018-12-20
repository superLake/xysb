/*
 * @Author: sznews
 * @Date:   2018-12-17 10:17:40
 * @Last Modified by:   sznews
 * @Last Modified time: 2018-12-19 10:36:44
 */
$(function() {
    // 每刷新一次页面都要先获取一次验证码
    var serverdata;
    getScode();
    // console.log(serverdata);
    // 点击图片刷新验证码
    $('.scode-pic').on('click', function() {
        getScode();
    });

    //点击登录
    $('#login').click(function() {
        var scode = $.trim($('#scode').val());
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        var scodeResult = checkScode(scode);
        if (scodeResult.status) {
            console.log('验证码通过');
            login(formData, function(data, msg) {
                window.location.href = './list.html';
            }, function(errMsg) {
                alert(errMsg);
                getScode();
            });
        }
        alert(scodeResult.msg);
    });


    // 获取验证码
    function getScode() {
        var _this = this;
        gotScode(function(data,msg) {
            // data=data.toLowerCase();
            // console.log('验证码为：' + data + ',返回信息为：' + msg);
            // serverdata=data;
            // produceScode(data);
            // var imgurl=window.URL.createObjectURL(data);
            // console.log(data);
            $('.scode-pic').attr('src','data:image/gif;base64,'+data);
        }, function(errMsg) {
            alert('验证码获取异常，异常代码：' + errMsg);
            
        });
    };
    // 验证验证码
    function checkScode(data) {

        var formData={
            scode:data
        };
        console.log('data:'+formData.scode);
        var result={
            status:false,
            msg:''
        };
        checkedScode(formData,function(data,msg){
            result.status=true;
            result.msg=msg;
        },function(errMsg){
            result.msg=errMsg;
        });
    	// console.log('data:'+data+',serverdata:'+serverdata);
     //    var serverScode = serverdata;
     //    var result = {
     //        status: false,
     //        msg: ''
     //    };
     //    if (data !== serverScode) {
     //        result.msg = '验证码错误,请重新输入';
     //        serverdata=getScode();
     //        return result;
     //    }
     //    //通过验证
     //    result.status = true;
     //    result.msg = '验证通过';
        return result;
    };
})