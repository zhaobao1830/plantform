$(function(){
    //JS加载后，给catalog下的Li绑定事件
    catalogAdd()
    //导入事件
    $("#imports").click(function(){//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
        $(".popup").removeClass("displayNo").addClass("displayBlock")
    });
    //回车事件
    document.onkeydown = function(e){
        var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
            searchAdd()
            //cateFoucs()
        }
    }
    //鼠标左键事件,鼠标点击页面，如果点击的父类不是ul或者Li.就触发cateFoucs事件
    document.onmousedown=function (e) {
        if(e.which==1){
            var mdTagName=$(e.target).parent().prop("tagName")
            if(mdTagName=="UL"||mdTagName=="LI"){

            }else{
                //cateFoucs()
            }
        }
    }


    /*给页面绑定一个click事件，点击sendList之外的地方，调用nor_close方法*/
    $(".con").on("click",function(event){
        event.stopPropagation();
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.id=='con'){
            nor_close()
        }
    });
})
//移动
function moveLi(obj1, obj2,flag) {
    //获取selectRight里面的数据，然后传给后台
    var selectLi=""
    //请求路径,flag为true,增加，false，减少
    var wordValue=$(".wordHidden").val()
    var operator="admin" //关联的人
    var url=""
    if(flag){
        if($(".selectLeft ul li").hasClass("liClick")){
            selectLi=$(".selectLeft .liClick").html()
            url=ctx+'/put_means'
            $.ajax({
                url:url,
                type:"post",
                data:{word:wordValue,m:selectLi,operator:operator},
                success:function(){
                    $(".selectRight ul li").removeClass("liClick")
                    $(".selectRight ul").prepend($(".liClick"))
                }
            })
        }
    }else{
        if($(".selectRight ul li").hasClass("liClick")){
            selectLi=$(".selectRight .liClick").html()
            url=ctx+'/remove_means'
            $.ajax({
                url:url,
                type:"post",
                data:{word:wordValue,m:selectLi},
                success:function(data){
                    if(data==0){
                        alert("该项无法删除")
                    }else if(data==1){
                        $(".selectLeft ul li").removeClass("liClick")
                        $(".selectLeft ul").prepend($(".liClick"))
                        $(".selectRight .liClick").remove()
                        alert("删除成功")
                    }
                }
            })
        }
    }
}

//查询，点击查询，
/*
 * params:str 点击的value
 * return data
 * */
function searchCatalog(str){
    //cateFoucs()
    var msg=""  //用来保存data里面的值
    var words=""
    var near=""
    var result=""
    var sr_top_list=""
    var sr_nm_list=""
    var selectLeft_list=""
    var liValue //点击的值
    liValue=str
    $.ajax({
        url:ctx+'/query_word_detail',
        type:'post',
        data:{word:liValue},
        dataType:"json",
        success:function(data){
            //给wordHidden赋值
            $(".wordHidden").val(liValue)
            msg=data.msg
            words=msg.words
            for(var i=0;i<words.length;i++){
                sr_top_list+="<span>"+words[i]+ "</span>"
            }
            $('.sr_top').html("")
            $(".sr_top").html(sr_top_list)

            near=msg.near
            for(var i=0;i<near.length;i++){
                sr_nm_list+="<span>"+near[i]+"</span>"
            }
            $(".sr_nm_content").html("")
            $(".sr_nm_content").html(sr_nm_list)

            result=msg.result
            selectLeft_list+="<ul>"
            for(var i=0;i<result.length;i++){
                selectLeft_list+="<li>"+result[i]+"</li>"
            }
            selectLeft_list+="</ul>"
            $(".selectLeftContent_select").removeClass("displayNo").addClass("displayBlock")
            $(".selectLeftContent_show").html("")
            document.getElementById('left').scrollTop = 0;
            $(".selectLeftContent_show").html(selectLeft_list)

            nmClick()

            selectLeftClick()
            selectRightClick()
        }
    })
}
//相似字，点击sr_nm_content里面的值，改变样式，触发事件
function nmClick(){
    $(".sr_nm_content span").on("click",function(){
        if($(this).hasClass("spanClick")){
            $(this).removeClass("spanClick")
        }else{
            $(this).addClass("spanClick")
        }
        nearClick()
    })
}

//点击的相似字
//params word 点击的value，组合成string
function nearClick(){
    //点击的相似字
    var word=""
    $(".sr_nm_content span").each(function(){
        if($(this).hasClass("spanClick")){
            word+=$(this).text()
        }
    })

    var selectLeft=""
    var results=""
    var msg=""

    if(word){
        $.ajax({
            url:ctx+'/queryWord',
            type:'post',
            data:{word:word,m:""},
            dataType:"json",
            success:function(data){
                msg=data.msg
                results=msg.result
                for(var i=0;i<results.length;i++){
                    selectLeft+="<li>"+results[i]+"</li>"
                }
                $(".selectLeftContent_show").html("")
                document.getElementById('left').scrollTop = 0;
                $(".selectLeftContent_show").html(selectLeft)

                selectLeftClick()

            }
        })
    }else{
        var str=$(".wordHidden").val()
        searchCatalog(str)
    }
}

