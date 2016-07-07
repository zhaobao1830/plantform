/**
 * Created by zb on 2016/3/7.
 */
$(function(){
    /*调整头部*/
    $(".nav ul li a").removeClass("colorClick").addClass("colorNoClick")
    $(".contract").removeClass("colorNoClick").addClass("colorClick")

    /*设定company_name_search的left值，先获取content_company_namede的left值，然后加上10
    * 创建一个方法company_name_search_left()
    * window.onresize网页宽度改变的时候，调用company_name_search_left
    * 有问题
    * */
    //company_name_search_left()
    //window.onresize=company_name_search_left
    // function company_name_search_left(){
    //    var content_company_name_left=$(".content_company_name").position().left+10
    //    $(".company_name_search").css({left:content_company_name_left})
    //}
    //$(".company_name_search").css({left:90})
})
/*新增订货明细，点击以后，订货明细列表增加*/
function qcti_od_add() {
    $(".qcti_orderDetails_tbody").append("<tr><td><input type='text' value=''  onblur='searchBymaterialCode(this)' ></td><td></td><td></td><td></td><td></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text' class='checkProduct' onfocus='product_name_search_show(this)' value=''><input type='text' value=''></td><td><a class='qcti_orderDetails_delete' onclick='qcti_orderDetails_delete(this)'>删除</a></td></tr>")
}
/*删除订货明细里面的列表*/
function qcti_orderDetails_delete(str){
    var trLength=$(".qcti_orderDetails_tbody tr").length //qcti_orderDetails_tbody里面的tr的个数
    /*通过判断tr的个数，如果tr大于10，则直接删除，如果等于10，则删除以后还要再加一个*/
    $(str).parent().parent().remove()
    if(trLength<=10){
        qcti_od_add()
    }

}

/*新增供货计划，点击以后，供货计划列表增加*/
function qcti_supplyPlan_add(){
    $(".qcti_supplyPlan_tbody").append("<tr><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><a class='qcti_supplyPlan_delete' onclick='qcti_supplyPlan_delete(this)'>删除</a></td></tr>")
}
/*删除供货计划里面的列表*/
function qcti_supplyPlan_delete(str){
    var trLength=$(".qcti_supplyPlan_tbody tr").length //qcti_supplyPlan_tbody里面的tr的个数
    /*通过判断tr的个数，如果tr大于10，则直接删除，如果等于10，则删除以后还要再加一个*/
    $(str).parent().parent().remove()
    if(trLength<=10){
        qcti_supplyPlan_add()
    }

}



/*保存
* 点击保存以后，table里面的input值收集起来*/
function qcti_od_sp_preservation(){
    var flag=true //用来判断每行tr是否有空白input
    var inputValue="" //保存input值
    var trInputVal="" //用来保存每组tr的input
    var tableVal=[] //总的input val
    var orderOrCont="" //保存列表里面的东西
    $(".qcti_orderDetails_tbody tr").each(function(){
       $(this).find("input").each(function(){
           inputValue=$(this).val()
          if(inputValue==undefined || inputValue=="" || inputValue==null) {
              flag=false
          }
           if(!flag){
               return false
           }
       })
        if(flag){
            trInputVal={"material_code":""+$(this).find("input").eq(0).val()+"","material_name":""+$(this).find("input").eq(1).val()+"","specification":""+$(this).find("input").eq(2).val()+"","measurement":""+$(this).find("input").eq(3).val()+"","num":""+$(this).find("input").eq(4).val()+"","price":""+$(this).find("input").eq(5).val()+"","total_price":""+$(this).find("input").eq(6).val()+"","company":""+$(this).find("input").eq(7).val()+""}
            tableVal.push(trInputVal)
        }else{
            return false
        }
   })

    var flagsu=true //用来判断每行tr是否有空白input
    var inputValuesu="" //保存input值
    var trInputValsu="" //用来保存每组tr的input
    var tableValsu=[] //总的input val
    $(".qcti_supplyPlan_tbody tr").each(function(){
        $(this).find("input").each(function(){
            inputValuesu=$(this).val()
            if(inputValuesu==undefined || inputValuesu=="" || inputValuesu==null) {
                flagsu=false
            }
            if(!flagsu){
                return false
            }
        })
        if(flagsu){
            trInputValsu={"material_code":""+$(this).find("input").eq(0).val()+"","material_name":""+$(this).find("input").eq(1).val()+"","specification":""+$(this).find("input").eq(2).val()+"","measurement":""+$(this).find("input").eq(3).val()+"","num":""+$(this).find("input").eq(4).val()+"","supply_time":""+$(this).find("input").eq(5).val()+"","address":""+$(this).find("input").eq(6).val()+"","person":""+$(this).find("input").eq(7).val()+""}
            tableValsu.push(trInputValsu)
        }else{
            return false
        }
    })
    var company_name="" //企业名称
    company_name=$(".content_company_name").val()
    var contract_id="" //订单号/合同号
    contract_id=$(".content_contract_id").val()
    var purchasing_company="" //采购单位
    purchasing_company=$(".content_purchasing_company").val()
    orderOrCont={"company_name":""+company_name+"","contract_id":""+contract_id+"","purchasing_company":""+purchasing_company+"","purchasing":tableVal,"supply":tableValsu}
    var orderOrContracts="" //保存的JSON
    orderOrContracts=JSON.stringify(orderOrCont)
    $.ajax({
        url:"",
        type:"post",
        data:orderOrContracts,
        contentType:"application/json",
        dataType:"json",
        success:function(data){
            if(data=="true"){
                alert("保存成功")
            }
        }
    })
}

