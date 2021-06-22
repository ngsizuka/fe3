$(function () {
    //先隱藏角色資料
    $(".character_note").css("display", "none");
});

//選擇學級
function ChooseClass(classname) {
    for (let i = 0; i < $(".character_bar > div").length; i++) {
        //隱藏所有學級
        $(".character_bar > div")[i].classList.add("character_hide");
    }
    if (classname) {
        $("." + classname).removeClass("character_hide");
        //帶滑動效果的跳轉
        $("html,body").animate({scrollTop: 0}, 1000);  
    }
}

function GoToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

//變更分隔顏色
function ChangeHrColor(className) {
    switch (className) {
        case "black_eagles":
            $(".character_hr").css("filter", "sepia() saturate(30) hue-rotate(295deg)");
            break;
        case "blue_lions":
            $(".character_hr").css("filter", "sepia() saturate(30) hue-rotate(105deg)");
            break;
        case "golden_deer":
            $(".character_hr").css("filter", "sepia() saturate(30) hue-rotate(5deg)");
            break;
        case "church":
            $(".character_hr").css("filter", "sepia() saturate(30) hue-rotate(183deg)");
            break;
        case "knight":
            $(".character_hr").css("filter", "sepia() saturate(30) hue-rotate(70deg)");
            break;
    }
}

//取得角色資料
function ChooseCharacter(name) {
    GoToTop();
    $.ajax({
        url: "./json/" + name + ".json",
        type: "GET",
        dataType: "json",
        success: function (Jdata) {
            ChooseClass(); 
            $(".character_note").css("display", "initial");
            $(".character_flag").attr("src", "./pic/class/" + Jdata.class + "_flag.png");
            $(".character_pic").attr("src", "./pic/character/" + Jdata.nick + ".png");
            $(".character_name").html(Jdata.name);
            ChangeHrColor(Jdata.class);
            //$(".character_hr")
            $(".character_introduction").html(Jdata.note);
            $(".lost").html(Jdata.lose);
            $(".gift").html(Jdata.gift);
            $(".flower").html(Jdata.flower);
            $(".tea").html(Jdata.tea);

            let teaPerfectDialog = [];
            let perfectLarge = 0;
            for (let i = 0; i < Jdata.tea_perfect.length; i++) {
                teaPerfectDialog[i] = Jdata.tea_perfect[i].split("_");
                if (teaPerfectDialog[i].length > perfectLarge) perfectLarge = teaPerfectDialog[i].length;
            }

            //製作table
            let tableStr = "<tbody>";
            for (let i = 0; i < teaPerfectDialog.length; i++) {
                tableStr += "<tr>";
                for (let j = 0; j < perfectLarge; j++) {
                    tableStr += "<td>";
                    tableStr += (teaPerfectDialog[i][j]) ? teaPerfectDialog[i][j] : "";
                    tableStr += "</td>";
                }
                tableStr += "</tr>";
            }
            tableStr += "</tbody>";
            $(".tea_perfect_body").html(tableStr);

            GetTeaDialog(Jdata.nick);
        },

        error: function (err) {
            console.log(err)
        }
    });
}

//取得茶會資料
function GetTeaDialog(name) {
    $.ajax({
        url: "./json/tea_dialog.json",
        type: "GET",
        dataType: "json",
        success: function (Jdata) {
            //取角色對應值
            let tea_dialog = []
            for (let i = 0; i < Jdata.tea_dialog.length; i++) {
                let characterArr = [];
                Jdata.tea_dialog[i].sort();
                //console.log(Jdata.tea_dialog[i]);
                for (let j = 0; j < Jdata.tea_dialog[i].length; j++) {
                    if (Jdata.tea_dialog[i][j].includes(name)) {
                        characterArr[0] = Jdata.tea_dialog[i][0];
                        characterArr.push(Jdata.tea_dialog[i][j].split("_")[0]);
                    }
                }
                if (characterArr.length > 0) tea_dialog.push(characterArr);
            }

            //pring
            let str = "<tbody>";
            for (let i = 0; i < tea_dialog.length; i++) {
                str += "<tr>";
                let rowspan = Math.ceil((tea_dialog[i].length - 1) / 3);
                let jLength = rowspan * 3 + 1;
                for (let j = 0; j < jLength; j++) {
                    if (j == 0) str += "<td class='dialog_title' rowspan=" + rowspan + ">" + tea_dialog[i][j] + "</td>";
                    else if (j < tea_dialog[i].length) str += "<td>" + tea_dialog[i][j] + "</td>";
                    else str += "<td></td>";
                    if (j > 0 && j % 3 == 0) str += "</tr>";
                }
                str += "</tr>";
                //console.log(str);
            }
            str += "</tbody>";
            $(".tea_dialog_body").html(str);
        },

        error: function (err) {
            console.log(err)
        }
    });
}
