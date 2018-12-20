/*
* @Author: sznews
* @Date:   2018-12-13 15:31:13
* @Last Modified by:   sznews
* @Last Modified time: 2018-12-19 15:23:37
*/
$(function(){
	var searchtext=getUrlParmName('searchtext');
	// console.log(searchtext);
	//获得表单对象数据
	var formData={
		searchtext:searchtext
	};

	//移除原来显示的列表
	$('.item').remove();
	//展示搜索出来的新列表
	searchList(formData);
	var i;
    for(i=0;i<$('.8').length;i++){
        var temp=$('.8')[i].innerHTML;
        $('.8')[i].innerHTML='<a href="'+temp+'">'+temp+'</a>';
    }
	$('#search').click(function(){
		var url=window.location.href;
		var searchtextval=$.trim($('#searchtext').val())
		url=changeURLParams(url,'searchtext',searchtextval);
		window.location.href=url;
	});
	//添加功能
    $("#add").click(function() {
        window.location.href = "./add.html"
    })
	//更新功能
	$('.update').click(function(){
		console.log('update');
		var id=$(this).parent().attr('id');
		// console.log(id);
		//跳转到列表详情页
		window.location.href='./detail.html?id='+id;
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