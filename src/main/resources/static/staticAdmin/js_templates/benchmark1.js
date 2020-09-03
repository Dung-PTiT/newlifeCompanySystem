function CompareNetwork() {
    var facebook_type_select = $("#facebook_type_select option:selected").attr("value");
    var youtube_type_select = $("#youtube_type_select option:selected").attr("value");
    var delay_type_select = $("#delay_type_select option:selected").attr("value");
    var webload_type_select = $("#webload_type_select option:selected").attr("value");
    var speedtest_type_select = $("#speedtest_type_select option:selected").attr("value");
    var game_type_select = $("#game_type_select option:selected").attr("value");

    var ten_nha_mang_1_select = $("#nha_mang_1_select option:selected").text();
    var ten_nha_mang_2_select = $("#nha_mang_2_select option:selected").text();

    if (ten_nha_mang_1_select == ten_nha_mang_2_select) {
        swal("Cảnh báo", "Nhà mạng không được chọn trùng nhau", "warning");
    }
    if (ten_nha_mang_1_select != ten_nha_mang_2_select) {
        $('.ten_nha_mang_1').text(ten_nha_mang_1_select);
        $('.ten_nha_mang_2').text(ten_nha_mang_2_select);
        $('body').append('<div style="" id="loadingDiv"><div class="loader"></div></div>');
        $(document).ajaxStart(function () {
            $('#loadingDiv').show();
        }).ajaxStop(function () {
            $('#loadingDiv').remove();
        });
        showFacebookTable(facebook_type_select);
        showYoutubeTable(youtube_type_select);
        showDelayTable(delay_type_select);
        showWebloadTable(webload_type_select);
        showSpeedtestTable(speedtest_type_select);
        showGameTable(game_type_select);
    }
}

function showFacebookTable(typeSelect) {
    var ten_nha_mang_1_select = $("#nha_mang_1_select option:selected").text();
    var ten_nha_mang_2_select = $("#nha_mang_2_select option:selected").text();
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();
    $.ajax({
        url: "/get-data-benchmark-facebook-by-type-select",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "typeSelect": typeSelect
        },
        success: function (data) {
            var timeArr = [];
            var mobiAvgValueArr = [];
            var vinaphoneAvgValueArr = [];
            var viettelAvgValueArr = [];
            for (var i = 0; i < data.length; i++) {
                timeArr.push(data[i].time);
                mobiAvgValueArr.push(data[i].mobiAvgValue);
                vinaphoneAvgValueArr.push(data[i].vinaphoneAvgValue);
                viettelAvgValueArr.push(data[i].viettelAvgValue);
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, mobiAvgValueArr, vinaphoneAvgValueArr, "facebook_body_table");
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, mobiAvgValueArr, viettelAvgValueArr, "facebook_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, vinaphoneAvgValueArr, mobiAvgValueArr, "facebook_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, vinaphoneAvgValueArr, viettelAvgValueArr, "facebook_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, viettelAvgValueArr, mobiAvgValueArr, "facebook_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, viettelAvgValueArr, vinaphoneAvgValueArr, "facebook_body_table");
            }
        }
    });
}

function showYoutubeTable(typeSelect) {
    var ten_nha_mang_1_select = $("#nha_mang_1_select option:selected").text();
    var ten_nha_mang_2_select = $("#nha_mang_2_select option:selected").text();
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();
    $.ajax({
        url: "/get-data-benchmark-youtube-by-type-select",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "typeSelect": typeSelect
        },
        success: function (data) {
            var timeArr = [];
            var mobiAvgValueArr = [];
            var vinaphoneAvgValueArr = [];
            var viettelAvgValueArr = [];
            for (var i = 0; i < data.length; i++) {
                timeArr.push(data[i].time);
                mobiAvgValueArr.push(data[i].mobiAvgValue);
                vinaphoneAvgValueArr.push(data[i].vinaphoneAvgValue);
                viettelAvgValueArr.push(data[i].viettelAvgValue);
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, mobiAvgValueArr, vinaphoneAvgValueArr, "youtube_body_table");
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, mobiAvgValueArr, viettelAvgValueArr, "youtube_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, vinaphoneAvgValueArr, mobiAvgValueArr, "youtube_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, vinaphoneAvgValueArr, viettelAvgValueArr, "youtube_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, viettelAvgValueArr, mobiAvgValueArr, "youtube_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, viettelAvgValueArr, vinaphoneAvgValueArr, "youtube_body_table");
            }
        }
    });
}

