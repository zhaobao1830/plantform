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

    $('#noMean').editableSelect(
        {
            effects: 'slide',
            filter:false
        }
    );
    //给导入按钮绑定change事件
    $("#files").on("change", fileChange)
})

// 提示框 确定按钮
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
    var mean=0 //关联数
    var noMeanVal=$(".noMean").val()
    if(noMeanVal){
        mean=Number(noMeanVal)
    }else{
        mean=Number(-1)
    }
    var count="" //总数
    var nonstandard="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_noma.json",
        data:{importer:importer,value:value,imp_time_start:imp_time_start,imp_time_end:imp_time_end,batch_id:batch_id,source:source,mean:mean,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function (datas) {
            count = datas.count
            nonstandard = datas.data
            if (nonstandard.length > 0) {
                for (var i = 0; i < nonstandard.length; i++) {
                    bzNum = Number(startValue) + i + 1
                    tbodyList += "<tr>"
                    tbodyList += "<td class='noMaNum' onclick='clickCodes(this)'><p class='noclickId' nid=" + nonstandard[i].id + " ><span>" + bzNum + "</span></p></td>"
                    tbodyList += "<td class='noMaBat' onclick='clicknoBatchId(this)'><p class='noBatchId' bid=" + nonstandard[i].batch_id + " ><span>" + nonstandard[i].batch_id + "</span></p></td>"
                    tbodyList += "<td>" + nonstandard[i].importer + "</td>"
                    tbodyList += "<td>" + timeStamp2String(nonstandard[i].imp_time.$date) + "</td>"
                    tbodyList += "<td><a  title='"+nonstandard[i].value+"'>" + nonstandard[i].value + "</a></td>"
                    //"source"数据来源:0人工导入1数据服务平台
                    tbodyList += "<td>" + (nonstandard[i].source == 0 ? '人工导入' : '数据服务平台') + "</td>"
                    tbodyList += "<td>"+(nonstandard[i].mean==0 ? '未关联' : nonstandard[i].mean)+"</td>"
                    tbodyList += "<td><a href='javascript:;' data-method='offset' data-type='auto' class='showMean' value='" + nonstandard[i].value + "'>数据关联</a></td>"
                }
                $(".noman_body").html("")
                $(".noman_body").append(tbodyList)

                showMean()

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
                $(".noman_body").append("<p class='bodyP'>没有相应数据</p>")
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
    var mean=0 //关联数
    var noMeanVal=$(".noMean").val()
    if(noMeanVal){
        mean=Number(noMeanVal)
    }else{
        mean=Number(-1)
    }
    var count="" //总数
    var nonstandard="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_noma.json",
        data:{importer:importer,value:value,imp_time_start:imp_time_start,imp_time_end:imp_time_end,batch_id:batch_id,source:source,mean:mean,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function (datas) {
            count=datas.count
            nonstandard=datas.data
            if(nonstandard.length>0){
                for (var i = 0; i < nonstandard.length; i++) {
                    bzNum = Number(startValue) + i + 1
                    tbodyList += "<tr>"
                    tbodyList += "<td class='noMaNum' onclick='clickCodes(this)'><p class='noclickId' nid=" + nonstandard[i].id + " ><span>" + bzNum + "</span></p></td>"
                    tbodyList += "<td class='noMaBat' onclick='clicknoBatchId(this)'><p class='noBatchId' bid=" + nonstandard[i].batch_id + " ><span>" + nonstandard[i].batch_id + "</span></p></td>"
                    tbodyList += "<td>" + nonstandard[i].importer + "</td>"
                    tbodyList += "<td>" + timeStamp2String(nonstandard[i].imp_time.$date) + "</td>"
                    tbodyList += "<td><a title='"+nonstandard[i].value+"'>" + nonstandard[i].value + "</a></td>"
                    //"source"数据来源:0人工导入1数据服务平台
                    tbodyList += "<td>" + (nonstandard[i].source == 0 ? '人工导入' : '数据服务平台') + "</td>"
                    tbodyList += "<td>"+(nonstandard[i].mean==0 ? '未关联' : nonstandard[i].mean)+"</td>"
                    tbodyList += "<td><a href='javascript:;' data-method='offset' data-type='auto' class='showMean' value='" + nonstandard[i].value + "'>数据关联</a></td>"
                }
                $(".noman_body").html("")
                $(".noman_body").append(tbodyList)

                showMean()

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
    if($(str).find('p').hasClass("noclickId")){
        $(str).find('p').removeClass("noclickId").addClass("clickId")
    }else{
        $(str).find('p').removeClass("clickId").addClass("noclickId")
    }
}
/*点击批次序号，如果背景是白的，就变成蓝色，如果是蓝色，就变成白色*/
function clicknoBatchId(str) {
    if($(str).find('p').hasClass("noBatchId")){
        $(str).find('p').removeClass("noBatchId").addClass("batchId")
    }else{
        $(str).find('p').removeClass("batchId").addClass("noBatchId")
    }
}
//显示关联信息
function showMean() {
    layui.use('layer',function () {
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
        var active = {
            offset: function(othis){
                var type = othis.data('type')
                    ,text = othis.text();

                layer.open({
                    title:"数据关联",
                    type: 1,
                    offset: type, //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    id: 'LAY_demo'+type, //防止重复弹出
                    content: $("#con-no-ma"),
                    btn: '关闭全部',
                    area: ['1000px', '500px'],
                    btnAlign: 'c', //按钮居中
                    shade: 0, //不显示遮罩
                    yes: function(){
                        layer.closeAll();
                        othis.parent().parent().removeClass("trClick")
                        nomaSearch()
                    },
                    cancel: function(){
                        layer.closeAll();
                        othis.parent().parent().removeClass("trClick")
                        nomaSearch()
                    }
                });
            }
        };
        $('.noman_body .showMean').on('click', function(){

            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';

            othis.parent().parent().addClass("trClick")

            var noMan=othis.attr('value')
            $(".wordHidden").val(noMan)

            standard_name_by_non(noMan)
        });
    })
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


//给导入按钮files绑定change事件
function filesChange() {
    var dataJson=[] //把参数拼装成json样子，
    for(var i=0;i<data.length;i++){
        dataJson.push({"importer":'admin',"value":""+data[i]+""})
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
}

//头部的click方法
function cnClck(str) {
    $(str).siblings().removeClass("clickHead")
    if($(str).hasClass("clickHead")){
        $(str).removeClass("clickHead")
    }else{
        $(str).addClass("clickHead")
    }
}

//导入按钮的change事件
function fileChange() {

    var excelFile,
        fileReader = new FileReader();
    fileReader.onload = function (e) {
        var buffer = new Uint8Array(fileReader.result);
        $.ig.excel.Workbook.load(buffer, function (workbook) {
            var column, row, newRow, cellValue, columnIndex, i,
                worksheet = workbook.worksheets(0),
                columnsNumber = 0,
                gridColumns = [],
                data = [],
                worksheetRowsCount;
            while (worksheet.rows(0).getCellValue(columnsNumber)) {
                columnsNumber++;
            }
            var exListHead=""
            exListHead+="<tr>"
            for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
                column = worksheet.rows(0).getCellText(columnIndex);
                gridColumns.push({ headerText: column, key: column });
                exListHead+="<td class='cnCl' cn='"+column+"' onclick='cnClck(this)'>"+column+"</td>"
            }
            exListHead+="</tr>"
            $(".excelTable thead").html("")
            $(".excelTable thead").html(exListHead)
            for (i = 1, worksheetRowsCount = worksheet.rows().count() ; i < worksheetRowsCount; i++) {
                newRow = {};
                row = worksheet.rows(i);
                for (columnIndex = 0; columnIndex < columnsNumber; columnIndex++) {
                    cellValue = row.getCellText(columnIndex);
                    newRow[gridColumns[columnIndex].key] = cellValue;
                }

                data.push(newRow);
            }
            var cnClList=$(".cnCl") //获取标题
            var exListBody=""
            if(data.length<3){
                for(var i=0;i<data.length;i++){
                    exListBody+="<tr>"
                    $(".cnCl").each(function () {
                        exListBody+="<td>"+data[i][$(this).attr("cn")]+"</td>"
                    })
                    exListBody+="</tr>"
                }
            }else{
                for(var i=0;i<data.length&&i<2;i++){
                    exListBody+="<tr>"
                    $(".cnCl").each(function () {
                        exListBody+="<td>"+data[i][$(this).attr("cn")]+"</td>"
                    })
                    exListBody+="</tr>"
                }
                exListBody+="<tr>"
                $(".cnCl").each(function () {
                    exListBody+="<td>┊</td>"
                })
                exListBody+="</tr>"
            }
            $(".excelTable tbody").html("")
            $(".excelTable tbody").html(exListBody)

            showExcel(data)
        }, function (error) {
            $("#result").text("The excel file is corrupted.");
            $("#result").show(1000);
        });
    }

    if (this.files.length > 0) {
        excelFile = this.files[0];
        if (excelFile.type === "application/vnd.ms-excel" || excelFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || (excelFile.type === "" && (excelFile.name.endsWith("xls") || excelFile.name.endsWith("xlsx")))) {
            fileReader.readAsArrayBuffer(excelFile);
        } else {
            $("#result").text("The format of the file you have selected is not supported. Please select a valid Excel file ('.xls, *.xlsx').");
            $("#result").show(1000);
        }
    }





}

//显示导入的列表
function showExcel(data) {
    layui.use('layer',function () {
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
        var active = {
            offset: function(othis){
                var type = othis.data('type')
                    ,text = othis.text(),
                    datas=data;

                layer.open({
                    title:"请点击标题，选择提交的列(必须选择一列)",
                    type: 1,
                    offset: type, //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                    id: 'LAY_demo'+type, //防止重复弹出
                    content: $("#excelTable"),
                    btn: '确定',
                    area: ['1008px', '250px'],
                    btnAlign: 'c', //按钮居中
                    shade: 0, //不显示遮罩
                    yes: function(){
                        layer.closeAll();
                        addExcel(datas)
                    },
                    cancel: function(){
                        layer.closeAll();
                        addExcel(datas)
                    }
                });
            }
        };
        $('.showExcel').on('click', function(){
            var othis = $(this), method = othis.data('method');
            active[method] ? active[method].call(this, othis) : '';
        });
        $('.showExcel').trigger("click");
    })
}

//提交导入的数据
function addExcel(data) {
    if($(".cnCl").hasClass("clickHead")){
        var checkIndex=$(".clickHead").index() //点击的是哪个列
        var list=[] //悬着的这一列的值
        var dataList=[]
        for(var i=0;i<data.length;i++){
            dataList.push(data[i][$(".cnCl").eq(checkIndex).attr("cn")])
        }
        $(".excelTable tbody tr").each(function () {
            list.push($(this).find("td").eq(checkIndex).text().trim())
        })
        var dataJson=[] //把参数拼装成json样子，
        for(var i=0;i<dataList.length;i++){
            dataJson.push({"importer":'admin',"value":""+dataList[i]+""})
        }
        var dj=JSON.stringify(dataJson) //转换成json
        var str="" //传入的参数
        $.ajax({
            url:ctx+'/add_nonstandard_name',
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
    }
}