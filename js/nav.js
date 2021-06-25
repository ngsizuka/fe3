$(function () {
    let str = "";
    str += "<div class='nav_toggle pushed' onclick='NavBarShowHide()'>";
    str += "<div class='bar'></div>";
    str += "<div class='bar'></div>";
    str += "<div class='bar'></div>";
    str += "</div>";
    str += "<div class='menu'>";
    str += "<img class='nav_bg' src='./pic/frame2.png' />";
    str += "<ul class='nav_bar'>";
    str += "<li><a href='./main.html'>茶會送禮資料</a></li>";
    str += "<li><a href='./lost.html'>失物位置</a></li>";
    //str += "<li><a href=''>信件查詢</a></li>";
    //str += "<li><a href=''>兵種介紹</a></li>";
    //str += "<li><a href=''>魔獸掉落物</a></li>";
    str += "</ul>";
    str += "</div>";
    $(".main_nav").html(str);
    //預設先關閉
    NavBarShowHide();
})
function NavBarShowHide() {
    // 用toggle的方式達到 class="pushed" 出現或消失
    $(".nav_toggle").toggleClass("pushed");
    $(".menu").toggleClass("noneshow");
}