//给selectLeft li 添加click方法
function selectLeftClick(){
    $(".selectLeft li").on("click",function(){
        $(".selectLeft li").removeClass("liClick")
        $(this).addClass("liClick")
    })
}

//给selectRight li 添加click方法
function selectRightClick(){
    $(".selectRight li").on("click",function(){
        $(".selectRight li").removeClass("liClick")
        $(this).addClass("liClick")
    })
}

//添加
//
function searchAdd(){
    var inputValue=$(".searchInput").val()
    if(inputValue){
        $(".catalogList ul").prepend("<li title='"+inputValue+"'>"+inputValue+"</li>")
        var dataJson=[] //把参数拼装成json样子，
        dataJson.push({"importer":'admin',"value":""+inputValue+""})
        var dj=JSON.stringify(dataJson) //转换成json
        $.ajax({
            url:ctx+'/add_nonstandard_name',
            type:"post",
            data:dj,
            contentType:"application/json",
            success:function () {
                catalogAdd()
                $(".searchInput").val("")

            }
        })
    }
}

//给catalog下的Li绑定事件
function catalogAdd(){
    $(".catalog ul p").on('click',function(){
        $(".catalog ul li").removeClass("clickLi")
        $(".searchInput").val("")
        $(this).parent().addClass("clickLi")
        //获取点击的value，调用查询方法
        var str=$(this).text()
        searchCatalog(str)
    })
}
//导入按钮，用html5的FileReader方法
function imports(){
    var selectedFile = document.getElementById("filese").files[0];//获取读取的File对象
    var name = selectedFile.name;//读取选中文件的文件名
    var size = selectedFile.size;//读取选中文件的大小
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile);//读取文件的内容

    var liList=""
    var list=[]
    reader.onload = function(){
        list=this.result.split("\n")
        for(var i=0;i<list.length;i++){
            liList+="<li><p>"+list[i].trim()+"</p></li>"
        }
        $(".catalogList ul").prepend(liList)

        catalogAdd()

    };
}

//编辑按钮，catalogList里的p值改变
function  catEdit(str) {
    //点击编辑按钮后，先把P显示，input隐藏，span隐藏
    $(".catalogList li").removeClass("clickLi")
    $(".catalogList li p").removeClass("displayNo").addClass("displayBlock")
    $(".catalogList li input").removeClass("displayBlock").addClass("displayNo")
    $(".catalogList li span").removeClass("displayBlock").addClass("displayNo")

    $(str).parent().addClass("clickLi")
    var pValue="" //当前p里面的值
    var pT=$(str).parent().find("p")
    pValue=pT.text().trim()
    pT.removeClass("displayBlock").addClass("displayNo")
    var inputValue="" //当前input里面的值
    var inputT=$(str).parent().find("input")
    inputT.removeClass("displayNo").addClass("displayBlock")
    inputValue=pValue
    inputT.val(inputValue)
    //input失去焦点
    inputT.on("blur",function () {
        inputValue=$(this).val()
        pValue=inputValue
        if(inputValue){
            pT.text(pValue)
        }
        $(this).parent().find("span").removeClass("displayBlock").addClass("displayNo")
        inputT.removeClass("displayBlock").addClass("displayNo")
        pT.removeClass("displayNo").addClass("displayBlock")
    })
}
//catalogList鼠标划入事件
function cateMouseenter(){
    $(".catalogList ul li").mouseenter(function () {
        if($(".catalogList ul li input").hasClass("displayBlock")){
            $(this).find("span").removeClass("displayNo").addClass("displayBlock")
        }else{
            $(".catalogList ul li span").removeClass("displayBlock").addClass("displayNo")
            $(this).find("span").removeClass("displayNo").addClass("displayBlock")
        }
    })
}

//catalogList鼠标划出事件
function cateMouseleave() {
    $(".catalogList ul li").mouseleave(function () {
        if($(".catalogList ul li input").hasClass("displayBlock")) {
            $(".catalogList ul li span").removeClass("displayBlock").addClass("displayNo")
            $(".catalogList ul li input[class='displayBlock']").parent().find("span").removeClass("displayNo").addClass("displayBlock")
        }else{
            $(".catalogList ul li span").removeClass("displayBlock").addClass("displayNo")

            var inputValue=$(this).find("input").val()
            var pT=$(this).find("p")
            if(inputValue){
                pT.text(inputValue)
            }
            $(this).find("p").removeClass("displayNo").addClass("displayBlock")
            $(this).find("span").removeClass("displayBlock").addClass("displayNo")
            $(this).find("input").removeClass("displayBlock").addClass("displayNo")
        }
    })

}

