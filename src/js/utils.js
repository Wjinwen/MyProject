export default class Utils{
    static showBox(elem,obj){
        for(var prop in obj){
            elem.style[prop]=obj[prop];
        }
    }
    static goTopHandler(){
        document.documentElement.scrollTop=0;
    }

}