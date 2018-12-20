/*
 * @Author: sznews
 * @Date:   2018-12-12 09:52:33
 * @Last Modified by:   sznews
 * @Last Modified time: 2018-12-19 15:23:03
 */
function clickFn(obj) {
    obj.click(function() {
        window.location.href = './detail.html';
    });
}
//执行函数
$(function() {

    //	list页功能

    // 显示列表功能
    allList();
    var i;
    for(i=0;i<$('.8').length;i++){
        var temp=$('.8')[i].innerHTML;
        $('.8')[i].innerHTML='<a href="'+temp+'">'+temp+'</a>';
    }
    // searchList();
    // console.log($('.update'));
    window.obj = $('.update');
    // console.log(obj);
    // 查询功能
    $('#search').click(function() {
        // console.log('我在这'+$.trim($('#searchtext').val()));
        window.location.href = "./searchlist.html?searchtext=" + $.trim($('#searchtext').val());
    });
    //添加功能
    $("#add").click(function() {
        window.location.href = "./add.html"
    })
    //更新功能
    obj.click(function() {
        // console.log('update');
        var id = $(this).parent().attr('id');
        console.log(id);
        //跳转到列表详情页
        window.location.href = './detail.html?id=' + id;
    });
    //删除功能
    $('.delete').click(function() {
        var formData = {
            id: $(this).parent().attr('id')
        };
        // console.log('formData的数据：'+formData.id);
        var confirmResult = confirm("确认删除？")
        if (confirmResult) {
            deleted(formData, function(data, msg) {
                $('.item').remove();
                searchList();
            }, function(errMsg) {
                alert('删除失败');
                console.log('删除失败，错误代码为：' + errMsg);
            });
        }else{
        	//do Nothing
        }
    });
})