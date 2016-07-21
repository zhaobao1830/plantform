/**
 * Created by zb on 2016/1/6.
 */
//保存提交表单后返回的json数据
var demoJson=""
var demoCount=0 //保存请求胡来数据的总条数
//列表JSON
var list_json="";
jQuery(function(){
    /*设置.as_tbody 第一个tr的头部的css */
    jQuery(".as_tbody tr:first").css("border","none")
    ///*调用左边的方法*/
    //searchCatalogList()

    /*
     给itemShowList里面的a元素添加click事件
     点击的时候，遍历itemShow下的div,判断class_num值，如果有class_num值大于点击的div，就将其移除
     判断有没有childs,有的话就创建相应的div,添加class
     调用itemShowList()方法
     */
    jQuery(".itemShowList").on("click","a",function() {
        var first_word=""
        if(jQuery(this).hasClass("clas")) {
            jQuery(".itemShow a").removeClass("colorClickLi").addClass("colorNoClick")
            jQuery(".itemShow a img").attr("src", "../images/as_2.png")
            jQuery(this).removeClass("colorNoClick").addClass("colorClickLi")
            jQuery(this).find("img").attr("src", "../images/as_3.png")
            first_word=jQuery(this).attr("first_word")
            jQuery(".titleNum_"+first_word).removeClass("colorNoClick").addClass("colorClickLi")
        }

        var list_num = jQuery(this).attr("num");
        var itemShowList_data=list_json.childs[list_num].childs;
        var num=1;

        for(var i = jQuery(".itemShow .showItem").length;i > 0 ;i-- ){
            if(jQuery(".itemShow .showItem").eq(i).attr("class_num") > jQuery(this).parent().parent().attr("class_num") ){
                jQuery(".itemShow .showItem").eq(i).remove();
            }
        };
        if(itemShowList_data){
            jQuery(".itemShow").append("<div class='itemShowList"+num+" showItem'></div>");
            jQuery(".itemShowList"+num).append("<div class='mulluShow"+num+" mulluShowSh' name='mulluShowSh'></div>")
            jQuery(".itemShowList"+num).append("<div id='scrollShow"+num+"' class='scrollShow'><div id='scrollSh"+num+"' class='scrollSh'></div></div>");
            jQuery(".itemShowList" + num).attr("class_num", 1);
            itemShowList(jQuery(".mulluShow" + num), itemShowList_data);
            mousewheel_fn("itemShowList" + num,"mulluShow" + num,"scrollShow"+num,"scrollSh"+num)
        }
    });

    /*给body绑定一个click事件，点击itemShow之外的地方，调用closeItemShow方法 */
    jQuery("body").click(function(event){
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.getAttribute("name")!="mulluShowSh"&&evt.id!="itemShow"&&evt.tagName!="LI"&&evt.className!="clas"&&evt.tagName!="A"&&evt.tagName!="P"&&evt.tagName!="IMG"){
            closeItemShow()
        }
    });


})

//搜索表单提交
function search_a_button(){
    closeItemShow()
    jQuery(".as_tbody").html("")
    jQuery(".listperAuth_button").html("")
    var str=jQuery(".serAInput").val() //搜索框里的值
    jQuery(".itemShowValue").val(str)
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    jQuery.ajax({
            url:"../json/demo_queryCert.json",
            data:{str:str,start:startValue,limit:limitValue},
            type : 'post',
            dataType : 'json',
            beforeSend:function(){
                jQuery(".loading_Img").css("display", "block")
            },
            complete:function(){
                jQuery(".loading_Img").css("display", "none")
            },
            success:function(data){
                var trList=""
                demoJson=data
                var count=demoJson.count
                demoCount=count
                jQuery("#as_num").text(count)

                //分页
                var source=[]
                source.length=demoCount
                var options = {
                    dataSource:source,
                    callback: PageCallback,
                    pageNumber: 1,
                    pageSize: 10,
                    showGoInput: true,
                    showGoButton: true
                };
                jQuery(".listperAuth_button").pagination(options);
            }
        }
    )
}

