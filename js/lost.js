let fastSearchArr = [];

$(function () {
    GetJsonData("lost", ShowData);

    //速搜
    $(".search_box").bind("input change", function () {
        let fastSearch = "";
        //$("#searchData").slideUp();
        if ($(".search_box").val().length > 0) {
            for (let i = 0; i < fastSearchArr.length; i++) {
                let fastStr = fastSearchArr[i].toString();
                let searchStr = $(".search_box").val();
                if (fastStr.indexOf($(".search_box").val()) >= 0) {
                    //文字變色
                    let changWord = fastStr.replace(searchStr, "<span class='change_color'>" + searchStr + "</span>"); 
                    fastSearch += "<div>" + changWord + "</div>";
                }
            }
            //if (fastSearch.length > 0 ) $("#searchData").slideDown();
            $("#searchData").html(fastSearch);
        } else {
            $("#searchData").html("");
        }
    });
})

function ShowData(data) {
    //備註
    let str = "";
    str += "<div class='lost_tip'>";
    str += "<div class='tip'> ";
    for (let i = 0; i < data.tip.length; i++) {
        str += "<span>" + data.tip[i] + "</span><br />";
    }
    str += "</div>";
    let count = 0;
    for (let i in data) {
        if (count != 0) {
            let month = i;
            str += "<div>";
            str += "<div class='lost_month' onclick='ShowHideLost(this)'>";
            str += "<span>></span><span>" + month + "</span>";
            str += "</div>";
            str += "<div class='lost_data'>";
            str += "<table> ";
            str += "<thead>";
            str += "<tr>";
            str += "<td>地點</td>";
            str += "<td>失物名稱</td>";
            str += "<td>所有者</td>";
            str += "</tr>";
            str += "</thead>";
            str += "<tbody>";
            for (let j = 0; j < data[month].length; j++) {
                str += "<tr>";
                str += "<td>" + data[month][j][0] + "</td>";
                str += "<td>" + data[month][j][1] + "</td>";
                str += "<td>" + data[month][j][2] + "</td>";
                fastSearchArr.push([data[month][j][1], data[month][j][2]]);
                str += "</td>";
            }
            str += "</tbody>";
            str += "</table>";
            str += "</div>";
            str += "</div>";
        }
        count++;
    }
    str += "</div>";
    $(".center_body").append(str);
    //預設先關掉table
    DefaultHide();
}

function DefaultHide() {
    $(".lost_data").slideToggle();
}

function ShowHideLost(btn) {
    //指示圖轉90度
    $(btn).toggleClass("change_rotate");
    //table顯示/不顯示
    $(btn).parent().children('.lost_data').first().slideToggle();
}