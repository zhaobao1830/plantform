/**
 * Created by zb on 2016/4/21.
 */
$(function(){
    /*打开页面就调用查询方法*/
    materManageSearch()
})
/*查询*/
function materManageSearch(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var material_code=$(".materManage_material_code").val()  //物资编码
    var material_name=$(".materManage_material_name").val()  //物资名称
    var count="" //总数
    var accountList="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_queryMaterialManage.json",
        type:"post",
        data:{material_code:material_code,material_name:material_name,start:startValue,limit:limitValue},
        async:"false",
        dataType:"json",
        success:function(data){
            count=data.count
            accountList=data.data
            for(var i=0;i<accountList.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+accountList[i].material_code+"</td>"
                tbodyList+="<td>"+accountList[i].material_name+"</td>"
                tbodyList+="<td>"+accountList[i].specification+"</td>"
                tbodyList+="<td>"+accountList[i].measurement+"</td>"
                if(accountList[i].isPrecious=="1"){
                    tbodyList+="<td>是</td>"
                }else{
                    tbodyList+="<td>否</td>"
                }
                tbodyList+="<td>"+timeStamp2String(accountList[i].update_time.$date)+"</td>"
                tbodyList+="<td><a onclick=show_modify_materManage('"+accountList[i]._id.$oid+"')>修改</a><a onclick=deleteMater('"+accountList[i]._id.$oid+"')>删除</a></td>"
                tbodyList+="</tr>"
            }
            $(".materManage_tbody").html(" ")
            $(".materManage_tbody").append(tbodyList)

            if(count>0) {
                var asButton = ""
                var countPages = Math.ceil(count / limitValue)
                var PageNo  //当前页码
                if (startValue == 0) {
                    PageNo = 1
                }
                $(".pageNo").val(PageNo)
                var nextStartRow//下一页开始显示的编号
                asButton += "<a><img src='"+ctx+"/images/sts_4.png'></a>"
                asButton += "<p>" + PageNo + "/" + countPages + "</p>"
                if (countPages > 1) {
                    nextStartRow = PageNo * limitValue
                    asButton += "<a  onclick=goPage('"+material_code+"','"+material_name+"','" + nextStartRow + "','" + limitValue + "','next')><img src='"+ctx+"/images/sts_5.png'></a>"
                } else {
                    asButton += "<a><img src='"+ctx+"/images/sts_5.png'></a>"
                }
                $(".listperAuth_button").html(" ")
                $(".listperAuth_button").append(asButton)
            }
        }
    })
}

function goPage(material_code,material_name,startValue,limitValue,isGo){
    $.ajax({
        url:"../json/demo_queryMaterialManage.json",
        data:{material_code:material_code,material_name:material_name,start:startValue,limit:limitValue},
        async:"false",
        dataType : 'json',
        success:function(data){
            var accountList
            var count="" //总数
            var bzxx="" //保存data信息
            var tbodyList=""
            var bzNum
            count=data.count
            accountList=data.data
            for(var i=0;i<accountList.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+accountList[i].material_code+"</td>"
                tbodyList+="<td>"+accountList[i].material_name+"</td>"
                tbodyList+="<td>"+accountList[i].specification+"</td>"
                tbodyList+="<td>"+accountList[i].measurement+"</td>"
                if(accountList[i].isPrecious=="1"){
                    tbodyList+="<td>是</td>"
                }else{
                    tbodyList+="<td>否</td>"
                }
                tbodyList+="<td>"+timeStamp2String(accountList[i].update_time.$date)+"</td>"
                tbodyList+="<td><a onclick=show_modify_materManage('"+accountList[i]._id.$oid+"')>修改</a><a onclick=deleteMater('"+accountList[i]._id.$oid+"')>删除</a></td>"
                tbodyList+="</tr>"
            }
            $(".materManage_tbody").html(" ")
            $(".materManage_tbody").append(tbodyList)


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
                asButton+="<a  onclick=goPage('"+material_code+"','"+material_name+"','"+preStartRow+"','"+limitValue+"','pre')><img src='"+ctx+"/images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a  onclick=goPage('"+material_code+"','"+material_name+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        }
    })
}
/*打开修改物资页面*/
function show_modify_materManage(str){
    $(".materManageId").val("")
    $(".materManageId").val(str)
    var bodyHeight=$(document).height() //页面可视高度
    $(".modify_materManage").height(bodyHeight)
    $(".modify_materManage").removeClass("displayNo").addClass("displayBlock")
    var dataJson="" //保存data
    var material_code="" //物资编码
    var material_name="" //物资名称
    var specification="" //规格型号
    var measurement="" //计量单位
    var isPrecious="" //是否重要物质
    $.ajax({
        url:"../json/query_updateMater.json",
        data:{_id:str},
        type:"post",
        dataType:"json",
        success:function(data){
            dataJson=data.data
            material_code=dataJson.material_code
            material_name=dataJson.material_name
            specification=dataJson.specification
            measurement=dataJson.measurement
            $(".mater_material_code").val(material_code)
            $(".mater_material_name").val(material_name)
            $(".mater_specification").val(specification)
            $(".mater_measurement").val(measurement)
            isPrecious=dataJson.isPrecious
            if(isPrecious=="1"){
                $(".mater_isPrecious").attr("checked",true)
            }else{
                $(".mater_isPrecious").attr("checked",false)
            }
        }
    })

}
/*关闭修改物资页面*/
function close_materManage_modify(){
    $(".modify_materManage").removeClass("displayBlock").addClass("displayNo")
}

/*删除物资*/
function deleteMater(str){
    if(confirm("是否确定删除")) {
        alert("tt")
        $.ajax({
            url: "",
            type: "post",
            data: {_id: str},
            dataYpe: "json",
            success: function () {
                materManageSearch()
            }
        })
    }
}
/*点击序号，如果背景是白的，就变成蓝色，如果是蓝色，就变成白色*/
function clickCodes(str){
    if($(str).hasClass("noclickCodes")){
        $(".materManage_tbody a").removeClass("clickCodes").addClass("noclickCodes")
        $(str).removeClass("noclickCodes").addClass("clickCodes")
    }else{
        $(str).removeClass("clickCodes").addClass("noclickCodes")
    }
}
/*保存*/
function saveModify_materManage(){
    var _id=$(".materManageId").val() //ID
    var material_code=$(".mater_material_code").val() //物资编码
    var material_name=$(".mater_material_name").val() //物资名称
    var specification=$(".mater_specification").val() //规格型号
    var measurement=$(".mater_measurement").val() //计量单位
    var isPrecious=$(".mater_isPrecious").is(':checked')?1:0//是否重要物质
    $.ajax({
        url:"",
        type:"post",
        data:{_id:_id,material_code:material_code,material_name:material_name,specification:specification,measurement:measurement,isPrecious:isPrecious},
        dataType:"json",
        success:function(){
            close_materManage_modify()
            materManageSearch()
        }
    })
}