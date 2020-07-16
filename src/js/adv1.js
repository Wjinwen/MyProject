$(function(){
    // console.log( $(".item_slide_three .slide_inner"))
    $(".item_slide_three .slide_inner").attr("count",0).attr("wid",420).attr("last",630);
    $(".adv1 .slide_inner").attr("count",0).attr("wid",690).attr("last",920);
    $(".adv2 .slide_inner").attr("count",0).attr("wid",690).attr("last",920);
    $(".brand_slide_content .slide_inner").attr("count",0).attr("wid",520).attr("last",920);
    $(".item_slide_three_left").on("click",btnLeftClickHandler);
    $(".item_slide_three_right").on("click",btnRightClickHandler);


    function btnRightClickHandler(){
        var $ul=$(this).siblings(".slide_wrapper").children(".slide_inner");
        var cou=($ul.attr("count")-0)-1;
        var step=$ul.attr("wid")-0;
        var minCount=Math.floor($ul.width()/step);
        if(cou<-minCount) {cou=-minCount;}
        $ul.attr("count",cou);     
        $ul.animate({
            left:cou==-minCount?($ul.attr("last")-$ul.width()):(parseInt($ul.css("left"))-($ul.attr("wid")-0),
        },500);  
        
    }
    function btnLeftClickHandler(){
        var $ul=$(this).siblings(".slide_wrapper").children(".slide_inner");
        var cou=($ul.attr("count")-0)+1;
        if(cou>0) cou=0;
        $ul.attr("count",cou); 
        $ul.animate({
            left:cou==0?0:(parseInt($ul.css("left"))+($ul.attr("wid")-0)),
        },500)
    }
})