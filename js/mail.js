$(function () {
    GetJsonData("mail", ShowData);

    function ShowData(data) {
        let str = "";
        str += "<h1>煩惱信問答區</h1>";
        for (let i in data) {
            str += "<div>";
            str += "<div class='part' onclick='ShowHideLost(this)'>";
            str += "<span>></span><span>" + i + "</span>";
            str += "</div>";
            str += "<div class='part_data'>";
            str += "<table>";
            str +="<thead><tr><td>開頭</td><td>煩惱信內容</td><td>最佳回答</td><td>寄信人</td></tr></thead>"
            str += "<tbody>";
            for (let j = 0; j < data[i].length; j++) {
                for (let k = 0; k < data[i][j].length; k++) {
                    if (k == 0) {
                        str += "<tr>";
                        str += "<td class='title_group' rowspan=" + (data[i][j].length - 1) + ">";
                        str += data[i][j][k];
                        str += "</td>";
                    }
                    else {
                        let tmp = data[i][j][k].split("_");
                        str += "<td class='msg'>" + tmp[0] + "</td>";
                        str += "<td class='ans'>" + tmp[1] + "</td>";
                        str += "<td class='character'>" + tmp[2] + "</td>";
                        str += "</tr>";
                    }
                }
            }
            str += "</tbody>";
            str += "</table>";
            str += "</div>";
            str += "</div>";
        }
        $(".center_body").html(str);
    }

    
})

function ShowHideLost(btn) {
    //指示圖轉90度
    $(btn).toggleClass("change_rotate");
    //table顯示/不顯示
    $(btn).parent().children('.part_data').first().slideToggle();
}