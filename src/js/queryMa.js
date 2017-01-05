/**
 * Created by Administrator on 2017/1/5.
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
//导入标准名称
function importMa() {

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

//删除
function deleteAll() {
    var clickList=[], //点击的列表组合
        idLIst="" //id组合
    clickList=$(".clickId")
    console.log(clickList)
    if(clickList.length>0){
        for(var i=0;i<clickList.length;i++){
            idLIst+=clickList.eq(i).attr('nid')
        }
    }else{
        alert("请选择要删除的列表")
    }
    $.ajax({
        url:"",
        data:{},
        dataType:'json',
        success:function () {

        }
    })
}

//通过条件搜索标准名称
function maSearch() {
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var importer=$(".importPerson").val() //导入人
    var value=$(".nomaName").val() //名称
    var imp_time=$(".createCode_date").val() //日期
    var batch_id=$(".nomaBatch").val() //批次
    var count="" //总数
    var standard="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:'../json/demo_ma.json',
        data:{importer:importer,value:value,imp_time:imp_time,batch_id:batch_id,start:startValue,limit:limitValue},
        dataType:"json",
        success:function (data) {
            count=data.count
            standard=data.standard
            for(var i=0;i<standard.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td><a class='noclickId' href='javascript:;' onclick='clickCodes(this)'><span>"+bzNum+"</span></td>"
                tbodyList+="<td>"+standard[i].batch_id+"</td>"
                tbodyList+="<td>"+standard[i].importer+"</td>"
                tbodyList+="<td>"+standard[i].imp_time+"</td>"
                tbodyList+="<td>"+standard[i].value+"</td>"
                tbodyList+="<td>"+standard[i].mean.length+"</td>"
            }
            $(".man_body").html("")
            $(".man_body").append(tbodyList)

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

/*点击序号，如果背景是白的，就变成蓝色，如果是蓝色，就变成白色*/
function clickCodes(str){
    if($(str).hasClass("noclickId")){
        $(".noman_body a").removeClass("clickId").addClass("noclickId")
        $(str).removeClass("noclickId").addClass("clickId")
    }else{
        $(str).removeClass("clickId").addClass("noclickId")
    }
}