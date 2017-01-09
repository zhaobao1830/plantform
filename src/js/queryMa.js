/**
 * Created by Administrator on 2017/1/5.
 */
$(function () {
    $("#import").click(function(){//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
        $(".popup").removeClass("displayNo").addClass("displayBlock")
    })

    $(".active").on('click',function () {
        console.log($(this).text().trim())
    })
})


//导入按钮，用html5的FileReader方法 导入标准名称
function importMa(){
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
    $.ajax({
        url:"",
        data:{id:idLIst,batch_id:batchIdList},
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
    var value=$(".maName").val() //名称
    var imp_time_start=$(".createCode_date_start").val() //开始日期
    var imp_time_end=$(".createCode_date_end").val() //结束日期
    var batch_id=$(".maBatch").val() //批次
    var source=$(".source option:selected").val() //数据来源
    var count="" //总数
    var standard="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:'../json/demo_ma.json',
        type:"post",
        data:{importer:importer,value:value,imp_time_start:imp_time_start,imp_time_end:imp_time_end,batch_id:batch_id,source:source,start:startValue,limit:limitValue},
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
                tbodyList+="<td>"+timeStamp2String(standard[i].imp_time.$date)+"</td>"
                tbodyList+="<td>"+standard[i].value+"</td>"
                //"source"数据来源:0人工导入1数据服务平台
                tbodyList+="<td>"+(standard[i].source==0?'人工导入':'数据服务平台')+"</td>"
                tbodyList+="<td><a href='javascript:;' class='showMean' value='"+standard[i].value+"' onclick='showMean(this)'>"+standard[i].mean+"</a></td>"
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
//分页跳转
function goMa() {
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var importer=$(".importPerson").val() //导入人
    var value=$(".maName").val() //名称
    var imp_time_start=$(".createCode_date_start").val() //开始日期
    var imp_time_end=$(".createCode_date_end").val() //结束日期
    var batch_id=0  //批次
         batch_id=Number($(".maBatch").val())
    var source=0 //数据来源
         source=Number($(".source option:selected").val())
    var count="" //总数
    var standard="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:'../json/demo_ma.json',
        type:"post",
        data:{importer:importer,value:value,imp_time_start:imp_time_start,imp_time_end:imp_time_end,batch_id:batch_id,source:source,start:startValue,limit:limitValue},
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
                tbodyList+="<td>"+timeStamp2String(standard[i].imp_time.$date)+"</td>"
                tbodyList+="<td>"+standard[i].value+"</td>"
                //"source"数据来源:0人工导入1数据服务平台
                tbodyList+="<td>"+(standard[i].source==0?'人工导入':'数据服务平台')+"</td>"
                tbodyList+="<td><a href='javascript:;' class='showMean' value='"+standard[i].value+"' onclick='showMean(this)'>"+standard[i].mean+"</a></td>"
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
                nextContent:'下页',
                callback:ss()
            });
        }
    })
}

function ss() {
    console.log("ddd")
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

//显示关联信息
function showMean(str) {
    var ma=encodeURI($(str).attr('value'))
    window.open("../views/queryWordSelect1.html?ma="+ma)
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