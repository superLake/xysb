/*
 * @Author: sznews
 * @Date:   2018-12-13 14:56:26
 * @Last Modified by:   sznews
 * @Last Modified time: 2018-12-19 16:23:59
 */
 var ifaceUrl='http://localhost:56083/'
// var ifaceUrl = 'http://172.16.140.123:10001/xysback/';
// Ajax异步请求
function request(param) {
    var _this = this;
    $.ajax({
        async: param.async || false,
        type: param.method || 'get',
        url: param.url || '',
        datatype: param.type || 'jsonp',
        data: param.data || '',
        success: function(res) {
            console.log('响应成功' + res);
            // if(''===res.status){
            //     typeof param.success==='function' && param.success(res);
            // }
            //请求成功
            if (0 === res.status) {
                typeof param.success === 'function' && param.success(res.data, res.msg);
            } else if (10 === res.status) {
                _this.doLogin();
            }
            //请求数据错误
            else if (1 === res.status) {
                console.log('status等于1');
                typeof param.error === 'function' && param.error(res.msg);
            }else{
                typeof param.success==='function' && param.success(res);
            }
        },
        error: function(err) {
            console.log('响应错误');
            typeof param.error === 'function' && param.error(err.statusText);
        }
    });
}



// 接口
//登录
function login(userInfo, resolve, reject) {
    request({
        async: true,
        url: ifaceUrl + 'user/login',
        dataType: 'jsonp',
        data: userInfo,
        success: resolve,
        error: reject
    });
}
//获取验证码
function gotScode(resolve, reject) {
    request({
        async: true,
        url: ifaceUrl + 'user/GetCheckCode',
        // url:'http://localhost:56083/user/GetCheckCode',
        success: resolve,
        error: reject
    });
}
function checkedScode(userInfo,resolve,reject){
    request({
        async:false,
        url:ifaceUrl+'user/CheckCode',
        // url:'http://localhost:56083/user/CheckCode',
        data:userInfo,
        success:resolve,
        error:reject
    });
}
//列表接口
function list(resolve, reject) {
    request({
        async: false,
        //todo 输入后台请求接口
        url: ifaceUrl + 'news/list',
        dataType: 'jsonp',
        success: resolve,
        error: reject
    });
}
//根据企业名称查询接口
function search(userInfo, resolve, reject) {
    request({
        async: false,
        url: ifaceUrl + 'news/search',
        dataType: 'jsonp',
        data: userInfo,
        success: resolve,
        error: reject
    });
}
//根据id查询接口
function searchById(userInfo, resolve, reject) {
    request({
        async: true,
        url: ifaceUrl + 'news/searchById',
        dataType: 'jsonp',
        data: userInfo,
        success: resolve,
        error: reject
    });
}
//添加接口
function add(userInfo, resolve, reject) {
    request({
        async: true,
        url: ifaceUrl + 'news/add',
        dataType: 'jsonp',
        data: userInfo,
        success: resolve,
        error: reject
    });
}
//更新接口
function update(userInfo, resolve, reject) {
    request({
        async: true,
        url: ifaceUrl + 'news/update',
        dataType: 'jsonp',
        data: userInfo,
        success: resolve,
        error: reject
    });
}
// 删除接口
function deleted(userInfo, resolve, reject) {
    request({
        async: true,
        url: ifaceUrl + 'news/delete',
        dataType: 'jsonp',
        data: userInfo,
        success: resolve,
        error: reject
    });
}
//强制登录
function doLogin() {
    window.location.href = './login.html?redirect' + encodeURIComponent(window.location.href);
}





// 工具
//模板
function Template() {
    var list = '';
    var id = '';
    for (var i = 0; i < arguments.length-1; i++) {
        if (arguments[i] == null) {
            arguments[i] = '';
        }
        if (i === 0) {
            id = arguments[0];
        }
        list = list + '<td class="'+i+'">' + arguments[i+1] + '</td>';
    }
    list = list + '<td id="' + id + '"><span class="update">修改</span><br/><span class="delete">删除</span></td>';

    // console.log('list的内容为：'+list);
    this.htmltemplate = '<tr class="item">' + list + '</tr>';
}
// 日期转转格式
function formateDate(dt) {
    if (!dt) {
        dt = new Date();
    }
    dt = dt.slice(6, 19);
    if (typeof dt === 'string') {
        dt = parseInt(dt);
    }
    dt = new Date(dt);
    // console.log(typeof dt);
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var day = dt.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    var formateDate = year + '-' + month + '-' + day;
    return formateDate;
}
//视图view
function view(data) {
    var key;
    var time;
    for (key in data) {
        time = data[key].publishtime;
        console.log('时间是：' + time + '时间类型：' + typeof time);

        // console.log(time);
        time = formateDate(time);

        var html = new Template(data[key].id,
            data[key].rowid,
            data[key].dtname,
            data[key].cpname,
            data[key].penaltyid,
            time,
            data[key].officename,
            data[key].pagelayout,
            data[key].pagesize,
            data[key].articleurl,
            data[key].articletitle);
        $('#list').append(html.htmltemplate);
    }
}
// 获取url地址参数
function getUrlParmName(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
}
// 修改url参数
function changeURLParams(url, param, param_val) {
    var pattern = param + '=([^&]*)';
    var replaceText = param + '=' + param_val;
    if (url.match(pattern)) {
        var tmp = '/(' + param + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
}
// 生成验证码
function produceScode(scode) {
    var canvas_width = $('.scode-pic').width();
    var canvas_height = $('.scode-pic').height();
    var canvas = document.querySelector('.scode-pic');
    // var scodeLenght=scode.split('').length;
    // 产生0~30的随机弧度
    var deg = Math.random() * Math.PI / 180;

    var context = canvas.getContext('2d');
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    var x = 5
    var y = 20 + Math.random() * 8;
    context.font = "bold 23px 微软雅黑";
    context.translate(x, y);
    context.rotate(deg);
    context.fillStyle = this.randomColor();
    context.fillText(scode, 0, 0);
    context.rotate(-deg);
    context.translate(-x, -y);
    // 产生干扰线
    for (var i = 0; i <= 5; i++) {
        context.strokeStyle = this.randomColor();
        context.beginPath();
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
        context.stroke();
    }
    for (var i = 0; i <= 30; i++) {
        context.strokeStyle = this.randomColor();
        context.beginPath();
        var x = Math.random() * canvas_width;
        var y = Math.random() * canvas_height;
        context.moveTo(x, y);
        context.lineTo(x + 1, y + 1);
        context.stroke();
    }

}
// 产生随机颜色
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
}
//验证字段
function validate(value,type){
		var value=$.trim(value);
		//非空验证
		if('require'===type){
			return !!value;
			console.log(!!value);
		}
		//日期验证
		if('datetime'===type){
			return /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);
		}
}



//封装通用方法----list.html
//列表显示
function allList() {
    list(function(data, msg) {
        // console.log('查询成功，查询数据是：'+data);
        view(data);
    }, function(errMsg) {
        alert('查询失败，系统出现错误，错误代码：' + errMsg.statusText);
    });
}
//搜索显示
function searchList(formData) {
    //获得表单对象数据
    // var formData={
    // 	searchtext:$.trim($('#searchtext').val())
    // };

    //移除原来显示的列表
    $('.item').remove();
    search(formData, function(data, msg) {
        view(data);
    }, function(errMsg) {
        alert('搜索失败，错误代码为：' + errMsg);
    });
}