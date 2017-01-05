/**
 * Created by zb on 2017/1/5.
 */
$(function () {
    $("#import").click(function(){//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
        $(".popup").removeClass("displayNo").addClass("displayBlock")
    })
})

// 右侧加载相应的页面
function jumpPage(str) {
    $(".nm-l a").removeClass("aClick").addClass("aNoClick")
    if(str=='n'){
         $(".a_n").removeClass("aNoClick").addClass("aClick")
    }else if(str=='m'){
         $(".a_m").removeClass("aNoClick").addClass("aClick")
    }else if(str=='nm'){
         $(".a_nm").removeClass("aNoClick").addClass("aClick")
    }else{

    }
}

//导入非标准名称
function importNoMa() {

}

//提示框 确定按钮
function popupSure(){
    $(".popup").removeClass("displayBlock").addClass("displayNo")
    $("#files").click();
}
//提示框 取消按钮
function popupCancel(){
    $(".popup").removeClass("displayBlock").addClass("displayNo")
}

//删除全部
function deleteAll() {

}

//通过条件搜索非标准名称
function omaSearch() {
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var importer=$(".importPerson").val() //导入人
    var value=$(".nomaName").val() //名称
    var imp_time=$(".createCode_date").val() //日期
    var batch_id=$(".nomaBatch").val() //批次
    var count="" //总数
    var nonstandard="" //保存data信息
    var tbodyList=""
    $.ajax({
        url:'../json/demo_noma.json',
        data:{importer:importer,value:value,imp_time:imp_time,batch_id:batch_id,start:startValue,limit:limitValue},
        dataType:"json",
        success:function (data) {
            count=data.count
            nonstandard=data.nonstandard
            for(var i=0;i<nonstandard.length;i++){
                tbodyList+="<tr>"
                tbodyList+="<td>"+nonstandard[i].id+"</td>"
                tbodyList+="<td>"+nonstandard[i].batch_id+"</td>"
                tbodyList+="<td>"+nonstandard[i].importer+"</td>"
                tbodyList+="<td>"+nonstandard[i].imp_time+"</td>"
                tbodyList+="<td>"+nonstandard[i].value+"</td>"
                tbodyList+="<td>"+nonstandard[i].mean.length+"</td>"
            }
            $(".noman_body").html("")
            $(".noman_body").append(tbodyList)

            $('.list_button').pagination({
                pageCount:count,
                jump:true,
                coping:true,
                count:2,
                homePage:'首页',
                endPage:'末页',
                prevContent:'上页',
                nextContent:'下页'
            });
        }
    })
}
