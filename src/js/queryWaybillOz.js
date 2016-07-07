/**
 * Created by zb on 2016/3/10.
 */
/*点击以后,goods_information_show_tbody里面的tr增加*/
function goods_in_add(){
    $(".goods_information_show_tbody").append("<tr><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'></td><td><input type='text'><td><a class='goods_information_delete' onclick='goods_information_delete(this)'>删除</a></td></tr>")
}

/*删除订货明细里面的列表*/
function goods_information_delete(str){
    var trLength=$(".goods_information_show_tbody tr").length //goods_information_show_tbody里面的tr的个数
    /*通过判断tr的个数，如果tr大于1，则直接删除，如果等于1，则删除以后还要再加一个*/
    $(str).parent().parent().remove()
    if(trLength<=1){
        goods_in_add()
    }

}
/*提交*/
function qwob_submit(){
   /*运单信息*/
    var logistics_id=$(".content_logistics_id").val() //运单号
    var logistics_company=$(".content_logistics_company").val() //承运公司
    var car_license=$(".content_car_license").val() //车号
    var good_num=$(".content_good_num").val() //货号

    /*发货人信息*/
    var send_duty=$(".content_send_duty").val() //收货人
    var send_phone_num=$(".content_send_phone_num").val() //手机号
    var send_addr=$(".content_send_addr").val() //发货地址
    var send_company=$(".content_send_company").val() //企业名称

    /*收货人信息*/
    var receive_duty=$(".content_receive_duty").val() //收货人
    var receive_phone_num=$(".content_receive_phone_num").val() //手机
    var receive_addr=$(".content_receive_addr").val() //收货地址
    var receive_company=$(".content_receive_company").val() //采购单位

    /*货物信息*/
    var flag=true //用来判断每行tr是否有空白input
    var inputValue="" //保存input值
    var trInputVal="" //用来保存每组tr的input
    var tableVal=[] //总的input val

    $(".goods_information_show_tbody tr").each(function(){
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
            trInputVal={"code":""+$(this).find("input").eq(0).val()+"","materials_name":""+$(this).find("input").eq(1).val()+"","specifications_model":""+$(this).find("input").eq(2).val()+"","measurement":""+$(this).find("input").eq(3).val()+"","materials_name":""+$(this).find("input").eq(4).val()+"","materials_code":""+$(this).find("input").eq(5).val()+"","remarks":""+$(this).find("input").eq(6).val()+""}
            tableVal.push(trInputVal)
        }else{
            return false
        }
    })

    /*构建json的字符串*/
    var qwbo="" //保存页面的东西
    qwbo={"logistics_id":""+logistics_id+"","logistics_company":""+logistics_company+"","car_license":""+car_license+"","good_num":""+good_num+"","send_duty":""+send_duty+"","send_phone_num":""+send_phone_num+"","send_addr":""+send_addr+"","send_company":""+send_company+"","receive_duty":""+receive_duty+"","receive_phone_num":""+receive_phone_num+"","receive_addr":""+receive_addr+"","receive_company":""+receive_company+"","goods":tableVal}

    $.ajax({
        url:"",
        type:"post",
        data:qwbo,
        contentType:"application/json",
        dataType:"json",
        success:function(data){
            if(data=="true"){
                alert("保存成功")
            }
        }
    })
}