/*企业查询*/
function companyNameSearch(){
    $(".company_name_search").removeClass("displayNo").addClass("displayBlcok")
    $(".content_company_name").val("")
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var com_name=$(".com_name").val()
    var org_code=$(".org_code").val()
    var count="" //总数
    var companyList="" //保存data信息
    var tbodyList=""
    $.ajax({
        url:"../json/demo_companyList.json",
        type:"post",
        data:{com_name:com_name,org_code:org_code},
        async:"false",
        dataType:"json",
        success:function(data){
            count=data.count
            companyList=data.companyList
            tbodyList+="<ul>"
            for(var i=0;i<companyList.length;i++){
                tbodyList+="<li org_code="+companyList[i].org_code+" value="+companyList[i].com_name+">"+companyList[i].com_name+"</li>"
            }
            tbodyList+="</ul>"
            $(".name_search_list").html("")
            $(".name_search_list").append(tbodyList)

            if(count>0) {
                var asButton = ""
                var countPages = Math.ceil(count / limitValue)
                var PageNo  //当前页码
                if (startValue == 0) {
                    PageNo = 1
                }
                $(".nameSearchPage").val(PageNo)
                var nextStartRow//下一页开始显示的编号
                asButton += "<a><img src='../images/sts_4.png'></a>"
                asButton += "<p>" + PageNo + "/" + countPages + "</p>"
                if (countPages > 1) {
                    nextStartRow = PageNo * limitValue
                    asButton += "<a class=clickCursor onclick=goNameSearchPage('" + com_name + "','" + org_code + "','" + nextStartRow + "','" + limitValue + "','next')><img src='../images/sts_5.png'></a>"
                } else {
                    asButton += "<a><img src='../images/sts_5.png'></a>"
                }
                $(".name_searchAuth_button").html(" ")
                $(".name_searchAuth_button").append(asButton)
            }

            /*给name_search_list下面的li添加click方法，点击的时候，把选中的org_code赋值到input[class=org_code]中，把value添加到content_company_name中*/
            $(".name_search_list ul li").on("click",function(){
                $(".com_org_code").val($(this).attr("org_code"))
                $(".content_company_name").val("")
                $(".content_company_name").val($(this).attr("value"))
                companyNameSearchHidden()
            })
        }
    })
}


//页码跳转
function goNameSearchPage(com_name,org_code,startValue,limitValue,isGo){
    $.ajax({
        url:"../json/demo_companyList.json",
        data:{com_name:com_name,org_code:org_code,start:startValue,limit:limitValue},
        type : 'post',
        async:"false",
        dataType : 'json',
        success:function(data){
            var count="" //总数
            var companyList="" //保存data信息
            var tbodyList=""
            count=data.count
            companyList=data.companyList
            tbodyList+="<ul>"
            for(var i=0;i<companyList.length;i++){
                tbodyList+="<li org_code="+companyList[i].org_code+" value="+companyList[i].com_name+">"+companyList[i].com_name+"</li>"
            }
            tbodyList+="</ul>"
            $(".name_search_list").html("")
            $(".name_search_list").append(tbodyList)



            var asButton=""
            var pageNo=$(".nameSearchPage").val()  //当前页码
            var countPages=Math.ceil(count/limitValue)
            var noPage
            if(isGo=="next"){
                noPage=Number($(".nameSearchPage").val())+1
                if(noPage>countPages){
                    pageNo=countPages
                }else{
                    pageNo=noPage
                }
            }
            if(isGo=="pre"){
                noPage=Number($(".nameSearchPage").val())-1
                if(noPage==0){
                    noPage=1
                }
                pageNo=noPage
            }
            $(".nameSearchPage").val(pageNo)
            var preStartRow //上一页开始显示的编号
            var nextStartRow//下一页开始显示的编号
            if(pageNo>1){
                preStartRow=(pageNo-2)*limitValue
                asButton+="<a class=clickCursor onclick=goNameSearchPage('"+com_name+"','"+org_code+"','"+preStartRow+"','"+limitValue+"','pre')><img src='../images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goNameSearchPage('"+com_name+"','"+org_code+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_5.png'></a>"
            }
            $(".name_searchAuth_button").html(" ")
            $(".name_searchAuth_button").append(asButton)

            /*给name_search_list下面的li添加click方法，点击的时候，把选中的org_code赋值到input[class=org_code]中，把value添加到content_company_name中*/
            $(".name_search_list ul li").on("click",function(){
                $(".com_org_code").val($(this).attr("org_code"))
                $(".content_company_name").val("")
                $(".content_company_name").val($(this).attr("value"))
                companyNameSearchHidden()
            })
        }


    })
}


