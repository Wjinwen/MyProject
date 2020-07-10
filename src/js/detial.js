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
                console.log($(".slide-node"))
                $(".slide-node").on("click",function(){
                    $(this).addClass("select-border").siblings().removeClass("select-border");
                    imgSrc=$(this).find("img").attr("src");
                    console.log(imgSrc)
                    $(".detail-bigpic").css("background-image",`url(${imgSrc})`);
                    $("#big_pic").children("img").attr("src",imgSrc);
                })
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
       

       

        // function createCarousel(parent){
        //     var div=Utils.ce("div",{
        //         position:"absolute",
        //         width:MIN_WIDTH+2+"px",
        //         height:"58px",
        //         top:MIN_WIDTH+2+"px"
        //     })
        //     var left=Utils.ce("div",{
        //         width:"22px",
        //         height:"32px",
        //         top:"13px",
        //         backgroundImage:"url(./img/sprite.png)",
        //         backgroundPositionX:"0px",
        //         backgroundPositionY:"-54px",
        //         position:"absolute",
        //     });
        //     var right=left.cloneNode(false);
        //     left.style.left="0px";//先复制以后再加
        //     Object.assign(right.style,{
        //         right:"0px",
        //         backgroundPositionX:"-78px",
        //         backgroundPositionY:"0px",
        //     })
        //     bnList.push(left);
        //     bnList.push(right);
        //     div.appendChild(left);
        //     div.appendChild(right);

        //     var con=Utils.ce("div",{
        //         position:"absolute",
        //         width:"380px",
        //         height:"58px",
        //         left:"36px",
        //         overflow:"hidden",
       
        //     })
        //     div.appendChild(con);
        //     createImageCon(con);
        //     parent.appendChild(div);
        //     div.addEventListener("click",clickHandler);
        // }

        // function createImageCon(parent){
        //     var width=iconList.length*IMAGE_WIDTH+(iconList.length-1)*IMAGE_MARGIN*2;
        //     imgCon=Utils.ce("div",{
        //         position:"absolute",
        //         width:width+"px",
        //         height:"58px",
        //         left:0,
        //         transition: "all 0.5s"
        //     });
        //     for(var i=0;i<iconList.length;i++){
        //         var img=Utils.ce("img",{
        //             width:IMAGE_WIDTH-4+"px",
        //             height:IMAGE_WIDTH-4+"px",
        //             border:`2px solid rgba(255,0,0,${i==0 ? 1 : 0})`,
        //             marginLeft:`${i===0 ? '0px' : IMAGE_MARGIN+"px"}`,
        //             marginRight: IMAGE_MARGIN+"px"
        //         });
        //         img.src=iconList[i];
        //         if(i===0) preImg=img;
        //         imgCon.appendChild(img);
        //     }
        //     imgCon.addEventListener("mouseover",iconMouseHandler);
        //     parent.appendChild(imgCon);
        // }

        // function iconMouseHandler(e){
        //     if(e.target.nodeName!=="IMG") return;
        //     if(preImg){
        //         preImg.style.border="2px solid rgba(255,0,0,0)";
        //     }
        //     preImg=e.target;
        //     preImg.style.border="2px solid rgba(255,0,0,1)"
        // //    console.log( e.target.src.replace(/_icon/,""));
        //     min.style.backgroundImage=max.style.backgroundImage=`url(${e.target.src.replace(/_icon/,"")})`;
        // }

        


        // function clickHandler(e){
        //     var index=bnList.indexOf(e.target)
        //     if(index<0) return
        //     if(index===0){
        //        imgCon.style.left="0px";
        //     }else{
        //         imgCon.style.left="-295px";
        //     }
        // }
