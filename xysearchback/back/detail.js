/*
 * @Author: sznews
 * @Date:   2018-12-13 14:55:41
 * @Last Modified by:   sznews
 * @Last Modified time: 2018-12-19 14:32:53
 */
function formValidate(formData) {
    var result = {
        status: false,
        msg: ''
    };
    if (!validate(formData.dtname, 'require')) {
        result.msg = '处罚部门不能为空';
        return result;
    }
    if (!validate(formData.cpname, 'require')) {
        result.msg = '企业名称不能为空';
        return result;
    }
    if (!validate(formData.penaltyid, 'require')) {
        result.msg = '处罚决定书文号不能为空';
        return result;
    }
    if (!validate(formData.publishtime, 'require')) {
        result.msg = '登报日期不能为空';
        return result;
    }
    if (!validate(formData.publishtime, 'datetime')) {
        result.msg = '登报日期格式不正确';
        return result;
    }
    if (!validate(formData.officename, 'require')) {
        result.msg = '登报报社名称不能为空';
        return result;
    }
    if (!validate(formData.pagelayout, 'require')) {
        result.msg = '登报版面不能为空';
        return result;
    }
    if (!validate(formData.pagesize, 'require')) {
        result.msg = '登报报尺寸不能为空';
        return result;
    }
    if (!validate(formData.articleurl, 'require')) {
        result.msg = '文章地址不能为空';
        return result;
    }
    if (!validate(formData.articletitle, 'require')) {
        result.msg = '文章标题不能为空';
        return result;
    }
    // 通过验证，返回正确提示
    result.status = true;
    result.msg = '验证通过';
    return result;
}

$(function() {

    // 获取企业信息
    var cid = getUrlParmName('id');
    // console.log(id);
    //把url上的id参数传到id的输入框中
    $('#id').val(cid);
    var formData = {
        id: cid
    };
    // 根据id查找对应企业的信息
    searchById(formData, function(data, msg) {
        var index = 1;
        for (key in data) {
            //这里id不用显示出来
            if (key === 'id') {
                continue;
            }
            if (key === 'publishtime') {
                data[key] = formateDate(data[key]);
            }
            $('.inputtext')[index].value = data[key];
            index++;
            if (index > $('.inputtext').length - 1) {
                break;
            }
            // console.log(data);
        }
        // console.log($('.inputtext')[0]);
    }, function(errMsg) {
        alert('获取企业信息失败，请联系技术人员处理');
    });


    // 更新企业信息
    $('#update').click(function() {
        var formData = {
            id: $.trim($('#id').val()),
            dtname: $.trim($('#dtname').val()),
            cpname: $.trim($('#cpname').val()),
            penaltyid: $.trim($('#penaltyid').val()),
            publishtime: $.trim($('#publishtime').val()),
            officename: $.trim($('#officename').val()),
            pagelayout: $.trim($('#pagelayout').val()),
            pagesize: $.trim($('#pagesize').val()),
            articleurl: $.trim($('#articleurl').val()),
            articletitle: $.trim($('#articletitle').val())
        };
        var validateResult = formValidate(formData);
        if (validateResult.status) {
            update(formData, function(data, msg) {
                console.log("update:" + data);
                alert(msg);
                window.location.href='./list.html';
            }, function(errMsg) {
                alert(errMsg);
            });
        }else{
        	alert(validateResult.msg);
        }

    })
    //返回上一页
    $('#back').click(function() {
        window.location.href = './list.html';
    });
})