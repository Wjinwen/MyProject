var Utils=(function(){
    return {
        imgMove:function(dir,speed,elem,left,wid){
            if(dir=="left"){
                left-=speed;
                if(left<=-wid){
                    left=0;
                }
                elem.style.left=left+"px";
              
            }else if(dir=="right"){
                left+=speed;
                if(left>=0){
                    bool=false;
                    left=0;
                }
                elem.style.left=left+"px";
            }
        }



    }




    
})()

