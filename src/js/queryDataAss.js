/**
 * Created by Administrator on 2017/1/5.
 */

//通过条件搜索数据关联列表
function daSearch() {
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var standard_v=$(".standard_v").val() //标准名称
    var nonstandard_v=$(".nonstandard_v").val() //非标准名称
    var type=$("input[name=assoic]:checked").val() //关联方式:0手动1自动
    var check=$(".check").val() //准确性:0未判别1准确2不准确
    var operator=$(".operator").val() //关联人
    var count="" //总数
    var means="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:'../json/demo_da.json',
        type:"post",
        data:{standard_v:standard_v,nonstandard_v:nonstandard_v,type:type,check:check,operator:operator,start:startValue,limit:limitValue},
        dataType:"json",
        success:function (data) {
            count=data.count
            means=data.mean
            for(var i=0;i<means.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td><a class='noclickId' href='javascript:;' onclick='clickCodes(this)'><span>"+bzNum+"</span></td>"
                tbodyList+="<td>"+means[i].standard_v+"</td>"
                tbodyList+="<td>"+means[i].nonstandard_v+"</td>"
                //type关联方式:0手动1自动
                tbodyList+="<td>"+(means[i].type=='0'?'手动':'自动')+"</td>"
                //check准确性:0未判别1准确2不准确
                if(means[i].check==0){
                    tbodyList+="<td>"+'未判别'+"</td>"
                }else if(means[i].check==1){
                    tbodyList+="<td>"+'准确'+"</td>"
                }else{
                    tbodyList+="<td>"+'不准确'+"</td>"
                }
                tbodyList+="<td>"+means[i].mean_time+"</td>"
                tbodyList+="<td>"+means[i].operator+"</td>"
            }
            $(".da_body").html("")
            $(".da_body").append(tbodyList)

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