//catalogList鼠标所在位置触发事件,点击的时候，如果Input是显示状态，就把input隐藏并把input的值赋值给相应的P，
//然后触发cateMouseenter（）鼠标划入事件
function cateFoucs(){
    $(".catalogList ul li span").removeClass("displayBlock").addClass("displayNo")
    var inputFocus=$(".catalogList ul li input[class='displayBlock']")
    var inputValue=inputFocus.val()
    var parentV=inputFocus.parent()
    var pT=parentV.find("p")
    if(inputValue){
        pT.text(inputValue)
    }
    parentV.find("p").removeClass("displayNo").addClass("displayBlock")
    parentV.find("span").removeClass("displayBlock").addClass("displayNo")
    inputFocus.removeClass("displayBlock").addClass("displayNo")

    cateMouseenter()
}

//添加匹配到的名称
function  sesAdd() {
    if($(".selectRightContentAdd").find("input").length==0) {
        $(".selectRightContentAdd").append("<input type='text' value=''><a href='javascript:;' type='button' class='saveses' onclick='saveSes()'>确认</a>")
    }
}

//保存添加的方法
//判断添加框里面是否有值，有就保存，没有就隐藏添加框
function  saveSes() {
    //获取wordHidden value，确定属于哪个编码
    var wordValue = $(".wordHidden").val()
    //获取selectRight里面的数据，然后传给后台
    var inputValue = $('.selectRightContentAdd input').val()
    var selectLi =""
    if(inputValue){
        selectLi ="<span>"+inputValue+"</span><br>"
        var url=""
        url=ctx+'/put_means'
        $.ajax({
            url:url,
            type:"post",
            data:{word:wordValue,m:selectLi},
            success:function(){
                $(".selectRightContentAdd input").val()
                $('.selectRightContentAdd').html("")
                $(".selectRightContentShow ul").prepend("<li>"+selectLi+"</li>")
                selectRightClick()
            }
        })
    }else{
        $(".selectRightContentAdd input").val()
        $('.selectRightContentAdd').html("")
        selectRightClick()
    }
}

//查询可能匹配的名称
function leftSelect() {
    var inputValue=$(".left_select").val()
    var result=""
    var selectLeft_list=""
    var msg=""
    $.ajax({
        url:ctx+'/query_word_detail',
        type:"post",
        data:{word:inputValue},
        dataType:"json",
        success:function (data) {
            msg=data.msg
            result=msg.result
            selectLeft_list+="<ul>"
            for(var i=0;i<result.length;i++){
                selectLeft_list+="<li>"+result[i]+"</li>"
            }
            selectLeft_list+="</ul>"
            $(".selectLeftContent_show").removeClass("displayNo").addClass("displayBlock")
            $(".selectLeftContent_show").html("")
            document.getElementById('left').scrollTop = 0;
            $(".selectLeftContent_show").html(selectLeft_list)

            selectLeftClick()
        }
    })
}

//提示框 确定按钮
function popupSure(){
    $(".popup").removeClass("displayBlock").addClass("displayNo")
    $("#files").click();
}
//提示框 取消按钮
function popupCancel(){
    $(".popup").removeClass("displayBlock").addClass("displayNo")
}


/*打开新增页面*/
function nor_show(){
    $(".con").removeClass("hide").addClass("show")
    var docuHeight = $(document).height()  //页面可视区域
    $(".con").height(docuHeight)

}

//关闭页面
function nor_close() {
    $(".con").removeClass("show").addClass("hide")

    $(".catalogList ul").html("")
    $('.sr_top').html("")
    $(".sr_nm_content").html("")
    $(".selectLeftContent_show").html("")
    $(".selectRightContentShow").html("")

    nomaSearch()
}

//从非标准页码进入
function standard_name_by_non(str){

    var nonstandard_v=str  //非标准名称
    var selectRight_list=""
    $.ajax({
        url:"../json/demo_noma.json",
        type:"post",
        data:{nonstandard_v:nonstandard_v},
        dataType:'json',
        success:function(datas){
            nor_show()
            $(".catalogList ul").html("")
            $(".catalogList ul").prepend("<li title='"+nonstandard_v+"'>"+nonstandard_v+"</li>")
            catalogAdd()



            var nonstandardList=datas.data
            selectRight_list+="<ul>"
            for(var i=0;i<nonstandardList.length;i++){
                selectRight_list+="<li>"+nonstandardList[i]+"</li>"
            }
            selectRight_list+="</ul>"
            $(".selectRightContentShow").html("")
            document.getElementById('right').scrollTop = 0;
            $(".selectRightContentShow").html(selectRight_list)


            selectRightClick()
        }
    })
}