function showDelayTable(typeSelect) {
    var ten_nha_mang_1_select = $("#nha_mang_1_select option:selected").text();
    var ten_nha_mang_2_select = $("#nha_mang_2_select option:selected").text();
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();
    $.ajax({
        url: "/get-data-benchmark-delay-by-type-select",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "typeSelect": typeSelect
        },
        success: function (data) {
            var timeArr = [];
            var mobiAvgValueArr = [];
            var vinaphoneAvgValueArr = [];
            var viettelAvgValueArr = [];
            for (var i = 0; i < data.length; i++) {
                timeArr.push(data[i].time);
                mobiAvgValueArr.push(data[i].mobiAvgValue);
                vinaphoneAvgValueArr.push(data[i].vinaphoneAvgValue);
                viettelAvgValueArr.push(data[i].viettelAvgValue);
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, mobiAvgValueArr, vinaphoneAvgValueArr, "delay_body_table");
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, mobiAvgValueArr, viettelAvgValueArr, "delay_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, vinaphoneAvgValueArr, mobiAvgValueArr, "delay_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, vinaphoneAvgValueArr, viettelAvgValueArr, "delay_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, viettelAvgValueArr, mobiAvgValueArr, "delay_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, viettelAvgValueArr, vinaphoneAvgValueArr, "delay_body_table");
            }
        }
    });
}

function showWebloadTable(typeSelect) {
    var ten_nha_mang_1_select = $("#nha_mang_1_select option:selected").text();
    var ten_nha_mang_2_select = $("#nha_mang_2_select option:selected").text();
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();
    $.ajax({
        url: "/get-data-benchmark-webload-by-type-select",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "typeSelect": typeSelect
        },
        success: function (data) {
            var timeArr = [];
            var mobiAvgValueArr = [];
            var vinaphoneAvgValueArr = [];
            var viettelAvgValueArr = [];
            for (var i = 0; i < data.length; i++) {
                timeArr.push(data[i].time);
                mobiAvgValueArr.push(data[i].mobiAvgValue);
                vinaphoneAvgValueArr.push(data[i].vinaphoneAvgValue);
                viettelAvgValueArr.push(data[i].viettelAvgValue);
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, mobiAvgValueArr, vinaphoneAvgValueArr, "webload_body_table");
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, mobiAvgValueArr, viettelAvgValueArr, "webload_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, vinaphoneAvgValueArr, mobiAvgValueArr, "webload_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, vinaphoneAvgValueArr, viettelAvgValueArr, "webload_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, viettelAvgValueArr, mobiAvgValueArr, "webload_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, viettelAvgValueArr, vinaphoneAvgValueArr, "webload_body_table");
            }
        }
    });
}

function showSpeedtestTable(typeSelect) {
    var ten_nha_mang_1_select = $("#nha_mang_1_select option:selected").text();
    var ten_nha_mang_2_select = $("#nha_mang_2_select option:selected").text();
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();
    $.ajax({
        url: "/get-data-benchmark-speedtest-by-type-select",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "typeSelect": typeSelect
        },
        success: function (data) {
            var timeArr = [];
            var mobiAvgValueArr = [];
            var vinaphoneAvgValueArr = [];
            var viettelAvgValueArr = [];
            for (var i = 0; i < data.length; i++) {
                timeArr.push(data[i].time);
                mobiAvgValueArr.push(data[i].mobiAvgValue);
                vinaphoneAvgValueArr.push(data[i].vinaphoneAvgValue);
                viettelAvgValueArr.push(data[i].viettelAvgValue);
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, mobiAvgValueArr, vinaphoneAvgValueArr, "speedtest_body_table");
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, mobiAvgValueArr, viettelAvgValueArr, "speedtest_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, vinaphoneAvgValueArr, mobiAvgValueArr, "speedtest_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, vinaphoneAvgValueArr, viettelAvgValueArr, "speedtest_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, viettelAvgValueArr, mobiAvgValueArr, "speedtest_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, viettelAvgValueArr, vinaphoneAvgValueArr, "speedtest_body_table");
            }
        }
    });
}

