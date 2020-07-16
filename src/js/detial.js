$(function(){
        var max,min,mask,imgSrc;
        var x=0,
            y=0;
        const MASK_WIDTH=122;  
        const MASK_HEIGHT=135;
        const MIN_WIDTH=244;
        const MIN_HEIGHT=270;
        const MAX_WIDTH=244;
        const MAX_HEIGHT=244;
        init();
        function init(){
            max=document.querySelector(".detail-bigpic");
            min=document.querySelector("#big_pic");
            mask=document.querySelector(".mirro");
            // console.log(min)
            min.addEventListener("mouseenter",mouseHandler);
            $(".slide_inner").width($(".slide_inner").children("li").length*84)
            .attr("count",0).attr("wid",340).attr("last",340);
            // console.log($(".slide_inner"),$(".slide_inner").children().length);
            $(".prevbtn").on("click",btnLeftClickHandler);
            $(".nextbtn").on("click",btnRightClickHandler);
            // console.log($(".slide-node"))
            $(".slide-node").on("click",function(){
                $(this).addClass("select-border").siblings().removeClass("select-border");
                imgSrc=$(this).find("img").attr("src");
                console.log(imgSrc)
                $(".detail-bigpic").css("background-image",`url(${imgSrc})`);
                $("#big_pic").children("img").attr("src",imgSrc);
            })
        }


            function btnRightClickHandler(){
                var $ul=$(this).siblings("#detail-slide").children(".slide_inner");
                var cou=($ul.attr("count")-0)-1;
                var step=$ul.attr("wid")-0;
                var minCount=Math.floor($ul.width()/step);
                if(cou<-minCount) {cou=-minCount;}
                $ul.attr("count",cou);     
                $ul.animate({
                    left:cou==-minCount?($ul.attr("last")-$ul.width()):cou*step,
                },500);  
                
            }
            function btnLeftClickHandler(){
                var $ul=$(this).siblings("#detail-slide").children(".slide_inner");
                var cou=($ul.attr("count")-0)+1;
                if(cou>0) cou=0;
                $ul.attr("count",cou); 
                $ul.animate({
                    left:cou==0?0:(parseInt($ul.css("left"))+($ul.attr("wid")-0)),
                },500)
            }

    
    
            function mouseHandler(e){
                if(e.type==="mouseenter"){
                    mask.style.display=max.style.display="block"
                    min.addEventListener("mouseleave",mouseHandler);
                    min.addEventListener("mousemove",mouseHandler);
                }else if(e.type==="mousemove"){
                    // 获取min块的相对视口位置，矩形
                    move(e.clientX,e.clientY);
                }else if(e.type==="mouseleave"){
                    mask.style.display=max.style.display="none"
                    min.removeEventListener("mouseleave",mouseHandler);
                    min.removeEventListener("mousemove",mouseHandler);
                }
            }
    
    
            function move(mouseX,mouseY){
                var rect=min.getBoundingClientRect();
                    x=mouseX-MASK_WIDTH/2-rect.x;
                    y=mouseY-MASK_HEIGHT/2-rect.y;
                    if(x<0) x=0;
                    if(y<0) y=0;
                    if(x>MIN_WIDTH-MASK_WIDTH) x=MIN_WIDTH-MASK_WIDTH;
                    if(y>MIN_HEIGHT-MASK_HEIGHT) y=MIN_HEIGHT-MASK_HEIGHT;
                    mask.style.left=x+"px";
                    mask.style.top=y+"px";
                    max.style.backgroundPositionX=-x*(MAX_WIDTH/MASK_WIDTH)+"px";
                    max.style.backgroundPositionY=-y*(MAX_WIDTH/MASK_WIDTH)+"px";
            }
})
