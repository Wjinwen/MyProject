(function () {
  var goTop,
    scrollH,
    navBtn,
    navList,
    country,
    countryList,
    countryBool = false;
    bool=true;
    timer=0;
  init();
  function init() {
    goTop = document.querySelector("#go-top");
    navBtn = document.querySelector(".category_expand_btn");
    countryList = document.querySelector(".topbar_region_dropdown");
    navList = document.querySelector(".category_expand_list");
    country = document.querySelector(".topbar_link_country");
    scrollHandler();
    navBtn.addEventListener("mouseenter", mouseHandler);
    navBtn.addEventListener("mouseleave", mouseHandler);
    document.addEventListener("scroll", scrollHandler);
    goTop.addEventListener("click", goTopHandler);
    country.addEventListener("click", countryHandler);
    $(countryList).children().on("click", chooseCountry);
  }
  function mouseHandler(e) {
    if (e.type == "mouseenter") showBox(navList, { display: "block" });
    if (e.type == "mouseleave") showBox(navList, { display: "none" });
  }
  function scrollHandler() {
    scrollH = document.documentElement.scrollTop;
    if (scrollH > 500) {
      showBox(goTop, { display: "inline-block" });
    } else {
      showBox(goTop, { display: "none" });
    }
  }

  function goTopHandler(e) {
    if(!bool) return;
    bool=false;
    timer=setInterval(goTopmove,16);
  }
  function goTopmove(){
    document.documentElement.scrollTop-=25;
    if(document.documentElement.scrollTop<=0){
      document.documentElement.scrollTop=0;
      bool=true;
      clearInterval(timer);
    }
  }
  function countryHandler() {
    $(".topbar_link_country_arrow").toggleClass("arrow_up");
    countryBool = !countryBool;
    if (countryBool) {
      showBox(countryList, { display: "block" });
    } else showBox(countryList, { display: "none" });
  }
  function showBox(elem, obj) {
    for (var prop in obj) {
      elem.style[prop] = obj[prop];
    }
  }
  function chooseCountry() {
    var txt = this.textContent;
    $(country).children("span").eq(1).text(txt);
    countryHandler();
  }
})();