//目录提交
function itemShowButton(str){
    closeItemShow()
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    jQuery(".itemShowValue").val(str) //把选中的目录的值赋值到itemShowValue
    jQuery.ajax({
            url:"../json/demo_queryCert.json",
            data:{str:str,start:startValue,limit:limitValue},
            type : 'post',
            dataType : 'json',
            beforeSend:function(){
                jQuery(".loading_Img").css("display", "block")
            },
            complete:function(){
                jQuery(".loading_Img").css("display", "none")
            },
            success:function(bzxx){
                jQuery(".as_tbody").html("")
                jQuery(".listperAuth_button").html("")
                var trList=""
                demoJson=bzxx
                var count=demoJson.count
                demoCount=count

                //分页
                var source=[]
                source.length=demoCount
                var options = {
                    dataSource:source,
                    callback: PageCallback,
                    pageNumber: 1,
                    pageSize: 10,
                    showGoInput: true,
                    showGoButton: true
                };
                jQuery(".listperAuth_button").pagination(options);
            }
        }
    )
}

//证书详情
function as_details(str){
    jQuery(".productInformation").removeClass("displayNo").addClass("displayBlock")
    jQuery("#asdt_"+str).removeClass("colorHui").addClass("colorRed")
    jQuery(".product_infor_show1 ul li").removeClass("displayBlock").addClass("displayNo")
    jQuery("#"+str).removeClass("displayNo").addClass("displayBlock")
    jQuery(".pis_content_ul li").removeClass("displayBlock").addClass("displayNo")
    jQuery("."+str).removeClass("displayNo").addClass("displayBlock")

    var bzxx=demoJson.bzxx
    //显示详情页
    var pis=""
    pis+="<ul>"
    for(var i=0;i<bzxx.length;i++){
        if(bzxx[i]._id.$oid==str){
            pis+="<li>"
            pis+="<p>企业名称：</p><div>"+bzxx[i].company_name+"</div>"
            pis+="<p>证书编号：</p><div>"+bzxx[i].cert_num+"</div>"
            pis+="<p>颁发单位：</p><div>"+bzxx[i].issue_organization+"</div>"
            pis+="<p>产品类别：</p><div>"+bzxx[i].product_kind+"</div>"
            pis+="<p>认证规则名称：</p><div>"+bzxx[i].cert_name+"</div>"
            pis+="<p>认证单元：</p><div>"+bzxx[i].cert_unit+"</div>"
            pis+="<p>认证标准和技术要求：</p><div>"+bzxx[i].cert_standards+"</div>"
            pis+="<p>注册地址：</p><div>"+bzxx[i].reg_addr+"</div>"
            pis+="<p>制造地址：</p><div>"+bzxx[i].product_addr+"</div>"
            pis+="<p>证书变更情况：</p><div>"+bzxx[i].cert_condition+"</div>"
            pis+="<p>发证日期：</p><div>"+timeStamp2String(bzxx[i].publish_date.jQuerydate)+"</div>"
            pis+="<p>有效期：</p><div>"+timeStamp2String(bzxx[i].valid_date.jQuerydate)+"</div>"
            pis+="<p>公告号：</p><div>"+bzxx[i].notification_number+"</div>"
            pis+="<p>证书状态：</p><div>"+bzxx[i].cert_status+"</div>"
            pis+="</li>"

            var pisContent=""
            var cert_detail=bzxx[i].cert_detail
            for(var j=0;j<cert_detail.length;j++){
                pisContent+="<tr>"
                pisContent+="<td>"+cert_detail[j].product_code+"</td>"
                pisContent+="<td id='xinghao'>"+cert_detail[j].specification+"</td>"
                pisContent+="<td id='zhuangtai'>"+cert_detail[j].specification_status+"</td>"
                pisContent+="</tr>"
            }
            jQuery(".show2_tbody").html("")
            jQuery(".show2_tbody").append(pisContent)
        }
    }
    pis+="</ul>"
    jQuery(".product_infor_show1").append(pis)

    var docuHeight=jQuery(document).height()  //页面可视区域
    var prShHeight=jQuery(".product_show_infor").height()
    if(prShHeight<docuHeight){
        jQuery(".productInformation").height(docuHeight)
    }

    /*给详情页绑定一个click事件，点击productInformation之外的地方，调用pis_close方法*/
    jQuery(".productInformation").on("click",function(event){
        event.stopPropagation();
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.id=='productInformation'){
            pis_close()
        }
    });
}

