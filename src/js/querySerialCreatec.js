/**
 * Created by zb on 2016/3/9.
 */
var specification="" //规格型号
var groupId=""
$(function(){
    /*页面打开，调用一个方法，返回需要的数据
    * data: _id 订单ID
    * return
    * material_code;// 物资编号
    * material_name;// 物资名称
    * product_identify// 产品标示代码
    * purchasing_company//采购单位
    * company_name//企业名称
    * contract_id;//订单、合同号
    * specification //规格型号
    * */
    var _id=$("._id").val() //id
    var isonSupply="" //保存supply的data
    var jsonBzxx="" //保存bzxx的data
    var material_code="" //物资编号
    var material_name="" //物资名称
    var product_identify="" //产品标识代码
    var purchasing_company="" //采购单位
    var company_name=""  //企业名称
    var contract_id="" //订单号/合同号
    $.post("../json/demo_querySerialCreatec.json",{_id:_id},function(data){
        isonSupply=data.supply[0]
        jsonBzxx=data.bzxx[0]
        material_code=isonSupply.material_name
        $(".body_material_code").val(material_code)
        material_name=isonSupply.material_name
        $(".body_material_name").val(material_name)
        product_identify=isonSupply.product_identify
        $(".body_product_identify").val(product_identify)
        purchasing_company=jsonBzxx.purchasing_company
        $(".createCode_purchasing_company").val(purchasing_company)
        company_name=jsonBzxx.company_name
        $(".createCode_company_name").val(company_name)
        contract_id=jsonBzxx.contract_id
        $(".createCode_orderno").val(contract_id)
        specification=isonSupply.specification
    },"json")
})

/*自动创建序列号*/
function creatCode(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var material_code="" //物资编号
    material_code=$(".body_material_code").val()
    var material_name="" //物资名称
    material_name=$(".body_material_name").val()
    var product_identify="" //产品标识代码
    product_identify=$(".body_product_identify").val()
    var purchasing_company="" //采购单位
    purchasing_company=$(".createCode_purchasing_company").val()
    var company_name=""  //企业名称
    company_name=$(".createCode_company_name").val()
    var contract_id="" //订单号/合同号
    contract_id=$(".createCode_orderno").val()
    var program_time="" //编制日期
    program_time=$(".createCode_date").val()
    var branchId="" //关联Id
    branchId=$("._id").val()

    var num="" //数量
    num=$(".createCode_creatNum").val()


    var count="" //总数
    var codes="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_querySerialCreatecList.json",
        data:{material_code:material_code,material_name:material_name,product_identify:product_identify,purchasing_company:purchasing_company,company_name:company_name,contract_id:contract_id,num:num,program_time:program_time,specification:specification,branchId:branchId,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
            $(".qscc_body_codeList_button").removeClass("displayNo").addClass("displayBlock")
            count=data.count
            codes=data.codes
            groupId=codes[0].groupId
            for(var i=0;i<codes.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+codes[i].code+"</td>"
                tbodyList+="<td>"+codes[i].program_time+"</td>"
                tbodyList+="<td>"+codes[i].purchasing_company+"</td>"
                tbodyList+="<td>"+codes[i].contract_id+"</td>"
                tbodyList+="<td>"+codes[i].material_code+"</td>"
                tbodyList+="<td>"+codes[i].material_name+"</td>"
                tbodyList+="<td>"+codes[i].specification+"</td>"
                tbodyList+="<td>"+codes[i].product_identify+"</td>"
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
                asButton+="<a class=clickCursor onclick=goPage('"+material_code+"','"+material_name+"','"+product_identify+"','"+purchasing_company+"','"+company_name+"','"+contract_id+"','"+num+"','"+program_time+"','"+specification+"','"+branchId+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
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
function goPage(material_code,material_name,product_identify,purchasing_company,company_name,contract_id,num,program_time,specification,branchId,startValue,limitValue,isGo){
    $.ajax({
        url:"../json/demo_querySerialCreatecList.json",
        data:{material_code:material_code,material_name:material_name,product_identify:product_identify,purchasing_company:purchasing_company,company_name:company_name,contract_id:contract_id,num:num,program_time:program_time,specification:specification,branchId:branchId,start:startValue,limit:limitValue},
        type : 'post',
        dataType : 'json',
        success:function(data){
            var count="" //总数
            var codes="" //保存data信息
            var tbodyList=""
            var bzNum
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
                tbodyList+="<td>"+codes[i].material_code+"</td>"
                tbodyList+="<td>"+codes[i].material_name+"</td>"
                tbodyList+="<td>"+codes[i].specification+"</td>"
                tbodyList+="<td>"+codes[i].product_identify+"</td>"
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
                asButton+="<a class=clickCursor onclick=goPage('"+material_code+"','"+material_name+"','"+product_identify+"','"+purchasing_company+"','"+company_name+"','"+contract_id+"','"+num+"','"+program_time+"','"+specification+"','"+branchId+"','"+preStartRow+"','"+limitValue+"','pre')><img src='../images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+material_code+"','"+material_name+"','"+product_identify+"','"+purchasing_company+"','"+company_name+"','"+contract_id+"','"+num+"','"+program_time+"','"+specification+"','"+branchId+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
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
                $(".qscc_body_codeList_button").removeClass("displayBlock").addClass("displayNo")
            }else{
                alert("删除失败")
            }
        }

    })
}