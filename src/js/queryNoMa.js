/**
 * Created by zb on 2017/1/5.
 */
$(function () {
    $("#import").click(function(){//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
        $(".popup").removeClass("displayNo").addClass("displayBlock")
    })

    $(".a_n").removeClass("aNoClick").addClass("aClick")
    $(".con").removeClass("show").addClass("hide")

    nomaSearch()
})


//导入按钮，用html5的FileReader方法
function importNoMa(){
    var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
    var name = selectedFile.name;//读取选中文件的文件名
    var size = selectedFile.size;//读取选中文件的大小
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile);//读取文件的内容

    var list=[] //txt文件里面的列表
    var liList=[] //保存txt文件
    var dataJson=[] //把参数拼装成json样子，
    reader.onload = function(){
        list=this.result.split("\n")
        for(var i=0;i<list.length;i++){
            dataJson.push({"importer":'admin',"value":""+list[i].trim()+""})
        }
        var dj=JSON.stringify(dataJson) //转换成json
        var str="" //传入的参数
        $.ajax({
            url:"../json/demo_noma.json",
            type:"post",
            data:dj,
            contentType:"application/json",
            success:function () {
                str="导入成功"
                imShSure(str)
                nomaSearch()
            },
            error:function(){
                str="导入失败"
                imShSure(str)
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
//导入后提示框
function imShSure(str) {
    $(".imSh_con").html("")
    $(".imSh_con").html(str)
    $(".imSh").removeClass("displayBlock").addClass("displayNo")
}
//删除
function deleteAll() {
    var clickList=[], //点击的列表组合
        idLIst="", //id组合
        batchList=[], //批次组合
        batchIdList="" //批次ID租个
    clickList=$(".clickId")
    if(clickList.length>0){
        for(var i=0;i<clickList.length;i++){
            if(idLIst){
                idLIst+=","+clickList.eq(i).attr('nid')
            }else{
                idLIst+=clickList.eq(i).attr('nid')
            }

        }
    }
    batchList=$(".batchId")
    if(batchList.length>0){
        for(var i=0;i<batchList.length;i++){
            if(batchIdList){
                batchIdList+=","+batchList.eq(i).attr('bid')
            }else{
                batchIdList+=batchList.eq(i).attr('bid')
            }

        }
    }
    $.ajax({
        url:ctx+"/remove_nonstandard_name",
        type:"post",
        data:{id:idLIst,batch_id:batchIdList},
        success:function (data) {
            if(data=="sucess"){
                nomaSearch()
            }

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
    var batch_id=0  //批次
    batch_id=Number($(".nomaBatch").val())

    var source=0 //数据来源
    source=Number($(".source option:selected").val()) //数据来源
    var count="" //总数
    var nonstandard="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_noma.json",
        data:{importer:importer,value:value,imp_time_start:imp_time_start,imp_time_end:imp_time_end,batch_id:batch_id,source:source,start:startValue,limit:limitValue},
        dataType:"json",
        success:function (datas) {
            count = datas.count
            nonstandard = datas.data
            if (nonstandard.length > 0) {
                for (var i = 0; i < nonstandard.length; i++) {
                    bzNum = Number(startValue) + i + 1
                    tbodyList += "<tr>"
                    tbodyList += "<td><a class='noclickId' href='javascript:;' nid=" + nonstandard[i].id + " onclick='clickCodes(this)'><span>" + bzNum + "</span></td>"
                    tbodyList += "<td><a class='noBatchId' href='javascript:;' bid=" + nonstandard[i].batch_id + " onclick='clicknoBatchId(this)'><span>" + nonstandard[i].batch_id + "</span></td>"
                    tbodyList += "<td>" + nonstandard[i].importer + "</td>"
                    tbodyList += "<td>" + timeStamp2String(nonstandard[i].imp_time.$date) + "</td>"
                    tbodyList += "<td>" + nonstandard[i].value + "</td>"
                    //"source"数据来源:0人工导入1数据服务平台
                    tbodyList += "<td>" + (nonstandard[i].source == 0 ? '人工导入' : '数据服务平台') + "</td>"
                    tbodyList += "<td><a href='javascript:;' class='showMean' value='" + nonstandard[i].value + "' onclick='showMean(this)'>" + nonstandard[i].mean + "</a></td>"
                }
                $(".noman_body").html("")
                $(".noman_body").append(tbodyList)

                var pageCount=0 //总页数
                pageCount=count/limitValue
                $('.list_button').pagination({
                    totalData:count,
                    pageCount:pageCount,
                    showData:limitValue,
                    current: 1,
                    jump: true,
                    coping: true,
                    count: 2,
                    homePage: '首页',
                    endPage: '末页',
                    prevContent: '上页',
                    nextContent: '下页',
                    callback: pageCallback //pageCallback() 为翻页调用次函数。
                });
            } else {
                $(".noman_body").html("")
                $(".noman_body").append("<p>没有相应数据</p>")
                $(".list_button").html("")
            }
        }
    })
}
//分页回调函数
function pageCallback(api) {
    var limitValue=10 //一次取出多少条数据
    var pageNo=1 //当前页码
    if(api){
        pageNo=api.getCurrent()
    }
    var startValue=(pageNo-1)*limitValue //初始值

    var importer=$(".importPerson").val() //导入人
    var value=$(".nomaName").val() //名称
    var imp_time_start=$(".createCode_date_start").val() //开始日期
    var imp_time_end=$(".createCode_date_end").val() //结束时间日期
    var batch_id=0  //批次
    batch_id=Number($(".nomaBatch").val())
    var source=0 //数据来源
    source=Number($(".source option:selected").val()) //数据来源
    var count="" //总数
    var nonstandard="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_noma.json",
        data:{importer:importer,value:value,imp_time_start:imp_time_start,imp_time_end:imp_time_end,batch_id:batch_id,source:source,start:startValue,limit:limitValue},
        dataType:"json",
        success:function (datas) {
            count=datas.count
            nonstandard=datas.data
            if(nonstandard.length>0){
                for (var i = 0; i < nonstandard.length; i++) {
                    bzNum = Number(startValue) + i + 1
                    tbodyList += "<tr>"
                    tbodyList += "<td><a class='noclickId' href='javascript:;' nid=" + nonstandard[i].id + " onclick='clickCodes(this)'><span>" + bzNum + "</span></td>"
                    tbodyList += "<td><a class='noBatchId' href='javascript:;' bid=" + nonstandard[i].batch_id + " onclick='clicknoBatchId(this)'><span>" + nonstandard[i].batch_id + "</span></td>"
                    tbodyList += "<td>" + nonstandard[i].importer + "</td>"
                    tbodyList += "<td>" + timeStamp2String(nonstandard[i].imp_time.$date) + "</td>"
                    tbodyList += "<td>" + nonstandard[i].value + "</td>"
                    //"source"数据来源:0人工导入1数据服务平台
                    tbodyList += "<td>" + (nonstandard[i].source == 0 ? '人工导入' : '数据服务平台') + "</td>"
                    tbodyList += "<td><a href='javascript:;' class='showMean' value='" + nonstandard[i].value + "' onclick='showMean(this)'>" + nonstandard[i].mean + "</a></td>"
                }
                $(".noman_body").html("")
                $(".noman_body").append(tbodyList)

                var pageCount=0 //总页数
                pageCount=count/limitValue
                $('.list_button').pagination({
                    totalData:count,
                    pageCount:pageCount,
                    showData:limitValue,
                    current:pageNo,
                    jump:true,
                    coping:true,
                    count:2,
                    homePage:'首页',
                    endPage:'末页',
                    prevContent:'上页',
                    nextContent:'下页',
                    callback: pageCallback //pageCallback() 为翻页调用次函数。
                });


            }else{
                $(".noman_body").html("")
                $(".noman_body").append("<p>没有相应数据</p>")
            }
        }
    })
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
function showMean(str) {
    var noMan=$(str).attr('value')
    $(".wordHidden").val(noMan)
    nor_show()
    standard_name_by_non(noMan)
}

//智能关联
function assOic() {
    alert("功能正在开发")
}

//时间格式化
function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;
}