/*company_name_search关闭*/
function companyNameSearchHidden(){
     $(".company_name_search").removeClass("displayBlcok").addClass("displayNo")
}


/*通过物资编号查询物资名称，规格型号，计量单位和产品标识代码*/
function searchBymaterialCode(str){
    var material_code=str.value
    var wzxx="" //保存data信息
    var material_name="" //物资名称
    if(material_code){
        $.ajax({
            url:"../json/demo_wzcx.json",
            type:"post",
            data:{material_code:material_code},
            dataType:"json",
            success:function(data){
                wzxx=data.wzxx
                material_name=wzxx[0].material_name
                var tdChild= $(str).parent().parent().children() //触发事件所在行的子元素
                var td_material_name=""
                td_material_name="<input type='hidden' value='"+wzxx[0].material_name+"'>"+wzxx[0].material_name+""
                tdChild.eq(1).html("")
                tdChild.eq(1).append(td_material_name)
                var td_specification=""
                td_specification="<input type='hidden' value='"+wzxx[0].specification+"'>"+wzxx[0].specification+""
                tdChild.eq(2).html("")
                tdChild.eq(2).append(td_specification)
                var td_measurement=""
                td_measurement="<input type='hidden' value='"+wzxx[0].measurement+"'>"+wzxx[0].measurement+""
                tdChild.eq(3).html("")
                tdChild.eq(3).append(td_measurement)
                var td_material_code=""
                td_material_code="<input type='hidden' value='"+wzxx[0].material_code+"'>"+wzxx[0].material_code+""
                tdChild.eq(4).html("")
                tdChild.eq(4).append(td_material_code)
            },
            error:function(){
                 $(str).focus()
            }
        })
    }

}

/*product_name_search显示*/
function product_name_search_show(str){
    $(".product_name_search").removeClass("displayNo").addClass("displayBlcok")
    //var topVlue=$(str).position().top
   $(".product_name_search").css({top:27})
}

/*company_name_search关闭*/
function productNameSearchHidden() {
    $(".product_name_search").removeClass("displayBlcok").addClass("displayNo")
    $(".pro_name_search_list").html("")
}


/*企业查询*/
function productNameSearch(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var com_name=$(".com_name_pro").val()
    var org_code=$(".org_code_pro").val()
    var count="" //总数
    var companyList="" //保存data信息
    var tbodyList=""
    $.ajax({
        url:"../json/demo_companyList.json",
        type:"post",
        data:{com_name:com_name,org_code:org_code,start:startValue,limit:limitValue},
        async:"false",
        dataType:"json",
        success:function(data){
            count=data.count
            companyList=data.companyList
            tbodyList+="<ul>"
            for(var i=0;i<companyList.length;i++){
                tbodyList+="<li company_field='"+companyList[i].com_filed+"' org_code='"+companyList[i].org_code+"' value='"+companyList[i].com_name+"'>"+companyList[i].com_name+"</li>"
            }
            tbodyList+="</ul>"
            $(".pro_name_search_list").html("")
            $(".pro_name_search_list").append(tbodyList)

            if(count>0) {
                var asButton = ""
                var countPages = Math.ceil(count / limitValue)
                var PageNo  //当前页码
                if (startValue == 0) {
                    PageNo = 1
                }
                $(".nameSearchPage_pro").val(PageNo)
                var nextStartRow//下一页开始显示的编号
                asButton += "<a><img src='../images/sts_4.png'></a>"
                asButton += "<p>" + PageNo + "/" + countPages + "</p>"
                if (countPages > 1) {
                    nextStartRow = PageNo * limitValue
                    asButton += "<a class=clickCursor onclick=goproductSearchPage('" + com_name + "','" + org_code + "','" + nextStartRow + "','" + limitValue + "','next')><img src='../images/sts_5.png'></a>"
                } else {
                    asButton += "<a><img src='../images/sts_5.png'></a>"
                }
                $(".pro_name_searchAuth_button").html(" ")
                $(".pro_name_searchAuth_button").append(asButton)
            }

            /*给name_search_list下面的li添加click方法，点击的时候，把选中的org_code赋值到input[class=org_code]中，把value添加到content_company_name中*/
            $(".pro_name_search_list ul li").on("click",function(){
                //$(".clickProduct").val($(this).attr("org_code"))

                $(".clickProduct").val("")
                $(".clickProduct").val($(this).attr("value"))
                $(".clickProduct").next().val($(this).attr("company_field"))
                productNameSearchHidden()
            })
        }
    })
}