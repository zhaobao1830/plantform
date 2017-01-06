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

//导入按钮，用html5的FileReader方法
function importNoMa(){
    var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
    var name = selectedFile.name;//读取选中文件的文件名
    var size = selectedFile.size;//读取选中文件的大小
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile);//读取文件的内容

    var list=[] //txt文件里面的列表
    var liList=[] //保存txt文件
    var dataJson="" //把参数拼装成json样子，为string格式
    reader.onload = function(){
        list=this.result.split("\n")
        for(var i=0;i<list.length;i++){
            liList.push(list[i].trim())
        }
        dataJson={"importer":'admin',"value":""+liList+""}
        var dj="" //转换成json
        dj=JSON.stringify(dataJson)
        $.ajax({
            url:'',
            type:"post",
            data:dj,
            contentType:"application/json",
            success:function () {
                alert('导入成功')
            }
        })
    };
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
        idLIst=[], //id组合
        batchList=[], //批次组合
        batchIdList=[] //批次ID租个
    clickList=$(".clickId")
    if(clickList.length>0){
        for(var i=0;i<clickList.length;i++){
            idLIst.push(clickList.eq(i).attr('nid'))
        }
    }
    batchList=$(".batchId")
    if(batchList.length>0){
        for(var i=0;i<batchList.length;i++){
            batchIdList.push(batchList.eq(i).attr('bid'))
        }
    }
    console.log("idLIst:"+idLIst)
    console.log("batchList:"+batchIdList)
    $.ajax({
        url:"",
        data:{},
        dataType:'json',
        success:function () {

        }
    })
}

//通过条件搜索非标准名称
function nomaSearch() {
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var importer=$(".importPerson").val() //导入人
    var value=$(".nomaName").val() //名称
    var imp_time_start=$(".createCode_date_start").val() //开始日期
    var imp_time_end=$(".createCode_date_end").val() //结束时间日期
    var batch_id=$(".nomaBatch").val() //批次
    var count="" //总数
    var nonstandard="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:'../json/demo_noma.json',
        data:{importer:importer,value:value,imp_time_start:imp_time_start,imp_time_end:imp_time_end,batch_id:batch_id,start:startValue,limit:limitValue},
        dataType:"json",
        success:function (data) {
            count=data.count
            nonstandard=data.nonstandard
            for(var i=0;i<nonstandard.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td><a class='noclickId' href='javascript:;' nid="+nonstandard[i].id+" onclick='clickCodes(this)'><span>"+bzNum+"</span></td>"
                tbodyList+="<td><a class='noBatchId' href='javascript:;' bid="+nonstandard[i].batch_id+" onclick='clicknoBatchId(this)'><span>"+nonstandard[i].batch_id+"</span></td>"
                tbodyList+="<td>"+nonstandard[i].importer+"</td>"
                tbodyList+="<td>"+nonstandard[i].imp_time+"</td>"
                tbodyList+="<td>"+nonstandard[i].value+"</td>"
                //"source"数据来源:0人工导入1数据服务平台
                tbodyList+="<td>"+(nonstandard[i].source==0?'人工导入':'数据服务平台')+"</td>"
                tbodyList+="<td><a href='javascript:;' class='showMean' onclick='showMean()'>"+nonstandard[i].mean.length+"</a></td>"
            }
            $(".noman_body").html("")
            $(".noman_body").append(tbodyList)

            $('.list_button').pagination({
                callback: PageCallback,  //PageCallback() 为翻页调用次函数。
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
function PageCallback() {
    console.log($(".active").text())
}
/*点击序号，如果背景是白的，就变成蓝色，如果是蓝色，就变成白色*/
function clickCodes(str){
    if($(str).hasClass("noclickId")){
        $(str).removeClass("noclickId").addClass("clickId")
    }else{
        $(str).removeClass("clickId").addClass("noclickId")
    }
}
/*点击批次序号，如果背景是白的，就变成蓝色，如果是蓝色，就变成白色*/
function clicknoBatchId(str) {
    if($(str).hasClass("noBatchId")){
        $(str).removeClass("noBatchId").addClass("batchId")
    }else{
        $(str).removeClass("batchId").addClass("noBatchId")
    }
}
//显示关联信息
function showMean() {
   window.location.href="../views/queryWordSelect1.html?target='_blank'"
}

//智能关联
function assOic() {
    alert("功能正在开发")
}