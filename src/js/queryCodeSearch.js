/**
 * Created by zb on 2016/2/29.
 */
$(function(){
    /*给nav a 绑定一个click事件*/
    $(".nav a").on("click",function(){
        $(".nav a").removeClass("colorClick").addClass("colorNoClick")
        $(this).removeClass("colorNoClick").addClass("colorClick")
    })



    var c = $(window).width();
    var e = $(window).height();
    var d = $(".fl").outerWidth();
    var f = $(".fl").outerHeight();
    $(".loadingImg").css({
        position: "absolute",
        left: (c / 2) - (d / 2),
        top: (e / 2) - (f / 2)
    })

    $(".loading_Img").css("display","block")
    //$(".")
    /*页面打开，直接调用一个方法*/
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var company_name="" //企业名称
    var product_identify="" //产品标识代码
    var product_name="" //产品名称
    var specification="" //规格型号
    var count="" //总数
    var productInfos="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_codeQuery.json",
        data:{company_name:company_name,product_identify:product_identify,product_name:product_name,specification:specification,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
           $(".loading_Img").css("display","none")
            count=data.count
            productInfos=data.productInfos
            $.each(productInfos,function(index,pro){
                console.log(pro.company_name)
            })
            for(var i=0;i<productInfos.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+productInfos[i].company_name+"</td>"
                tbodyList+="<td>"+productInfos[i].product_identify+"</td>"
                tbodyList+="<td>"+productInfos[i].product_name+"</td>"
                tbodyList+="<td>"+productInfos[i].specification+"</td>"
                tbodyList+="<td>"+productInfos[i].measurement+"</td>"
                tbodyList+="<td>"+productInfos[i].material_code+"</td>"
                tbodyList+="<td>"+productInfos[i].business+"</td>"
                tbodyList+="<td><a href='ss?id="+productInfos[i]._id.$oid+"'>编制序列号</a></td>"
                tbodyList+="</tr>"
            }
            $(".cq_tbody").html(" ")
            $(".cq_tbody").append(tbodyList)

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
                    asButton += "<a class=clickCursor onclick=goPage('" + company_name + "','" + product_identify + "','" + product_name + "','" + specification + "','" + nextStartRow + "','" + limitValue + "','next')><img src='../images/sts_5.png'></a>"
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
    $("#cqForm")[0].reset()
}

/*查询*/
function  formButton(){
    $(".loading_Img").css("display","block")
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var company_name=$(".cqt_enterpriseName").val() //企业名称
    var product_identify=$(".cqt_productCode").val() //产品标识代码
    var product_name=$(".cqt_productName").val() //产品名称
    var specification=$(".cqt_specifications").val() //规格型号
    var count="" //总数
    var productInfos="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_codeQuery.json",
        data:{company_name:company_name,product_identify:product_identify,product_name:product_name,specification:specification,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
            $(".loading_Img").css("display","none")
            count=data.count
            productInfos=data.productInfos
            for(var i=0;i<productInfos.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+productInfos[i].company_name+"</td>"
                tbodyList+="<td>"+productInfos[i].product_identify+"</td>"
                tbodyList+="<td>"+productInfos[i].product_name+"</td>"
                tbodyList+="<td>"+productInfos[i].specification+"</td>"
                tbodyList+="<td>"+productInfos[i].measurement+"</td>"
                tbodyList+="<td>"+productInfos[i].material_code+"</td>"
                tbodyList+="<td>"+productInfos[i].business+"</td>"
                tbodyList+="<td><a href='ss?id="+productInfos[i]._id.$oid+"'>编制序列号</a></td>"
                tbodyList+="</tr>"
            }
            $(".cq_tbody").html(" ")
            $(".cq_tbody").append(tbodyList)

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
                asButton+="<a class=clickCursor onclick=goPage('"+company_name+"','"+product_identify+"','"+product_name+"','"+specification+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
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
    $(".loading_Img").css("display","block")
    $.ajax({
        url:"../queryStandard",
        data:{company_name:company_name,product_identify:product_identify,product_name:product_name,specification:specification,start:startValue,limit:limitValue},
        type : 'post',
        dataType : 'json',
        success:function(data){
            $(".loading_Img").css("display","none")
            var measurement="" //计量单位
            var tbodyList="" //保存解析的json数据
            var count=data.count
            var bzxx=data.bzxx
            var bzNum
            for(var i=0;i<bzxx.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+productInfos[i].company_name+"</td>"
                tbodyList+="<td>"+productInfos[i].product_identify+"</td>"
                tbodyList+="<td>"+productInfos[i].product_name+"</td>"
                tbodyList+="<td>"+productInfos[i].specification+"</td>"
                tbodyList+="<td>"+productInfos[i].measurement+"</td>"
                tbodyList+="<td>"+productInfos[i].material_code+"</td>"
                tbodyList+="<td>"+productInfos[i].business+"</td>"
                tbodyList+="<td><a href='ss?id="+productInfos[i]._id.$oid+"'>编制序列号</a></td>"
                tbodyList+="</tr>"
            }
            $(".cq_tbody").html(" ")
            $(".cq_tbody").append(tbodyList)

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
                asButton+="<a class=clickCursor onclick=goPage('"+company_name+"','"+product_identify+"','"+product_name+"','"+specification+"','"+preStartRow+"','"+limitValue+"','pre')><img src='../images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+company_name+"','"+product_identify+"','"+product_name+"','"+specification+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        }
    })
}