function showGameTable(typeSelect) {
    var ten_nha_mang_1_select = $("#nha_mang_1_select option:selected").text();
    var ten_nha_mang_2_select = $("#nha_mang_2_select option:selected").text();
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();
    $.ajax({
        url: "/get-data-benchmark-game-by-type-select",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "typeSelect": typeSelect
        },
        success: function (data) {
            var timeArr = [];
            var mobiAvgValueArr = [];
            var vinaphoneAvgValueArr = [];
            var viettelAvgValueArr = [];
            for (var i = 0; i < data.length; i++) {
                timeArr.push(data[i].time);
                mobiAvgValueArr.push(data[i].mobiAvgValue);
                vinaphoneAvgValueArr.push(data[i].vinaphoneAvgValue);
                viettelAvgValueArr.push(data[i].viettelAvgValue);
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, mobiAvgValueArr, vinaphoneAvgValueArr, "game_body_table");
            }
            if (ten_nha_mang_1_select == "Mobifone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, mobiAvgValueArr, viettelAvgValueArr, "game_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, vinaphoneAvgValueArr, mobiAvgValueArr, "game_body_table");
            }
            if (ten_nha_mang_1_select == "Vinaphone" && ten_nha_mang_2_select == "Viettel") {
                drawTable(timeArr, vinaphoneAvgValueArr, viettelAvgValueArr, "game_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Mobifone") {
                drawTable(timeArr, viettelAvgValueArr, mobiAvgValueArr, "game_body_table");
            }
            if (ten_nha_mang_1_select == "Viettel" && ten_nha_mang_2_select == "Vinaphone") {
                drawTable(timeArr, viettelAvgValueArr, vinaphoneAvgValueArr, "game_body_table");
            }
        }
    });
}

function drawTable(timeArr, net1AvgArr, net2AvgArr, bodyTableName) {
    var contentString = "";
    for (var i = 0; i < timeArr.length; i++) {
        var time = timeArr[i];
        var net1Value = net1AvgArr[i];
        var net2Value = net2AvgArr[i];
        contentString = contentString
            + '<tr class="noBorder">'
            + '<td>' + time + '</td>'
            + '<td>' + net1Value + '</td>';
        var raisePercent = calculatePercent(net1Value, net2Value);
        if (net1Value < net2Value) {
            contentString = contentString
                + '<td></td>'
                + '<td>' + net2Value + '</td>'
                + '<td><span class="text-success-600"><i class="icon-stats-growth2 mr-1"></i>' + raisePercent + '%</span></td>'
                + '</tr>';
        }
        if (net1Value > net2Value) {
            contentString = contentString
                + '<td><span class="text-success-600"><i class="icon-stats-growth2 mr-1"></i>' + raisePercent + '%</span></td>'
                + '<td>' + net2Value + '</td>'
                + '<td></td>'
                + '</tr>';
        }
    }
    $("#" + bodyTableName + "").html(contentString);
}

function calculatePercent(a, b) {
    if (a > b) {
        var c = a - b;
        return Math.round((c / b) * 100);
    } else {
        var c = b - a;
        return Math.round((c / a) * 100);
    }
}

function showNhaMang1() {
    var nhaMang1 = $("#nha_mang_1_select option:selected").attr("value");

    if (nhaMang1 == "vina_opt_1") {
        $('#vina_card_1').show();
        $('#mobi_card_1').hide();
        $('#vietel_card_1').hide();
    }
    if (nhaMang1 == "mobi_opt_1") {
        $('#mobi_card_1').show();
        $('#vina_card_1').hide();
        $('#vietel_card_1').hide();
    }
    if (nhaMang1 == "viettel_opt_1") {
        $('#vietel_card_1').show();
        $('#mobi_card_1').hide();
        $('#vina_card_1').hide();
    }
}

function showNhaMang2() {
    var nhaMang2 = $("#nha_mang_2_select option:selected").attr("value");
    if (nhaMang2 == "vina_opt_2") {
        $('#vina_card_2').show();
        $('#mobi_card_2').hide();
        $('#vietel_card_2').hide();
    }
    if (nhaMang2 == "mobi_opt_2") {
        $('#mobi_card_2').show();
        $('#vina_card_2').hide();
        $('#vietel_card_2').hide();
    }
    if (nhaMang2 == "viettel_opt_2") {
        $('#vietel_card_2').show();
        $('#mobi_card_2').hide();
        $('#vina_card_2').hide();
    }
}
