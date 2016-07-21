/**
 * Created by zb on 2016/2/22.
 */
    function mousewheel_fn(all_outer, text_div, scroll_alldiv, scroll_kuai){
    oWheel_count=jQuery("."+all_outer).eq(0).get(0),
            oText=jQuery("."+text_div).eq(0).get(0),
            //oDiv1=jQuery("."+scroll_alldiv).eq(0).get(0),
            oDiv1=document.getElementById(scroll_alldiv),
            oDiv=document.getElementById(scroll_kuai);
        var gun=oText;;
        oDiv.style.height=(oText.offsetHeight/oText.scrollHeight)*oDiv1.offsetHeight+"px";
        if(oDiv.style.height>="602px"){
            if(jQuery("."+all_outer).id=="showItem0"){
                jQuery("."+scroll_alldiv).css({"backgroundColor":"#fafafa"})
                jQuery("#"+scroll_kuai).css({"backgroundColor":"#fafafa"})
            }else{
                jQuery("."+scroll_alldiv).css({"backgroundColor":"#ffffff"})
                jQuery("#"+scroll_kuai).css({"backgroundColor":"#ffffff"})
            }
        }
        oWheel_count.onmousewheel=fn;
        oWheel_count.addEventListener('DOMMouseScroll',fn,false);

        console.log(window.addEventListener)

        oDiv.onmousedown=function (ev){
            var oEvent=ev||event; //存距离
            iniT=oEvent.clientY-oDiv.offsetTop;
            document.onmousemove=function (ev){
                movetext(oDiv,oText);
            }
            document.onmouseup=function (){
                document.onmousemove=null;
                document.onmouseup=null;
            }
            return false;  //取消系统选中事件
        }
        //move的时候移动
        function movetext(obj,oText,ev){
            var oEvent=ev||event;
            var t=oEvent.clientY-iniT;
            if(t<0){ //上边界
                t=0;
            }
            if(t>obj.offsetParent.offsetHeight-obj.offsetHeight){ //下边界
                t=obj.offsetParent.offsetHeight-obj.offsetHeight;
            }
            obj.style.top=t+"px";
            //滚动条同步 小的走一步 大的走一步的距离=小的走的距离*他俩路程长度相差的倍数  s2=oText.scrollHeight-滚动条的高度 s2/s1
            var s1=obj.offsetParent.offsetHeight-obj.offsetHeight;
            oText.scrollTop=t*((oText.scrollHeight-oText.offsetHeight)/s1);
        }
        function fn(ev){
            var oEvent=ev||event;
            var down=true;
            if(oEvent.wheelDelta){
                if(down=oEvent.wheelDelta<0){
                    //alert("向下");
                    wheeldown(oDiv,oText)
                }
                else{
                    //alert("向上");
                    wheelup(oDiv,oText)
                }
            }
            else{
                if(down=oEvent.detail>0){
                    //alert("向下");
                    wheeldown(oDiv,oText)
                }
                else{
                    //alert("向上");
                    wheelup(oDiv,oText)
                }

            }
            //alert(down)

        }
        function wheelup(obj,oText){
            var t=obj.offsetTop-5;
            if(t<0){ //上边界
                t=0;
            }
            if(t>obj.offsetParent.offsetHeight-obj.offsetHeight){ //下边界
                t=obj.offsetParent.offsetHeight-obj.offsetHeight;
            }
            obj.style.top=t+"px";
            var s1=obj.offsetParent.offsetHeight-obj.offsetHeight;
            oText.scrollTop=t*((oText.scrollHeight-oText.offsetHeight)/s1)
        }
        function wheeldown(obj,oText){
            var t=obj.offsetTop+5;
            if(t<0){ //上边界
                t=0;
            }
            if(t>obj.offsetParent.offsetHeight-obj.offsetHeight){ //下边界
                t=obj.offsetParent.offsetHeight-obj.offsetHeight;
            }
            obj.style.top=t+"px";
            var s1=obj.offsetParent.offsetHeight-obj.offsetHeight;
            oText.scrollTop=t*((oText.scrollHeight-oText.offsetHeight)/s1)
        }
    //mousewheel_fn("wheel_count","text","div1","div2");
    //mousewheel_fn("wheel_count2","text2","div12","div22");
}