(function(){
    var ids;
    init();
    function init(){
        $(".decrease_num").on("mousedown",mouseHandler);
        $(".increase_num").on("mousedown",mouseHandler);
        $(".decrease_num").on("click",clickHandler);
        $(".increase_num").on("click",clickHandler);
        $(".quantity").on("input",inputHandler);
        getPsum();
        cartListNumber();
    }


    function mouseHandler(e){
        e.preventDefault();
    }

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

    function clickHandler(e){
        var input=$(this).siblings(".quantity")[0];
        $(input).attr("step",$(input).val())
        if(this.textContent==="-"){
            setStep($(input).attr("step")-1,input);
        }else{
            setStep(Number($(input).attr("step"))+1,input);
        }
    }

    function setStep(stevalue,ele){
        stevalue=Number(stevalue);
        if(stevalue<1) stevalue=1;
        if(stevalue>999) stevalue=999;
        $(ele).attr("step",stevalue)
        ele.value=stevalue;
        getPsum();
    }


    function getPsum(){
        for(let i=0;i<$(".item-item").length;i++){
            $(".item-item").eq(i).find(".p-sum").find("span")
            .text((parseFloat($(".item-item").eq(i).find(".p-price").find("span").text())*
            ($(".item-item").eq(i).find(".p-quantity").find("input").attr("step"))).toFixed(2));
        }
        totleSum();
    }
    function totleSum(){
        var sum=0;
        for(let i=0;i<$(".item-selected").length;i++){
            sum+=(parseFloat($(".item-selected").eq(i).find(".p-sum").find("span").text()));     
        }
        if(!sum) sum="00" ;
        $(".sumPrice").find("span").text(sum.toFixed(2));
    }
    function cartListNumber(){
        $(".switch-cart-item").find(".number").text($(".item-list").children().length);
        $(".amount-sum").find("em").text($(".item-selected").length);
    }


})()