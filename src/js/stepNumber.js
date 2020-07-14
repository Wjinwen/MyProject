(function(){
    var ids,cks,allCks=[];
    init();
    function init(){
        $(".decrease_num").on("mousedown",mouseHandler);
        $(".increase_num").on("mousedown",mouseHandler);
        $(".decrease_num").on("click",clickHandler);
        $(".increase_num").on("click",clickHandler);
        $(".quantity").on("input",inputHandler);
        // allCks=document.querySelectorAll(".allcheckbox");
        cks=document.querySelectorAll("[type=checkbox]");
        // allCks=Array.from(allCks);
        cks=Array.from(cks); 
        $(cks).on("click",ckeckClickHandler);
        allCks.push(cks.shift(),cks.pop());
        $(".remove-batch").on("click",delClick);
        $(".cleaner-opt").on("click",delClick);
        $(".cart-remove").on("click",delClick);
        getPsum();
        cartListNumber();
        showCartNull()
    }


    function mouseHandler(e){
        e.preventDefault();
    }
    // 节流
    function inputHandler(e){
    //    限制输入非数字
        this.value=this.value.replace(/\D/g,"");
        // 节流
        if(ids) return;
        ids=setTimeout(function(input){
            clearTimeout(ids);
            ids=0;
            setStep(input.value,input);
        },500,this);
    }
    // 计算价格函数
    function clickHandler(e){
        var input=$(this).siblings(".quantity")[0];
        $(input).attr("step",$(input).val())
        if(this.textContent==="-"){
            setStep($(input).attr("step")-1,input);
        }else{
            setStep(Number($(input).attr("step"))+1,input);
        }
    }

    //计算价格函数 计数器
    function setStep(stevalue,ele){
        stevalue=Number(stevalue);
        if(stevalue<1) stevalue=1;
        if(stevalue>999) stevalue=999;
        $(ele).attr("step",stevalue)
        ele.value=stevalue;
        getPsum();
    }

    //计算价格函数 小计
    function getPsum(){
        for(let i=0;i<$(".item-item").length;i++){
            $(".item-item").eq(i).find(".p-sum").find("span")
            .text((parseFloat($(".item-item").eq(i).find(".p-price").find("span").text())*
            ($(".item-item").eq(i).find(".p-quantity").find("input").attr("step"))).toFixed(2));
        }
        totleSum();
    }

    //计算价格函数 总价
    function totleSum(){
        var sum=0;
        for(let i=0;i<$(".item-selected").length;i++){
            sum+=(parseFloat($(".item-selected").eq(i).find(".p-sum").find("span").text()));     
        }
        if(!sum) sum=new Number(00) ;
        $(".sumPrice").find("span").text(sum.toFixed(2));
    }

    //计算价格函数 共选中几件商品
    function cartListNumber(){
        $(".switch-cart-item").find(".number").text($(".item-list").children().length);
        $(".amount-sum").find("em").text($(".item-selected").length);
    }

    // 全选框的函数 ckeckClickHandler
    function ckeckClickHandler(){
        if(allCks.some((item)=>{
            return this==item;
        })){
            cks.forEach((item)=>{
                item.checked=this.checked; 
                removeSlected(item,this.checked)
            });
            allCks.forEach((item)=>{
                item.checked=this.checked; 
            })
            
        }else{
            var bool=cks.every(function(item){
                return item.checked;
            })
            $(allCks).prop("checked",bool);
            removeSlected(bool==true?cks:this,this.checked)
        }
    
    }
    // 全选框的函数 removeSlected
    function removeSlected(elem,reBool){
        if(reBool){
            $(elem).parents(".item-item").addClass("item-selected");
        }
        else{
            $(elem).parents(".item-item").removeClass("item-selected");
        }
        totleSum();
        cartListNumber();
    }


    // 删除商品函数
    function deletItem(elem){
        console.log(elem);
        $(elem).remove();
        totleSum();
        cartListNumber();
    }
    // 删除选中商品
    function delClick(){
        // $(".remove-batch").on("click",delClick); 删除选中
        // $(".cleaner-opt").on("click",delClick); 全删
        // $(".cart-remove").on("click",delClick); 单个删
        if($(this).hasClass("remove-batch")){
            $delarr=$(this).parents(".carContent").find(".item-selected");
            deletItem($delarr);
        }
        if($(this).hasClass("cleaner-opt")){
            $delarr=$(this).parents(".carContent").find(".item-item");
            deletItem($delarr);
        }
        if($(this).hasClass("cart-remove")){
            $delarr=$(this).parents(".item-item");
            deletItem($delarr);
        }
        showCartNull();
    }

    function showCartNull(){
        if($(".item-list").children().length==0){
            $(".carContent").css("display","none").next(".cart-null").css("display","block");
        }
    }




        



})()