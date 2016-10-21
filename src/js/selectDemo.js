/**
 * Created by zb on 2016/8/9.
 */
/**
 * Created by zb on 2016/8/9.
 */
$(function(){
    document.onkeydown = function(e){
       var ev = document.all ? window.event : e;
          if(ev.keyCode==13) {
             alert("tt")
          }
        }


    //给seaNewInput绑定值改变事件，事件触发时，获取当前值和1秒以后的值，如果相等，就触发searchNewA（）事件
    var oldValue="", //事件触发时的值
        newValue=""; //1秒以后的值
    $('.seaNewInput').on('input propertychange', function() {
        oldValue=$(".seaNewInput").val()
        setTimeout(function(){
            newValue=$(".seaNewInput").val()
            if(oldValue==newValue){
                searchNewA()
            }
        },1000)
    });
    }
)

//点击搜索框
function searchA(){
    var search_input_value=$(".seaInput").val()
    $.ajax({
        url:ctx+'/query_word',
        data:{word:search_input_value},
        type:"post",
        dataType:"html",
        success:function(data){
            $(".selecShow").html("")
            $(".selecShow").html(data)
            selecShowA()
        }
    })
}

//获取近义词 selecShow a绑定click方法
function selecShowA(){
    $(".selecShow a").on("click",function(){
        var aValue=$(this).text()
        alert(aValue)
        $(this).attr("href","javascript:;")
        $.ajax({
            url:ctx+'/near_word',
            data:{word:aValue},
            type:"post",
            success:function(data){
                $(".synonym").html("")
                $(".synonym").html("是不是搜索："+data)
                synonymA()
            }
        })
    })
}

//（近义词）synonym里面的a添加click方法
function synonymA(){
    $(".synonym a").on("click",function(){
        var aValue=$(this).text()
        $(this).attr("href","javascript:;")
        $.ajax({
            url:ctx+'/query_word',
            data:{word:aValue},
            type:"post",
            success:function(data){
                $(".selecShow").html("")
                $(".selecShow").html(data)
            }
        })
    })
}

//新body
//点击搜索框
function searchNewA(){
    var search_input_value=$(".seaInput").val()
    $.ajax({
        url:ctx+'/query_word',
        data:{word:search_input_value},
        type:"post",
        dataType:"html",
        success:function(data){
            $(".selecNewShow").html("")
            $(".selecNewShow").html(data)
            selecShowNewA()
        }
    })
}

//获取近义词 selecShow a绑定click方法
function selecShowNewA(){
    $(".selecNewShow a").on("click",function(){
        var aValue=$(this).text()
        alert(aValue)
        $(this).attr("href","javascript:;")
        $.ajax({
            url:ctx+'/near_word',
            data:{word:aValue},
            type:"post",
            success:function(data){
                $(".synonymNew").html("")
                $(".synonymNew").html("是不是搜索："+data)
                synonymNewA()
            }
        })
    })
}

//（近义词）synonym里面的a添加click方法
function synonymNewA(){
    $(".synonymNew a").on("click",function(){
        var aValue=$(this).text()
        $(this).attr("href","javascript:;")
        $.ajax({
            url:ctx+'/query_word',
            data:{word:aValue},
            type:"post",
            success:function(data){
                $(".selecNewShow").html("")
                $(".selecNewShow").html(data)
            }
        })
    })
}
