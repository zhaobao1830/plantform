/**
 * Created by zb on 2016/3/29.
 */
$(function(){
    /*页面进来直接调用*/
    psl_formButton()

    /*给新增用户页绑定一个click事件，点击sendList之外的地方，调用close_psl_Create方法*/
    $(".psl_person_create").on("click",function(event){
        event.stopPropagation();
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.id=='psl_person_create'){
            close_psl_Create()
        }
    });

    /*给权限分配页绑定一个click事件，点击psl_juris之外的地方，调用close_psl_Create方法*/
    $(".psl_juris").on("click",function(event){
        event.stopPropagation();
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.id=='psl_juris'){
            close_psl_juris()
        }
    });
})
/*清除*/
function resetSubmit(){
    $("#psl_top_form")[0].reset()
}


/*查询方法*/
function psl_formButton(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var count="" //总数
    var accountList="" //保存data信息
    var tbodyList=""
    var bzNum
    $("#psl_top_form").ajaxSubmit({
        url:"../json/demo_personList.json",
        type:"post",
        data:{start:startValue,limit:limitValue},
        dataType:"json",
        success:function(data){
            count=data.count
            accountList=data.accountList
            for(var i=0;i<accountList.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+accountList[i].name+"</td>"
                tbodyList+="<td>"+accountList[i].person.username+"</td>"
                tbodyList+="<td>"+timeStamp2String(accountList[i].add_time.$date)+"</td>"
                tbodyList+="<td>"+accountList[i].person.tel+"</td>"
                tbodyList+="<td>"+accountList[i].person.email+"</td>"
                tbodyList+="<td>"+accountList[i].person.company+"</td>"
                tbodyList+="<td><a href='javascript:;' onclick=showJuris('"+accountList[i]._id.$oid+"')>修改</a></td>"
                tbodyList+="</tr>"
            }
            $(".psl_bottom_tbody").html("")
            $(".psl_bottom_tbody").append(tbodyList)

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
                    asButton += "<a class=clickCursor onclick=goPage('" + nextStartRow + "','" + limitValue + "','next')><img src='../images/sts_5.png'></a>"
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

//页码跳转
function goPage(startValue,limitValue,isGo){
    $("#psl_top_form").ajaxSubmit({
        url:"../json/demo_personList.json",
        data:{start:startValue,limit:limitValue},
        type : 'post',
        dataType : 'json',
        success:function(data){
            var count="" //总数
            var accountList="" //保存data信息
            var tbodyList=""
            var bzNum
            count=data.count
            accountList=data.accountList
            for(var i=0;i<accountList.length;i++){
                bzNum=Number(startValue)+i+1
                tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+accountList[i].name+"</td>"
                tbodyList+="<td>"+accountList[i].person.username+"</td>"
                tbodyList+="<td>"+timeStamp2String(accountList[i].add_time.$date)+"</td>"
                tbodyList+="<td>"+accountList[i].person.tel+"</td>"
                tbodyList+="<td>"+accountList[i].person.email+"</td>"
                tbodyList+="<td>"+accountList[i].person.company+"</td>"
                tbodyList+="<td><a href='javascript:;' onclick=showJuris('"+accountList[i]._id.$oid+"')>修改</a></td>"
                tbodyList+="</tr>"
            }
            $(".psl_bottom_tbody").html("")
            $(".psl_bottom_tbody").append(tbodyList)


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
                asButton+="<a class=clickCursor onclick=goPage('"+preStartRow+"','"+limitValue+"','pre')><img src='../images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        }
    })
}
/*打开新增页面*/
function personCreat(){
    $(".psl_person_create").removeClass("displayNo").addClass("displayBlock")
    var docuHeight = $(document).height()  //页面可视区域
    $(".psl_person_create").height(docuHeight)
}
/*关闭新增用户页面*/
function close_psl_Create(){
    $(".psl_person_create").removeClass("displayBlock").addClass("displayNo")
}
/*保存*/
function creat_psl_button(){
    var name=$(".name").val() //登录名
    var password=$(".password").val() //密码
    var confirm_pwd=$(".confirm_pwd").val() //重复密码
    var username=$(".username").val() //姓名
    var tel=$(".tel").val() //联系方式
    var email=$(".email").val() //邮箱
    var company=$(".company").val() //所属公司
    $.ajax({
        url:"",
        type:"post",
        data:{name:name,password:password,username:username,tel:tel,email:email,company:company},
        success:function(){
            formButton()
            closeCreate()
        }
    })
}

/*点击以后展示权限修改页面*/
function showJuris(str){
    $.ajax({
        url:"../json/demo_juris_person.json",
        type:"post",
        data:{_id:str},
        dataType:"json",
        success:function(data){
            $("._id").val(str)
            var assignedList="" //个人权限
            assignedList=data.assignedList
            var optionVal=""
            for(var i=0;i<assignedList.length;i++){
                optionVal+="<option value='"+assignedList[i].com_filed+"'>"+assignedList[i].com_name+"</option>"
            }
            $(".juris_person_select").html("")
            $(".juris_person_select").append(optionVal)

            var unassignedList="" //公司权限
            unassignedList=data.unassignedList
            var optionVals=""
            for(var i=0;i<unassignedList.length;i++){
                optionVals+="<option value='"+unassignedList[i].com_filed+"'>"+unassignedList[i].com_name+"</option>"
            }
            $(".juris_company_select").html("")
            $(".juris_company_select").append(optionVals)



            $(".psl_juris").removeClass("displayNo").addClass("displayBlock")
            var docuHeight = $(document).height()  //页面可视区域
            $(".psl_juris").height(docuHeight)
        },
        error:function(){
            alert("链接失败")
        }
    })

}
/*关闭权限页面*/
function close_psl_juris(){
    $(".psl_juris").removeClass("displayBlock").addClass("displayNo")
}
/*添加*/
function jurisAdd(){
    if($(".juris_company_select option:selected").val()) {
        var os = new Array();
        os = $(".juris_company_select").find("option");
        for (var i = 0; i < os.length; i++) {
            if (os[i].selected) {
                var o = new Option(os[i].text, os[i].value)
                $(".juris_person_select").append(o)
                $(".juris_company_select").find("option:selected").remove();
            }
        }
    }
}
/*移去*/
function jurisRemov(){
    if($(".juris_person_select option:selected").val()){
        var os = new Array();
        os = $(".juris_person_select").find("option");
        for(var j=0;j<os.length;j++){
            if (os[j].selected) {
                var o = new Option(os[j].text, os[j].value)
                $(".juris_company_select").append(o)
                $(".juris_person_select").find("option:selected").remove();
            }

        }

    }
}

/*保存分配的权限*/
function juris_psl_button(){
    var os = new Array();
    os = $(".juris_person_select").find("option");
    var optionVal=""
    for(var i=0;i<os.length;i++){
        if(optionVal){
            optionVal+=","
        }
        optionVal+=document.getElementById("juris_person_select").options[i].value
    }
    var _id=$("._id").val()
    $.ajax({
        url:"",
        type:"post",
        data:{fileds:optionVal,_id:_id},
        success:function(){
            close_psl_juris()
        },
        error:function(){
            alert("保存失败")
        }
    })
}