/**
 * Created by zb on 2016/3/1.
 */
var product_name="" //产品名称
var product_identify="" //产品标识代码
var material_code="" //物资编码
var purchasing_company="" //采购单位
var groupId=""
$(function(){
    /*通过id获取产品详情信息*/
    var branchId=$(".branchId").val() //关联ID
    var jsonData="" //返回的JSON
     $.getJSON("../json/demo_querySerialCreatep.json",{branchId:branchId},function(data){
            jsonData=data.productInfos[0]
             product_name = jsonData.product_name
             product_identify = jsonData.product_identify
             material_code = jsonData.material_code
             purchasing_company = jsonData.purchasing_company

             $(".body_product_name").val(product_name)
             $(".body_product_identify").val(product_identify)
             $(".body_material_code").val(material_code)
             $(".createCode_purchasing_company").val(purchasing_company)

        }
    )


})
/*自动创建序列号*/
function creatCode(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var contract_id=$(".createCode_orderno").val() //订单号/合同号
    var program_time=$(".createCode_date").val() //编制日期
    var creatNum=$(".createCode_creatNum").val() //生成数量
    var branchId=$(".branchId").val() //关联ID
    var count="" //总数
    var productInfos="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_querySerialCreatepList.json",
        data:{product_name:product_name,product_identify:product_identify,material_code:material_code,purchasing_company:purchasing_company,contract_id:contract_id,program_time:program_time,num:creatNum,branchId:branchId,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
            $(".qscp_body_codeList_button").removeClass("displayNo").addClass("displayBlock")
            count=data.count
            productInfos=data.productInfos
            groupId=productInfos[0].groupId
            for(var i=0;i<productInfos.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+productInfos[i].code+"</td>"
                tbodyList+="<td>"+productInfos[i].program_time+"</td>"
                tbodyList+="<td>"+productInfos[i].purchasing_company+"</td>"
                tbodyList+="<td>"+productInfos[i].contract_id+"</td>"
                tbodyList+="<td>"+productInfos[i].material_code+"</td>"
                tbodyList+="<td>"+productInfos[i].product_name+"</td>"
                tbodyList+="<td>"+productInfos[i].specification+"</td>"
                tbodyList+="<td>"+productInfos[i].product_identify+"</td>"
                tbodyList+="</tr>"
            }
            $(".body_codeList_tbody").html(" ")
            $(".body_codeList_tbody").append(tbodyList)

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
                asButton+="<a class=clickCursor onclick=goPage('"+product_name+"','"+product_identify+"','"+material_code+"','"+purchasing_company+"','"+contract_id+"','"+program_time+"','"+creatNum+"','"+branchId+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
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
function goPage(product_name,product_identify,material_code,purchasing_company,contract_id,program_time,creatNum,branchId,
startValue,limitValue,isGo){
    $.ajax({
        url:"../queryStandard",
        data:{product_name:product_name,product_identify:product_identify,material_code:material_code,purchasing_company:purchasing_company,contract_id:contract_id,program_time:program_time,num:creatNum,branchId:branchId,start:startValue,limit:limitValue},
        type : 'post',
        dataType : 'json',
        success:function(data){
            var count="" //总数
            var productInfos="" //保存data信息
            var tbodyList=""
            var bzNum
            count=data.count
            productInfos=data.productInfos
            for(var i=0;i<productInfos.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+productInfos[i].code+"</td>"
                tbodyList+="<td>"+productInfos[i].program_time+"</td>"
                tbodyList+="<td>"+productInfos[i].purchasing_company+"</td>"
                tbodyList+="<td>"+productInfos[i].contract_id+"</td>"
                tbodyList+="<td>"+productInfos[i].material_code+"</td>"
                tbodyList+="<td>"+productInfos[i].product_name+"</td>"
                tbodyList+="<td>"+productInfos[i].specification+"</td>"
                tbodyList+="<td>"+productInfos[i].product_identify+"</td>"
                tbodyList+="</tr>"
            }
            $(".body_codeList_tbody").html(" ")
            $(".body_codeList_tbody").append(tbodyList)


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
                asButton+="<a class=clickCursor onclick=goPage('"+product_name+"','"+product_identify+"','"+material_code+"','"+purchasing_company+"','"+contract_id+"','"+program_time+"','"+creatNum+"','"+branchId+"','"+preStartRow+"','"+limitValue+"','pre')><img src='../images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+product_name+"','"+product_identify+"','"+material_code+"','"+purchasing_company+"','"+contract_id+"','"+program_time+"','"+creatNum+"','"+branchId+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        }
    })
}
/*生成序列号*/
function generateCode(){
    var branchId=$(".branchId").val() //关联ID
    groupId//组ID
    //现在已经获取到了关联ID和组ID
}
/*清空序列号*/
function codeEmpty(){
    $.ajax({
        url:"",
        data:{groupId:groupId},
        type:"post",
        success:function(data){
            if(data=="true"){
                $(".body_codeList_tbody").html()
                $(".qscp_body_codeList_button").removeClass("displayBlock").addClass("displayNo")
            }else{
                alert("删除失败")
            }
        }

    })
}

