/**
 * Created by zb on 2016/3/28.
 */
$(function(){
    /*页面刚点开调用此方法*/
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var com_name="" //公司名称
    var org_code="" //组织机构代码
    var count="" //总数
    var companyList="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_companyList.json",
        type:"post",
        data:{com_name:com_name,org_code:org_code,start:startValue,limit:limitValue},
        dataType:"json",
        success:function(data){
            count=data.count
            companyList=data.companyList
            for(var i=0;i<companyList.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+companyList[i].com_name+"</td>"
                tbodyList+="<td>"+companyList[i].org_code+"</td>"
                tbodyList+="<td>"+timeStamp2String(companyList[i].add_time.$date)+"</td>"
                tbodyList+="<td>"+companyList[i].com_addr+"</td>"
                tbodyList+="<td>"+companyList[i].con_person+"</td>"
                tbodyList+="<td>"+companyList[i].con_way+"</td>"
                tbodyList+="</tr>"
            }
            $(".cpl_bottom_tbody").html("")
            $(".cpl_bottom_tbody").append(tbodyList)

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
                    asButton += "<a class=clickCursor onclick=goPage('" + com_name + "','" + org_code + "','" + nextStartRow + "','" + limitValue + "','next')><img src='../images/sts_5.png'></a>"
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

    /*给新增公司页绑定一个click事件，点击cpl_create之外的地方，调用closeCreate方法*/
    $(".cpl_create").on("click",function(event){
        event.stopPropagation();
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.id=='cpl_create'){
            closeCreate()
        }
    });
})
/*查询*/
function formButton(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var com_name=$(".top_com_name").val() //公司名称
    var org_code=$(".top_org_code").val() //组织机构代码
    var count="" //总数
    var companyList="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/demo_companyList.json",
        type:"post",
        data:{com_name:com_name,org_code:org_code,start:startValue,limit:limitValue},
        dataType:"json",
        success:function(data){
            count=data.count
            companyList=data.companyList
            for(var i=0;i<companyList.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+companyList[i].com_name+"</td>"
                tbodyList+="<td>"+companyList[i].org_code+"</td>"
                tbodyList+="<td>"+timeStamp2String(companyList[i].add_time.$date)+"</td>"
                tbodyList+="<td>"+companyList[i].com_addr+"</td>"
                tbodyList+="<td>"+companyList[i].con_person+"</td>"
                tbodyList+="<td>"+companyList[i].con_way+"</td>"
                tbodyList+="</tr>"
            }
            $(".cpl_bottom_tbody").html("")
            $(".cpl_bottom_tbody").append(tbodyList)

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
                    asButton += "<a class=clickCursor onclick=goPage('" + com_name + "','" + org_code + "','" + nextStartRow + "','" + limitValue + "','next')><img src='../images/sts_5.png'></a>"
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
}
/*清除*/
function resetSubmit(){
    $("#cpl_top_form")[0].reset()
}
/*新增公司
* 点击此方法，弹出悬浮框
* */
function companyCreat(){
   $(".cpl_create").removeClass("displayNo").addClass("displayBlock")
    var docuHeight = $(document).height()  //页面可视区域
    $(".cpl_create").height(docuHeight)
}

//页码跳转
function goPage(com_name,org_code,startValue,limitValue,isGo){
    $.ajax({
        url:"../json/demo_companyList.json",
        data:{com_name:com_name,org_code:org_code,start:startValue,limit:limitValue},
        type : 'post',
        dataType : 'json',
        success:function(data){
            var count="" //总数
            var companyList="" //保存data信息
            var tbodyList=""
            var bzNum
            count=data.count
            companyList=data.companyList
            for(var i=0;i<companyList.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+companyList[i].com_name+"</td>"
                tbodyList+="<td>"+companyList[i].org_code+"</td>"
                tbodyList+="<td>"+timeStamp2String(companyList[i].add_time.$date)+"</td>"
                tbodyList+="<td>"+companyList[i].com_addr+"</td>"
                tbodyList+="<td>"+companyList[i].con_person+"</td>"
                tbodyList+="<td>"+companyList[i].con_way+"</td>"
                tbodyList+="</tr>"
            }
            $(".cpl_bottom_tbody").html("")
            $(".cpl_bottom_tbody").append(tbodyList)


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
                asButton+="<a class=clickCursor onclick=goPage('"+com_name+"','"+org_code+"','"+preStartRow+"','"+limitValue+"','pre')><img src='../images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+com_name+"','"+org_code+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        }
    })
}

/*关闭新增页面*/
function closeCreate(){
    $(".cpl_create").removeClass("displayBlock").addClass("displayNo")
}
/*保存公司*/
function creat_button(){
    var option={
        url:ctx+"/addCompany",
        type:"post",
        success:function(data){
            formButton()
            closeCreate()
        }
    }
    $("#create_cpl_form").ajaxSubmit(option)
}