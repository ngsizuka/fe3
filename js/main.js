$(function () {
    //$("#result").load("json/edelgard.js");
    //console.log(character);
    $.getJSON('https://ngsizuka.github.io/fe3/json/edelgard.js', function (result) {
        console.log(result)
    })
    GetJsonData();
    console.log("get")
    function GetJsonData() {
        console.log("get")
        $.getJSON("./json/edelgard.js", function (data) {
            console.log(data)
        });
    }

    test();
    console.log("test")
    function test() {
        var flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickerAPI, {
            tags: "mount rainier",
            tagmode: "any",
            format: "json"
        })
            .done(function (data) {
                $.each(data.items, function (i, item) {
                    $("<img>").attr("src", item.media.m).appendTo("#images");
                    if (i === 3) {
                        return false;
                    }
                });
            });
    }
});