//关闭证书详情页
function pis_close(){
    jQuery(".productInformation").removeClass("displayBlock").addClass("displayNo")
    jQuery(".as_details").removeClass("colorRed").addClass("colorHui")
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

//查找目录列表
function searchCatalogList(){
    var first_word = "";
    jQuery.ajax({
        url:"../json/demo_UTF8.json",
        data:"",
        type:"post",
        async:false,
        dataType : 'json',
        success:function(str){
            jQuery(".itemShow").removeClass("displayNo").addClass("displayBlock")
            list_json=str;
            jQuery(".mulluShow").html("")
            for(var i = 0 ; i < str.childs.length ; i++){
                if(str.childs[i].name_title){
                    first_word = str.childs[i].name_title;
                    jQuery(".mulluShow").append("<a href='javaScript:;' class='claCapital colorNoClick titleNum_mulluShow_"+first_word+"'  num='"+i+"'>"+str.childs[i].name_title+"</a>")
                }else{
                    jQuery(".mulluShow").append("<a href='javaScript:;' class='clas colorNoClick' num='"+i+"' first_word = 'mulluShow_"+first_word+"'><p>"+str.childs[i].name+"</p><img src='../images/as_2.png'></a>")
                }
            }
            mousewheel_fn('itemShowList','mulluShow','scrollShow','scrollSh')
            //获取页面可视区域，然后确定showItem的高度
            var sihHeight=jQuery("#itemShow").height()
            jQuery(".as").height(sihHeight+91)
        },
        error:function(){
            alert("链接错误！");
        }
    });

}

function itemShowList(append_dom,data){
    var first_word = "";
    var append_dom_id=""
    var thisText //当前点击对象的text值
    if (data) {
        append_dom.html("");
        for (var i = 0; i < data.length; i++) {
            if(data[i].name_title){
                first_word = data[i].name_title;
                append_dom.append("<a href='javaScript:;' class='claCapital colorNoClick titleNum_"+append_dom_id+"_"+first_word+"'  num='"+i+"'>"+data[i].name_title+"</a>");
            }else{
                append_dom.append("<a href='javaScript:;' class='clas colorNoClick' num='"+i+"' first_word = '"+append_dom_id+"_"+first_word+"'><p>"+data[i].name+"</p><img src='../images/as_2.png'></a>")
            }
        };
        append_dom.on("click","a",function() {
            var first_word=""
            if(jQuery(this).hasClass("clas")){
                jQuery(this).parent().find("a").removeClass("colorClickLi").addClass("colorNoClick")
                jQuery(this).parent().find("a").find("img").attr("src","../images/as_2.png")
                jQuery(this).removeClass("colorNoClick").addClass("colorClickLi")
                jQuery(this).find("img").attr("src","../images/as_3.png")
                first_word=jQuery(this).attr("first_word")
                jQuery(".titleNum_"+first_word).removeClass("colorNoClick").addClass("colorClickLi")
            }

            list_n = jQuery(this).attr("num");
            var itemShowList_data=data[list_n].childs;
            class_num = parseInt(append_dom.parent().attr("class_num")) + 1 ;
            for(var i = jQuery(".itemShow .showItem").length;i > 0 ;i-- ){
                if(jQuery(".itemShow .showItem").eq(i).attr("class_num") > jQuery(this).parent().parent().attr("class_num") ){
                    jQuery(".itemShow .showItem").eq(i).remove();
                }
            };
            if(itemShowList_data){
                jQuery(".itemShow").append("<div class='itemShowList"+class_num+" showItem'></div>");
                jQuery(".itemShowList"+class_num).append("<div class='mulluShow"+class_num+" mulluShowSh' name='mulluShowSh'></div>")
                jQuery(".itemShowList"+class_num).append("<div id='scrollShow"+class_num+"' class='scrollShow'><div id='scrollSh"+class_num+"' class='scrollSh'></div></div>");
                jQuery(".itemShowList" + class_num).attr("class_num", class_num);
                itemShowList(jQuery(".mulluShow" + class_num), itemShowList_data);
                mousewheel_fn("itemShowList" + class_num,"mulluShow" + class_num,"scrollShow"+class_num,"scrollSh"+class_num)
            }else{
                if(jQuery(this).hasClass('clas')){
                    thisText=jQuery(this).find("p").html()
                    itemShowButton(thisText)
                }
            };
        });

    }
}

//关闭页面
function closeItemShow(){
    jQuery(".itemShow").removeClass("displayBlock").addClass("displayNo");
    for(var i = jQuery(".itemShow .showItem").length;i >=0 ;i-- ){
        if(jQuery(".itemShow .showItem").eq(i).attr("class_num") == 0 ){
            jQuery(".itemShow .showItem").eq(i).html("");
            jQuery(".itemShowList").append("<div class='mulluShow' name='mulluShowSh'></div><div id='scrollShow' class='scrollShow'><div id='scrollSh' class='scrollSh'></div></div>")
            jQuery(".jq_message_content").height(526)
        }
        else{
            jQuery(".itemShow .showItem").eq(i).remove();
        }
    }
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


/*请求数据*/
function initTable(pageIndex){
    var str="" //搜索框里面的值
    var startValue=pageIndex-1 //初始值
    var limitValue=10 //一次取出多少条数据
    var itemShowValue=jQuery(".itemShowValue").val() //获取选中的目录值
    jQuery.ajax({
            url:"../json/demo_queryCert.json",
            data:{str:itemShowValue,start:startValue,limit:limitValue},
            type : 'post',
            dataType : 'json',
            beforeSend:function(){
                jQuery(".loading_Img").css("display", "block")
            },
            complete:function(){
                jQuery(".loading_Img").css("display", "none")
            },
            success:function(bzxx){
                jQuery(".as_tbody").html("")
                var trList=""
                demoJson=bzxx
                var count=demoJson.count
                demoCount=count
                jQuery("#as_num").text(count)
                var bzxx=demoJson.bzxx
                var bzNum
                for(var i=0;i<bzxx.length;i++){
                    bzNum=Number(startValue*limitValue)+i+1
                    trList+="<tr>"
                    trList+="<td>"+bzNum+"</td>"
                    trList+="<td title="+bzxx[i].company_name+">"+bzxx[i].company_name+"</td>"
                    trList+="<td title="+bzxx[i].product_range+">"+bzxx[i].product_range+"</td>"
                    trList+="<td title="+bzxx[i].cert_num+">"+bzxx[i].cert_num+"</td>"
                    trList+="<td><a id=asdt_"+bzxx[i]._id.$oid+" class='as_details colorHui' onclick=as_details('"+bzxx[i]._id.$oid+"')>详情</a></td>"
                    trList+="</tr>"
                }
                jQuery(".as_tbody").append(trList)

                jQuery(".as_tbody tr").on("mouseover",function(){
                    jQuery(this).addClass("tbodyTrClickBackColor")
                })
                jQuery(".as_tbody tr").on("mouseout",function(){
                    jQuery(this).removeClass("tbodyTrClickBackColor")
                })
            }
        }
    )
}

//翻页调用
function PageCallback() {
    var dex=jQuery(".active a").text()//获取当前点击的页码
    initTable(dex);
}

