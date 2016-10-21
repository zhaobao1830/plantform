/**
 * Created by zb on 2016/3/17.
 */

$(function(){
    updateTop()
     /*随着浏览器大小的改变。调用下面的方法*/
    var i=0
    $(window).resize(function(){
        setTimeout(function(){
            updateTop()
        },500)
    })
    ///*通过判断saveUsername是否被选中来修改背景图片,默认为选中状态*/
    //$(".saveUser").css("background-image","url('../images/login_06.png')")

    $(".qLogin_version span").on("mouseover",function(){
        $(".qLogin_version_prompt").removeClass("displayNo").addClass("displayBlock")
    })

    $(".qLogin_version_prompt").on("mouseout",function(){
        $(".qLogin_version_prompt").removeClass("displayBlock").addClass("displayNo")
    })


})
/*清空用户名*/
function deleteUsername(){
     $(".username_input_value").val("")
}
/*清空密码*/
function deletePassword(){
    $(".password_input_value").val("")
}
/*表单提交*/
function loginSubmit(){
    if ($("#saveUsername").prop("checked")) {
        var str_username = $(".username_input_value").val();
        var str_password = $(".password_input_value").val();
        $.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie
        $.cookie("username", str_username, { expires: 7 });
        $.cookie("password", str_password, { expires: 7 });
    }
    else {
        $.cookie("rmbUser", "false", { expire: -1 });
        $.cookie("username", "", { expires: -1 });
        $.cookie("password", "", { expires: -1 });
    }

    $("#qLogin_content_login").submit()
}

/*获取浏览器的高度，动态调整qLogin距离头部的高度*/
function updateTop(){
    /*获取页面可视高复*/
    var viewportheightOld; //浏览器旧的可视高度
    // 支持(mozilla/netscape/opera/chrome/IE7)
    if (typeof window.innerWidth != 'undefined') {
        viewportheightOld = window.innerHeight;
    }
    // 支持（IE6）
    else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
        viewportheightOld = document.documentElement.clientHeight;
    }
    // 支持其他浏览器
    else {
        viewportheightOld = document.getElementsByTagName('body')[0].clientHeight;
    }
    var qLoginTop; //qLogin距离头部的高度
    qLoginTop=viewportheightOld-580>0?(viewportheightOld-580)/2:0
    $(".qLogin").css({marginTop:qLoginTop})
    if ($.cookie("rmbUser") == "true") {
        $("#saveUsername").attr("checked", true);
        $(".username_input_value").val($.cookie("username"));
        $(".password_input_value").val($.cookie("password"));
    }
}

/*给下次自动登录绑定一个方法
* 点击的时候，对P进行判断，如果有sulpClick,就移除，添加sulpNoClick,把input的checked改为false
* 如果有sulpNoClick,就移除，添加sulpClick,把input的checked改为true
* */
function saveUsernameClick(){
    if($("#saveUsernameLabel p").hasClass("sulpClick")){
        $("#saveUsernameLabel p").removeClass("sulpClick").addClass("sulpNoClick")
        $("#saveUsername").prop("checked",false)
    }else{
        $("#saveUsernameLabel p").removeClass("sulpNoClick").addClass("sulpClick")
        $("#saveUsername").prop("checked",true)
    }
}