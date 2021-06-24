function GetJsonData(filename, callback) {
    $.ajax({
        url: "./json/" + filename + ".json",
        type: "GET",
        dataType: "json",
        success: function (Jdata) {
            if (callback) callback(Jdata);
        },
        error: function (err) {
            console.log(err)
        }
    });
}