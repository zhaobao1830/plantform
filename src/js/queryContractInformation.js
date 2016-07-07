/**
 * Created by zb on 2016/3/4.
 */
$(function(){
    /*打开页面。获取contract_id;//订单、合同号，把这个传到后台，把返回的东西显示到页面*/
    var contract_id=$(".contract_id").val() //订单/合同号
    $.ajax({
        url:"../json/demo_contractInformation.json",
        type:"post",
        data:{contract_id:contract_id},
        dataType:"json",
        success:function(data){
            var contractJson=data //保存json
            var purchasing=contractJson.purchasing //订单明细表
            var supply=contractJson.supply //供货计划
            var company_name=contractJson.company_name //企业名称
            var purchasing_company=contractJson.purchasing_company //采购单位
            //给企业名称  订单号/合同号 采购单位 赋值
            $(".content_company_name").val(company_name)
            $(".content_contract_id").val(contract_id)
            $(".content_purchasing_company").val(purchasing_company)
            //给订货明细表赋值
            var purchasingTbodyList="" //qcti_orderDetails_tbody里面的东西
            for(var i=0;i<purchasing.length;i++){
                purchasingTbodyList+="<tr>"
                purchasingTbodyList+="<td>"+purchasing[i].material_code+"</td>"
                purchasingTbodyList+="<td>"+purchasing[i].material_name+"</td>"
                purchasingTbodyList+="<td>"+purchasing[i].specification+"</td>"
                purchasingTbodyList+="<td>"+purchasing[i].measurement+"</td>"
                purchasingTbodyList+="<td>"+purchasing[i].num+"</td>"
                purchasingTbodyList+="<td>"+purchasing[i].price+"</td>"
                purchasingTbodyList+="<td>"+purchasing[i].total_price+"</td>"
                purchasingTbodyList+="<td>"+purchasing[i].company+"</td>"
                purchasingTbodyList+="</tr>"
            }
            $(".qcti_orderDetails_tbody").html("")
            $(".qcti_orderDetails_tbody").append(purchasingTbodyList)

            //给供货计划赋值
            var supplyPlanTbodyList="" //qcti_supplyPlan_tbody里面的值
            for(var i=0;i<supply.length;i++){
                supplyPlanTbodyList+="<tr>"
                supplyPlanTbodyList+="<td>"+supply[i].material_code+"</td>"
                supplyPlanTbodyList+="<td>"+supply[i].material_name+"</td>"
                supplyPlanTbodyList+="<td>"+supply[i].specification+"</td>"
                supplyPlanTbodyList+="<td>"+supply[i].measurement+"</td>"
                supplyPlanTbodyList+="<td>"+supply[i].num+"</td>"
                supplyPlanTbodyList+="<td>"+supply[i].supply_time+"</td>"
                supplyPlanTbodyList+="<td>"+supply[i].address+"</td>"
                supplyPlanTbodyList+="<td>"+supply[i].person+"</td>"
                if(supply[i].code_num==0){
                    supplyPlanTbodyList+="<td><a href='#?contract_id="+supply[i].contract_id+"'>编制序列号</a></td>"
                }else{
                    supplyPlanTbodyList+="<td><a href='#?_id="+supply[i]._id+"'>查看详情</a></td>"
                }
                supplyPlanTbodyList+="</tr>"
            }
            $(".qcti_supplyPlan_tbody").html("")
            $(".qcti_supplyPlan_tbody").append(supplyPlanTbodyList)
        }
    })
 })