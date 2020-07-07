(function(){
    function imgConMove(){
        if(!bool) return;
        if(direction===LEFT){
            x-=SPEED;
            if(x<=-WIDTH){
                imgCon.firstElementChild.remove();
                x=0;
                bool=false;
            }
            imgCon.style.left=x+"px";
          
        }else if(direction===RIGHT){
            x+=SPEED;
            if(x>=0){
                bool=false;
                x=0;
                imgCon.lastElementChild.remove();
            }
            imgCon.style.left=x+"px";
        }
    }

    
    var w;
    function clickCarsoule(wid){
        $(".item_slide_three_left").on("click",btnLeftClickHandler);
        $(".item_slide_three_right").on("click",btnRightClickHandler);
        
        function btnLeftClickHandler(){
            var $picList=$(this).siblings(".slide_wrapper").children(".slide_inner");
            move(-wid,$picList)
        }
        function btnRightClickHandler(){
            var $picList=$(this).siblings(".slide_wrapper").children(".slide_inner");
            move(wid,$picList)
        }

        function move(X,ul){
            var mx=ul.css("left")+X;
            if(mx<-ul.width()) mx=-ul.width();
            if(mx>0) mx=0;
            ul.css({left:mx});
        }
    }
})()
    
