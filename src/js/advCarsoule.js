(function(){
    var index=0,timer=300,autoBool=true;
    init();
    function init(){
        autoPlay();
        $(".focus_nav>li").hover(function(){
            autoBool=false; 
            timer=300;
            index=$(this).index();
            $(".focus_pic").css("background-image",`url(./img/carsoule${index}.jpg)`);
            $(".focus_nav").children().eq(index).addClass("choose").siblings().removeClass("choose");
        })
       

    }


    function autoPlay(){
        if(autoBool) setInterval(showNext,16); 
    }

    
    function showNext(next){
        timer--;
        if(timer!=0) return;
        timer=300;
        var long=$(".focus_nav").children().length;
        if(index==long) index=0;
        var nextImg=next?next:((index+1)==long?0:index+1);
        $(".focus_pic").css("background-image",`url(./img/carsoule${nextImg}.jpg)`);
        $(".focus_nav").children().eq(nextImg).addClass("choose").siblings().removeClass("choose");
        index++;
    }
    
 

})()