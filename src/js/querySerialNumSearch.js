/**
 * Created by zb on 2016/3/4.
 */
$(function(){
    /*关闭qrcode*/
    $(".qrcode").on("click",function(event){
        event.stopPropagation();
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.id=='qrcode'){
            $(".qrcode").removeClass("displayBlock").addClass("displayNo")
        }
    });

    /*关闭qrcode*/
    $(".barcode").on("click",function(event){
        event.stopPropagation();
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.id=='barcode'){
            $(".barcode").removeClass("displayBlock").addClass("displayNo")
        }
    });


    /*页面进来直接调用方法*/
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var contract_id ="" //订单号/合同号
    var state="" //序列号状态
    var program_time="" //编制日期
    var purchasing_company="" //采购单位
    var company_name="" //企业名称
    var count="" //总数
    var codes="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_querySeriNumSearch.json",
        data:{contract_id:contract_id,state:state,program_time:program_time,purchasing_company:purchasing_company,company_name:company_name,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success: function (data) {
            count=data.count
            codes=data.codes
            for(var i=0;i<codes.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td><a class='noclickCodes' href='javascript:;' onclick='clickCodes(this)'></a><p>"+bzNum+"</p></td>"
                tbodyList+="<td>"+codes[i].code+"</td>"
                tbodyList+="<td>"+codes[i].program_time+"</td>"
                tbodyList+="<td>"+codes[i].purchasing_company+"</td>"
                tbodyList+="<td>"+codes[i].contract_id+"</td>"
                tbodyList+="<td>"+codes[i].company_name+"</td>"
                tbodyList+="<td>"+codes[i].material_code+"</td>"
                tbodyList+="<td>"+codes[i].product_identify+"</td>"
                tbodyList+="<td>"+codes[i].product_name+"</td>"
                tbodyList+="<td>"+codes[i].specification+"</td>"
                tbodyList+="<td>"+codes[i].state+"</td>"
                tbodyList+="</tr>"
            }
            $(".qsns_bottom_tbody").html(" ")
            $(".qsns_bottom_tbody").append(tbodyList)

            if(count>0) {
                var asButton = ""
                var countPages = Math.ceil(count / limitValue)
                var PageNo  //当前页码
                if (startValue == 0) {
                    PageNo = 1
                }
                $(".pageNo").val(PageNo)
                var nextStartRow//下一页开始显示的编号
                asButton += "<a><img src='../images/sts_4.png'></a>"
                asButton += "<p>" + PageNo + "/" + countPages + "</p>"
                if (countPages > 1) {
                    nextStartRow = PageNo * limitValue
                    asButton += "<a class=clickCursor onclick=goPage('" + contract_id + "','" + state + "','" + program_time + "','" + purchasing_company + "','" + company_name + "','" + nextStartRow + "','" + limitValue + "','next')><img src='../images/sts_5.png'></a>"
                } else {
                    asButton += "<a><img src='../images/sts_5.png'></a>"
                }
                $(".listperAuth_button").html(" ")
                $(".listperAuth_button").append(asButton)
            }
        },
        error:function(){
            alert("链接失败")
        }
    })
})
/*清除*/
function resetSubmit(){
    $("#qsnsForm")[0].reset()
}
/*查询*/
function  formButton(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var contract_id =$(".top_contract_id").val() //订单号/合同号
    var state=$(".top_state").val() //序列号状态
    var program_time=$(".top_program_time").val() //编制日期
    var purchasing_company=$(".top_purchasing_company").val() //采购单位
    var company_name=$(".top_company_name").val() //企业名称
    var count="" //总数
    var codes="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"",
        data:{contract_id:contract_id,state:state,program_time:program_time,purchasing_company:purchasing_company,company_name:company_name,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success: function (data) {
            count=data.count
            codes=data.codes
            for(var i=0;i<codes.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+codes[i].code+"</td>"
                tbodyList+="<td>"+codes[i].program_time+"</td>"
                tbodyList+="<td>"+codes[i].purchasing_company+"</td>"
                tbodyList+="<td>"+codes[i].contract_id+"</td>"
                tbodyList+="<td>"+codes[i].company_name+"</td>"
                tbodyList+="<td>"+codes[i].material_code+"</td>"
                tbodyList+="<td>"+codes[i].product_identify+"</td>"
                tbodyList+="<td>"+codes[i].product_name+"</td>"
                tbodyList+="<td>"+codes[i].specification+"</td>"
                tbodyList+="<td>"+codes[i].state+"</td>"
                tbodyList+="</tr>"
            }
            $(".qsns_bottom_tbody").html(" ")
            $(".qsns_bottom_tbody").append(tbodyList)

            var asButton=""
            var countPages=Math.ceil(count/limitValue)
            var PageNo  //当前页码
            if(startValue==0){
                PageNo=1
            }
            $(".pageNo").val(PageNo)
            var nextStartRow//下一页开始显示的编号
            asButton+="<a><img src='../images/sts_4.png'></a>"
            asButton+="<p>"+PageNo+"/"+countPages+"</p>"
            if(countPages>1){
                nextStartRow=PageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+contract_id+"','"+state+"','"+program_time+"','"+purchasing_company+"','"+company_name+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        },
        error:function(){
            alert("链接失败")
        }
    })
}

