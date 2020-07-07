(function(){

    // $(".country_selector_dropdown");
    $(".country_selector").on("click",function(){
        $(".country_selector_dropdown").toggleClass("slide_down");
        $(".down_arrow").toggleClass("arrow_up");
    })
    $(".country_selector_dropdown_item").on("click",function(){
        $(".country_selector").text($(this).text());
        $(".country_selector_dropdown").removeClass("slide_down");
        $(".down_arrow").removeClass("arrow_up");
    })

    
})()