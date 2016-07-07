/**
 * Created by zb on 2016/3/9.
 */
$(function () {
    /*调整头部*/
    $(".nav ul li a").removeClass("colorClick").addClass("colorNoClick")
    $(".waybill").removeClass("colorNoClick").addClass("colorClick")
    /*从页面直接进来调用方法
    * 参数：
    * var logistics_id 运单号
    * var logistics_company 承运公司
    * var contract_id 订单号/合同号
    * var logistics_stats 物流状态
    * var car_license 车号
    * var good_num 货号
    * 返回一个data,解析，将列表放到tbody里面
    * */
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var count="" //总数
    var codes="" //保存data信息
    var tbodyList=""
    var bzNum
    /*参数*/
    var logistics_id="" //运单号
    var logistics_company="" //承运公司
    var contract_id="" //订单号/合同号
    var logistics_stats="" //物流状态
    var car_license="" //车号
    var good_num="" //货号

    $.ajax({
        url:"../json/queryWaybillSearch.json",
        data:{logistics_id:logistics_id,logistics_company:logistics_company,contract_id:contract_id,logistics_stats:logistics_stats,car_license:car_license,good_num:good_num,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
            count=data.count
            codes=data.waybillInfo
            for(var i=0;i<codes.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+codes[i].logistics_id+"</td>"
                tbodyList+="<td>"+codes[i].logistics_company+"</td>"
                tbodyList+="<td>"+codes[i].contract_id+"</td>"
                tbodyList+="<td>"+codes[i].car_license+"</td>"
                tbodyList+="<td>"+codes[i].good_num+"</td>"
                tbodyList+="<td>"+codes[i].send_addr+"</td>"
                tbodyList+="<td>"+codes[i].send_duty+"</td>"
                tbodyList+="<td>"+codes[i].send_time+"</td>"
                tbodyList+="<td>"+codes[i].receive_addr+"</td>"
                tbodyList+="<td>"+timeStamp2String(codes[i].supply_time.$date)+"</td>"
                tbodyList+="<td><a onclick=showSendInfor('"+codes[i]._id.$oid+"')>发货清单</a></td>"
                tbodyList+="<td id='stateCss'>"+codes[i].logistics_stats+"</td>"
                tbodyList+="</tr>"
            }
            $(".qwbs_bottom_tbody").html(" ")
            $(".qwbs_bottom_tbody").append(tbodyList)

            if(count>0){
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
                    asButton+="<a class=clickCursor onclick=goPage('"+logistics_id+"','"+logistics_company+"','"+contract_id+"','"+logistics_stats+"','"+car_license+"','"+good_num+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
                }else{
                    asButton+="<a><img src='../images/sts_5.png'></a>"
                }
                $(".listperAuth_button").html(" ")
                $(".listperAuth_button").append(asButton)
            }

        },
        error:function(){
            alert("链接失败")
        }
    })

    /*给发货清单页绑定一个click事件，点击create_psl之外的地方，调用pis_close方法*/
    $(".sendList").on("click",function(event){
        event.stopPropagation();
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.id=='sendList'){
            closeDetails()
        }
    });

})



