/*
 * @Author: sznews
 * @Date:   2018-12-14 15:11:09
 * @Last Modified by:   sznews
 * @Last Modified time: 2018-12-19 10:55:05
 */
// 表单字段的验证
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
    $('#addcp').click(function() {
        var formData = {
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
            add(formData, function(data, msg) {
                alert(msg);
                window.location.href="./list.html";
            }, function(errMsg) {
                alert('插入失败！');
            });
        }else{
        	alert(validateResult.msg);
        }
        
    })
    $('#back').click(function() {
        window.location.href = "./list.html";
    });
    $('#nextadd').click(function() {
        window.location.reload();
    })
});