//页码跳转
function goPage(company_name,product_identify,product_name,specification,startValue,limitValue,isGo){
    $.ajax({
        url:"../queryStandard",
        data:{company_name:company_name,product_identify:product_identify,product_name:product_name,specification:specification,start:startValue,limit:limitValue},
        type : 'post',
        dataType : 'json',
        success:function(data){
            var tbodyList="" //保存解析的json数据
            var count=data.count
            var codes=data.codes
            var bzNum
            for(var i=0;i<codes.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+codes[i].code+"</td>"
                tbodyList+="<td>"+codes[i].program_time+"</td>"
                tbodyList+="<td>"+codes[i].purchasing_company+"</td>"
                tbodyList+="<td>"+codes[i].contract_id+"</td>"
                tbodyList+="<td>"+codes[i].company_name+"</td>"
                tbodyList+="<td>"+codes[i].material_code+"</td>"
                tbodyList+="<td>"+codes[i].product_identify+"</td>"
                tbodyList+="<td>"+codes[i].product_name+"</td>"
                tbodyList+="<td>"+codes[i].specification+"</td>"
                tbodyList+="<td>"+codes[i].state+"</td>"
                tbodyList+="</tr>"
            }
            $(".qsns_bottom_tbody").html(" ")
            $(".qsns_bottom_tbody").append(tbodyList)

            var asButton=""
            var pageNo=$(".pageNo").val()  //当前页码
            var countPages=Math.ceil(count/limitValue)
            var noPage
            if(isGo=="next"){
                noPage=Number($(".pageNo").val())+1
                if(noPage>countPages){
                    pageNo=countPages
                }else{
                    pageNo=noPage
                }
            }
            if(isGo=="pre"){
                noPage=Number($(".pageNo").val())-1
                if(noPage==0){
                    noPage=1
                }
                pageNo=noPage
            }
            $(".pageNo").val(pageNo)
            var preStartRow //上一页开始显示的编号
            var nextStartRow//下一页开始显示的编号
            if(pageNo>1){
                preStartRow=(pageNo-2)*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+contract_id+"','"+state+"','"+program_time+"','"+purchasing_company+"','"+company_name+"','"+preStartRow+"','"+limitValue+"','pre')><img src='../images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+contract_id+"','"+state+"','"+program_time+"','"+purchasing_company+"','"+company_name+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        }
    })
}
/*生成条形码*/
function create_barCode(){
    var docuHeight=$(document).height()  //页面可视区域
    $(".barcode").height(docuHeight)
    var code="" //序列号
    code=$(".clickCodes").parent().next().text().trim()
    $(".barcode").removeClass("displayNo").addClass("displayBlock")
    $(".barcodeContent").empty().barcode(code,"code128",{ barWidth: 2, barHeight: 30 })
}
/*生成二维码*/
function create_qrCode(){
    var docuHeight=$(document).height()  //页面可视区域
    $(".qrcode").height(docuHeight)
    var code="" //序列号
    code=$(".clickCodes").parent().next().text().trim()
    $(".qrcode").removeClass("displayNo").addClass("displayBlock")
    $(".qrcodeContent").empty().qrcode(code)
}
/*点击序号，如果背景是白的，就变成蓝色，如果是蓝色，就变成白色*/
function clickCodes(str){
    if($(str).hasClass("noclickCodes")){
        $(".qsns_bottom_tbody a").removeClass("clickCodes").addClass("noclickCodes")
        $(str).removeClass("noclickCodes").addClass("clickCodes")
    }else{
        $(str).removeClass("clickCodes").addClass("noclickCodes")
    }
}