/*清除*/
function resetSubmit(){
    $("#qwbs_top_form")[0].reset()
}
/*查询*/
function formButton(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var count="" //总数
    var codes="" //保存data信息
    var tbodyList=""
    var bzNum
    /*参数*/
    var logistics_id=$(".top_logistics_id").val() //运单号
    var logistics_company=$(".top_logistics_company").val() //承运公司
    var contract_id=$(".top_contract_id").val() //订单号/合同号
    var logistics_stats=$(".top_logistics_stats option:selected").val() //物流状态
    var car_license=$(".top_car_license").val() //车号
    var good_num=$(".top_good_num").val() //货号

    $.ajax({
        url:"../json/queryWaybillSearch.json",
        data:{logistics_id:logistics_id,logistics_company:logistics_company,contract_id:contract_id,logistics_stats:logistics_stats,car_license:car_license,good_num:good_num,start:startValue,limit:limitValue},
        type:"post",
        dataType:"json",
        success:function(data){
            count=data.count
            codes=data.waybillInfo
            for(var i=0;i<codes.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+codes[i].logistics_id+"</td>"
                tbodyList+="<td>"+codes[i].logistics_company+"</td>"
                tbodyList+="<td>"+codes[i].contract_id+"</td>"
                tbodyList+="<td>"+codes[i].car_license+"</td>"
                tbodyList+="<td>"+codes[i].good_num+"</td>"
                tbodyList+="<td>"+codes[i].send_addr+"</td>"
                tbodyList+="<td>"+codes[i].send_duty+"</td>"
                tbodyList+="<td>"+codes[i].send_time+"</td>"
                tbodyList+="<td>"+codes[i].receive_addr+"</td>"
                tbodyList+="<td>"+timeStamp2String(codes[i].supply_time.$date)+"</td>"
                tbodyList+="<td><a onclick=showSendInfor('"+codes[i]._id.$oid+"')>发货清单</a></td>"
                tbodyList+="<td id='stateCss'>"+codes[i].logistics_stats+"</td>"
                tbodyList+="</tr>"
            }
            $(".qwbs_bottom_tbody").html(" ")
            $(".qwbs_bottom_tbody").append(tbodyList)

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
                asButton+="<a class=clickCursor onclick=goPage('"+logistics_id+"','"+logistics_company+"','"+contract_id+"','"+logistics_stats+"','"+car_license+"','"+good_num+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
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
function goPage(logistics_id,logistics_company,contract_id,logistics_stats,car_license,good_num,startValue,limitValue,isGo){
    $.ajax({
        url:"../json/queryWaybillSearch.json",
        data:{logistics_id:logistics_id,logistics_company:logistics_company,contract_id:contract_id,logistics_stats:logistics_stats,car_license:car_license,good_num:good_num,start:startValue,limit:limitValue},
        type : 'post',
        dataType : 'json',
        success:function(data){
            var count="" //总数
            var codes="" //保存data信息
            var tbodyList=""
            var bzNum
            count=data.count
            codes=data.waybillInfo
            for(var i=0;i<codes.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+codes[i].logistics_id+"</td>"
                tbodyList+="<td>"+codes[i].logistics_company+"</td>"
                tbodyList+="<td>"+codes[i].contract_id+"</td>"
                tbodyList+="<td>"+codes[i].car_license+"</td>"
                tbodyList+="<td>"+codes[i].good_num+"</td>"
                tbodyList+="<td>"+codes[i].send_addr+"</td>"
                tbodyList+="<td>"+codes[i].send_duty+"</td>"
                tbodyList+="<td>"+codes[i].send_time+"</td>"
                tbodyList+="<td>"+codes[i].receive_addr+"</td>"
                tbodyList+="<td>"+timeStamp2String(codes[i].supply_time.$date)+"</td>"
                tbodyList+="<td><a onclick=showSendInfor('"+codes[i]._id.$oid+"')>发货清单</a></td>"
                tbodyList+="<td id='stateCss'>"+codes[i].logistics_stats+"</td>"
                tbodyList+="</tr>"
            }
            $(".qwbs_bottom_tbody").html(" ")
            $(".qwbs_bottom_tbody").append(tbodyList)

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
                asButton+="<a class=clickCursor onclick=goPage('"+logistics_id+"','"+logistics_company+"','"+contract_id+"','"+logistics_stats+"','"+car_license+"','"+good_num+"','"+preStartRow+"','"+limitValue+"','pre')><img src='../images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+logistics_id+"','"+logistics_company+"','"+contract_id+"','"+logistics_stats+"','"+car_license+"','"+good_num+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        }
    })
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

/*点击发货清单*/
function showSendInfor(str){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var count="" //总数
    var goodsList="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:"../json/queryWaybillSearch_showSend.json",
        data:{id:str},
        type:"post",
        dataType:"json",
        success:function(data){
           $(".sendList").removeClass("displayNo").addClass("displayBlock")
            count=data.count
            goodsList=data.goodsList
            for(var i=0;i<goodsList.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+goodsList[i].code+"</td>"
                tbodyList+="<td>"+goodsList[i].materials_name+"</td>"
                tbodyList+="<td>"+goodsList[i].specifications_model+"</td>"
                tbodyList+="<td>"+goodsList[i].measurement+"</td>"
                tbodyList+="<td>"+goodsList[i].product_code+"</td>"
                tbodyList+="<td>"+goodsList[i].materials_code+"</td>"
                tbodyList+="<td>"+goodsList[i].remarks+"</td>"
                tbodyList+="</tr>"
            }

            $(".show_sendList_tbody").html("")
            $(".show_sendList_tbody").append(tbodyList)

            var asButton=""
            var countPages=Math.ceil(count/limitValue)
            var PageNo  //当前页码
            if(startValue==0){
                PageNo=1
            }
            $(".pageNoSend").val(PageNo)
            var nextStartRow//下一页开始显示的编号
            asButton+="<a><img src='../images/sts_4.png'></a>"
            asButton+="<p>"+PageNo+"/"+countPages+"</p>"
            if(countPages>1){
                nextStartRow=PageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPageSend('"+str+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_5.png'></a>"
            }
            $(".listperAuth_send_button").html(" ")
            $(".listperAuth_send_button").append(asButton)

            //获取页面可视区域高度和prShHeight，然后判断，如果prShHeight小于docuHeight，productInformation的高度为prShHeight
            var docuHeight = $(document).height()  //页面可视区域
            var hisPhHeight = $(".show_sendList").height()
            //当hisPhHeight<docuHeight时，设定新的hisPrice高度
            var newHisHeight
            newHisHeight = docuHeight - 249
            if (hisPhHeight < docuHeight) {
                $(".sendList").height(docuHeight)
                $(".show_sendList").height(newHisHeight)
            }
        },
        error:function(){
            alert("链接失败")
        }
    })
}

/*send页面的gopage*/
function goPageSend(str,startValue,limitValue,isGo){
    $.ajax({
        url:"../json/queryWaybillSearch_showSend.json",
        data:{id:str,start:startValue,limit:limitValue},
        type : 'post',
        dataType : 'json',
        success:function(data){

        var count = "" //总数
        var goodsList = "" //保存data信息
        var tbodyList = ""
        var bzNum
        count = data.count
        goodsList = data.goodsList
        for (var i = 0; i < goodsList.length; i++) {
            bzNum = Number(startValue) + i + 1
            tbodyList += "<tr>"
            tbodyList += "<td>" + bzNum + "</td>"
            tbodyList += "<td>" + goodsList[i].code + "</td>"
            tbodyList += "<td>" + goodsList[i].materials_name + "</td>"
            tbodyList += "<td>" + goodsList[i].specifications_model + "</td>"
            tbodyList += "<td>" + goodsList[i].measurement + "</td>"
            tbodyList += "<td>" + goodsList[i].product_code + "</td>"
            tbodyList += "<td>" + goodsList[i].materials_code + "</td>"
            tbodyList += "<td>" + goodsList[i].remarks + "</td>"
            tbodyList += "</tr>"
        }

        $(".show_sendList_tbody").html("")
        $(".show_sendList_tbody").append(tbodyList)

        var asButton = ""
        var pageNo = $(".pageNoSend").val()  //当前页码
        var countPages = Math.ceil(count / limitValue)
        var noPage
        if (isGo == "next") {
            noPage = Number($(".pageNo").val()) + 1
            if (noPage > countPages) {
                pageNo = countPages
            } else {
                pageNo = noPage
            }
        }
        if (isGo == "pre") {
            noPage = Number($(".pageNo").val()) - 1
            if (noPage == 0) {
                noPage = 1
            }
            pageNo = noPage
        }
        $(".pageNoSend").val(pageNo)
        var preStartRow //上一页开始显示的编号
        var nextStartRow//下一页开始显示的编号
        if (pageNo > 1) {
            preStartRow = (pageNo - 2) * limitValue
            asButton += "<a class=clickCursor onclick=goPageSend('" + str + "','" + preStartRow + "','" + limitValue + "','pre')><img src='../images/sts_4.png'></a>"
        } else {
            asButton += "<a><img src='../images/sts_4.png'></a>"
        }
        asButton += "<p>" + pageNo + "/" + countPages + "</p>"
        if (countPages > pageNo) {
            nextStartRow = pageNo * limitValue
            asButton += "<a class=clickCursor onclick=goPageSend('" + str + "','" + nextStartRow + "','" + limitValue + "','next')><img src='../images/sts_5.png'></a>"
        } else {
            asButton += "<a><img src='../images/sts_5.png'></a>"
        }
        $(".listperAuth_send_button").html(" ")
        $(".listperAuth_send_button").append(asButton)

    }
    })
}

/*关闭详情页*/
function closeDetails(){
    $(".sendList").removeClass("displayBlock").addClass("displayNo")
}
