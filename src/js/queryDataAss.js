/**
 * Created by Administrator on 2017/1/5.

 */

$(function(){
    $(".a_nm").removeClass("aNoClick").addClass("aClick")
    daSearch()

    daEx()
})
//通过条件搜索数据关联列表
function daSearch() {
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var standard_v=$(".standard_v").val() //标准名称
    var nonstandard_v=$(".nonstandard_v").val() //非标准名称
    var mean_time_start=$(".createCode_date_start").val()
    var mean_time_end=$(".createCode_date_end").val()
    var type=0
    type=$(".assoic option:selected").val() //关联方式:0手动1自动
    var check=0
    check=$(".check option:selected").val() //准确性:0未判别1准确2不准确
    var operator=$(".operator").val() //关联人
    var count="" //总数
    var means="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_da.json",
        type:"post",
        data:{standard_v:standard_v,nonstandard_v:nonstandard_v,type:type,check:check,operator:operator,mean_time_start:mean_time_start,mean_time_end:mean_time_end,start:startValue,limit:limitValue},
        dataType:"json",
        success:function (datas) {
            count=datas.count
            means=datas.data
            if(means.length>0){
                for(var i=0;i<means.length;i++){
                    bzNum=Number(startValue)+i+1
                    tbodyList+="<tr>"
                    tbodyList+="<td class='daNum' onclick='clickCodes(this)'><a class='noclickId' href='javascript:;' nid="+means[i]._id.$oid+" nck="+means[i].check+"><span>"+bzNum+"</span></td>"
                    tbodyList+="<td title='"+means[i].standard_v+"'>"+means[i].standard_v+"</td>"
                    tbodyList+="<td title='"+means[i].nonstandard_v+"'>"+means[i].nonstandard_v+"</td>"
                    tbodyList+="<td>"+(means[i].type=='0'?'手动':'自动')+"</td>"
                    if(means[i].check==0){
                        tbodyList+="<td>"+'未判别'+"</td>"
                    }else if(means[i].check==1){
                        tbodyList+="<td>"+'准确'+"</td>"
                    }else{
                        tbodyList+="<td>"+'不准确'+"</td>"
                    }
                    tbodyList+="<td>"+timeStamp2String(means[i].mean_time.$date)+"</td>"
                    tbodyList+="<td>"+means[i].operator+"</td>"
                }
                $(".da_body").html("")
                $(".da_body").append(tbodyList)

                var pageCount=0 //总页数
                pageCount=count/limitValue
                $('.list_button').pagination({
                    totalData:count,
                    pageCount:pageCount,
                    showData:limitValue,
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
                $(".da_body").html("")
                $(".da_body").append("<p class='bodyP'>没有相应数据</p>")
                $('.list_button').html("")
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

    var standard_v=$(".standard_v").val() //标准名称
    var nonstandard_v=$(".nonstandard_v").val() //非标准名称
    var mean_time_start=$(".createCode_date_start").val()
    var mean_time_end=$(".createCode_date_end").val()
    var type=0
    type=$(".assoic option:selected").val() //关联方式:0手动1自动
    var check=0
    check=$(".check option:selected").val() //准确性:0未判别1准确2不准确
    var operator=$(".operator").val() //关联人
    var count="" //总数
    var means="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_da.json",
        type:"post",
        data:{standard_v:standard_v,nonstandard_v:nonstandard_v,type:type,check:check,operator:operator,mean_time_start:mean_time_start,mean_time_end:mean_time_end,start:startValue,limit:limitValue},
        dataType:"json",
        success:function (datas) {
            count=datas.count
            means=datas.data
            if(means.length>0){
                for(var i=0;i<means.length;i++){
                    bzNum=Number(startValue)+i+1
                    tbodyList+="<tr>"
                    tbodyList+="<td class='daNum' onclick='clickCodes(this)'><a class='noclickId' href='javascript:;' nid="+means[i]._id.$oid+" nck="+means[i].check+"><span>"+bzNum+"</span></td>"
                    tbodyList+="<td title='"+means[i].standard_v+"'>"+means[i].standard_v+"</td>"
                    tbodyList+="<td title='"+means[i].nonstandard_v+"'>"+means[i].nonstandard_v+"</td>"
                    tbodyList+="<td>"+(means[i].type=='0'?'手动':'自动')+"</td>"
                    if(means[i].check==0){
                        tbodyList+="<td>"+'未判别'+"</td>"
                    }else if(means[i].check==1){
                        tbodyList+="<td>"+'准确'+"</td>"
                    }else{
                        tbodyList+="<td>"+'不准确'+"</td>"
                    }
                    tbodyList+="<td>"+timeStamp2String(means[i].mean_time.$date)+"</td>"
                    tbodyList+="<td>"+means[i].operator+"</td>"
                }
                $(".da_body").html("")
                $(".da_body").append(tbodyList)

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
                $(".da_body").html("")
                $(".da_body").append("<p class='bodyP'>没有相应数据</p>")
                $('.list_button').html("")
            }

        }
    })
}




/*点击序号，如果背景是白的，就变成蓝色，如果是蓝色，就变成白色*/
function clickCodes(str){
    if($(str).find("a").hasClass("noclickId")){
        $(".noman_body a").removeClass("clickId").addClass("noclickId")
        $(str).find("a").removeClass("noclickId").addClass("clickId")
        $(str).parent().addClass("trClick")
    }else{
        $(str).find("a").removeClass("clickId").addClass("noclickId")
        $(str).parent().removeClass("trClick")
    }
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

//审核
function daEx(){
    layui.use('layer',function () {
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        //触发事件
        var active = {
            offset: function(othis){
                var type = othis.data('type')
                    ,text = othis.text();

                layer.confirm('请审核选中项', {
                    btn: ['准确',"不准确"], //按钮,
                    title:"审核",
                    shade: 0,
                    offset: type,
                    id: 'LAY_demo'+type
                }, function(){
                    layer.msg('选择成功',{time:1500});
                    $(".da_body tr").removeClass("trClick")
                    $(".da_body tr a").removeClass("clickId").addClass("noclickId")
                    idDaEx(1)
                }, function() {
                    layer.msg('选择成功',{time:1500});
                    $(".da_body tr").removeClass("trClick")
                    $(".da_body tr a").removeClass("clickId").addClass("noclickId")
                    idDaEx(2)
                })
            }
        };
        $('.daEx').on('click', function(){

            var othis = $(this), method = othis.data('method');
            var cliList=$(".clickId")
            if(cliList.length>0){
                active[method] ? active[method].call(this, othis) : '';
            }
        });
    })
}

//判断是否合格
function idDaEx(str){
    var check=str
    var means=[] //参数
    var cliList=$(".clickId")
    for(var i=0;i<cliList.length;i++){
        means.push({"_id":cliList.eq(i).attr('nid'),"check":check})
    }
    var mean=JSON.stringify(means)
    $.ajax({
        url:"../json/demo_da.json",
        type:'post',
        data:mean,
        contentType:"application/json",
        success:function(){
            deHide()
            daSearch()
        }
    })
}

//合格
function deSure(){
    idDaEx(1)
}

//不合格
function deCancel(){
    idDaEx(2)
}


//审核框隐藏
function deHide(){
    $(".de").removeClass("displayBlock").addClass("displayNo")
}