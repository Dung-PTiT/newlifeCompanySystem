var faceUploadData, faceDownloadData, youtubeDownlodData, delayDownloadData, webloadDownloadData,
    speedtestUpData, speedtestDownData, speedtestDelayData, gameLienQuanData, gamePubgData, gameData;
$(document).ready(function () {
    $('body').append('<div style="" id="loadingDiv"><div class="loader"></div></div>');
    $(document).ajaxStart(function () {
        $('#loadingDiv').show();
    }).ajaxStop(function () {
        $('#loadingDiv').remove();
    });
    $("#dateStart").val("01-02-2020");
    $("#dateEnd").val("05-02-2020");
    showNotification();
    getData();
    var date_input = $('.dateInput');
    date_input.datepicker({
        format: 'dd-mm-yyyy',
        todayHighlight: true,
        autoclose: true
    });
});

function btnSearchClick() {
    getData();
}

function getData() {
    faceUploadData = getFacebookData("upload");
    faceDownloadData = getFacebookData("download");
    youtubeDownlodData = getYoutubeData("download");
    delayDownloadData = getDelayData("download");
    webloadDownloadData = getWebloadData("download");
    speedtestUpData = getSpeedtestData("upload");
    speedtestDownData = getSpeedtestData("download");
    speedtestDelayData = getSpeedtestData("delay");
    gameLienQuanData = getServiceData("game", "lienquan");
    gamePubgData = getServiceData("game", "pubg");
    gameData = getGameData();
    showRadarChart(faceUploadData, youtubeDownlodData, speedtestUpData, speedtestDownData, delayDownloadData, gameData);
    showPieChart(faceUploadData, faceDownloadData, youtubeDownlodData, delayDownloadData, webloadDownloadData, speedtestUpData, speedtestDownData, speedtestDelayData, gameLienQuanData, gamePubgData);
    showAvgNetTable(faceUploadData, faceDownloadData, youtubeDownlodData, delayDownloadData, webloadDownloadData, speedtestUpData, speedtestDownData, speedtestDelayData, gameLienQuanData, gamePubgData);
}

function getFacebookData(typeSelect) {
    return getServiceData("facebook", typeSelect);
}

function getYoutubeData(typeSelect) {
    return getServiceData("youtube", typeSelect);
}

function getSpeedtestData(typeSelect) {
    return getServiceData("speedtest", typeSelect);
}

function getDelayData(typeSelect) {
    return getServiceData("delay", typeSelect);
}

function getWebloadData(typeSelect) {
    return getServiceData("webload", typeSelect);
}

function getGameData() {
    var tmp = null;
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();
    $.ajax({
        async: false,
        url: "/get-data-benchmark-game",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd
        },
        success: function (data) {
            tmp = data;
        }
    });
    return tmp;
}

function getServiceData(service, typeSelect) {
    var tmp = null;
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();
    $.ajax({
        async: false,
        url: "/get-data-benchmark-" + service + "-by-type-select",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "typeSelect": typeSelect
        },
        success: function (data) {
            tmp = data;
        }
    });
    return tmp;
}

function showRadarChart(faceUploadData, youtubeDownloadData, speedtestUpData, speedtestDownData, delayDownloadData, gameData) {
    var total = faceUploadData.length;
    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(231,233,237)'
    };
    var mobiFaceUp = 0, vinaFaceUp = 0, viettelFaceUp = 0;
    for (var i = 0; i < faceUploadData.length; i++) {
        mobiFaceUp += faceUploadData[i].mobiAvgValue;
        vinaFaceUp += faceUploadData[i].vinaphoneAvgValue;
        viettelFaceUp += faceUploadData[i].viettelAvgValue;
    }
    let faceUpArr = [vinaFaceUp, mobiFaceUp, viettelFaceUp];
    let faceUpResult = checkLevel(arrangeByValue(faceUpArr));
    console.log(arrangeByValue(faceUpArr))
    console.log(faceUpResult);

    var mobiYoutubeDown = 0, vinaYoutubeDown = 0, viettelYoutubeDown = 0;
    for (var i = 0; i < youtubeDownloadData.length; i++) {
        mobiYoutubeDown += youtubeDownloadData[i].mobiAvgValue;
        vinaYoutubeDown += youtubeDownloadData[i].vinaphoneAvgValue;
        viettelYoutubeDown += youtubeDownloadData[i].viettelAvgValue;
    }
    let youtubeDownArr = [vinaYoutubeDown, mobiYoutubeDown, viettelYoutubeDown];
    let youtubeDownResult = checkLevel(arrangeByValue(youtubeDownArr));
    console.log(arrangeByValue(youtubeDownArr))
    console.log(youtubeDownResult);

    var mobiSpeedtestUp = 0, vinaSpeedtestUp = 0, viettelSpeedtestUp = 0;
    for (var i = 0; i < speedtestUpData.length; i++) {
        mobiSpeedtestUp += speedtestUpData[i].mobiAvgValue;
        vinaSpeedtestUp += speedtestUpData[i].vinaphoneAvgValue;
        viettelSpeedtestUp += speedtestUpData[i].viettelAvgValue;
    }
    let speedtestUpArr = [vinaSpeedtestUp, mobiSpeedtestUp, viettelSpeedtestUp];
    let speedtestUpResult = checkLevel(arrangeByValue(speedtestUpArr));
    console.log(arrangeByValue(speedtestUpArr))
    console.log(speedtestUpResult);

    var mobiSpeedtestDown = 0, vinaSpeedtestDown = 0, viettelSpeedtestDown = 0;
    for (var i = 0; i < speedtestDownData.length; i++) {
        mobiSpeedtestDown += speedtestDownData[i].mobiAvgValue;
        vinaSpeedtestDown += speedtestDownData[i].vinaphoneAvgValue;
        viettelSpeedtestDown += speedtestDownData[i].viettelAvgValue;
    }
    let speedtestDownArr = [vinaSpeedtestDown, mobiSpeedtestDown, viettelSpeedtestDown];
    let speedtestDownResult = checkLevel(arrangeByValue(speedtestDownArr));
    console.log(arrangeByValue(speedtestDownArr))
    console.log(speedtestDownResult);

    var mobiDelay = 0, vinaDelay = 0, viettelDelay = 0;
    for (var i = 0; i < delayDownloadData.length; i++) {
        mobiDelay += delayDownloadData[i].mobiAvgValue;
        vinaDelay += delayDownloadData[i].vinaphoneAvgValue;
        viettelDelay += delayDownloadData[i].viettelAvgValue;
    }
    let delayDownArr = [vinaDelay, mobiDelay, viettelDelay];
    let delayDownResult = checkLevel(arrangeByValue(delayDownArr));
    console.log(arrangeByValue(delayDownArr))
    console.log(delayDownResult);

    var mobiGame = 0, vinaGame = 0, viettelGame = 0;
    for (var i = 0; i < gameData.length; i++) {
        mobiGame += gameData[i].mobiAvgValue;
        vinaGame += gameData[i].vinaphoneAvgValue;
        viettelGame += gameData[i].viettelAvgValue;
    }
    let gameArr = [vinaGame, mobiGame, viettelGame];
    let gameResult = checkLevel(arrangeByValue(gameArr));
    console.log(arrangeByValue(gameArr))
    console.log(gameResult);

    var label = ["Mobifone", "Vinaphone", "Viettel"];
    var color = Chart.helpers.color;
    var config = {
        type: 'radar',
        data: {
            labels: [
                "Down Speed", "Up Speed", "Youtube Down", "Facebook Up", "Delay", "Game Delay"],
            datasets: [{
                label: label[0],
                backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
                borderColor: window.chartColors.red,
                pointBackgroundColor: window.chartColors.red,
                data: [
                    speedtestDownResult[0],
                    speedtestUpResult[0],
                    youtubeDownResult[0],
                    faceUpResult[0],
                    delayDownResult[0],
                    gameResult[0]
                ]
            }, {
                label: label[1],
                backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
                borderColor: window.chartColors.blue,
                pointBackgroundColor: window.chartColors.blue,
                data: [
                    speedtestDownResult[1],
                    speedtestUpResult[1],
                    youtubeDownResult[1],
                    faceUpResult[1],
                    delayDownResult[1],
                    gameResult[1]
                ]
            }, {
                label: label[2],
                backgroundColor: color(window.chartColors.purple).alpha(0.2).rgbString(),
                borderColor: window.chartColors.purple,
                pointBackgroundColor: window.chartColors.purple,
                data: [
                    speedtestDownResult[2],
                    speedtestUpResult[2],
                    youtubeDownResult[2],
                    faceUpResult[2],
                    delayDownResult[2],
                    gameResult[2]
                ],
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                position: 'top',
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': ' + tooltipItem.yLabel;
                    },
                }
            },
            scale: {
                ticks: {
                    beginAtZero: true,
                    callback: function(tick) {
                        return tick.toFixed(1);
                    }
                }
            }
        }
    };
    // var mobiFaceUp = 0, vinaFaceUp = 0, viettelFaceUp = 0;
    // for (var i = 0; i < faceUploadData.length; i++) {
    //     mobiFaceUp += faceUploadData[i].mobiAvgValue;
    //     vinaFaceUp += faceUploadData[i].vinaphoneAvgValue;
    //     viettelFaceUp += faceUploadData[i].viettelAvgValue;
    // }
    //
    // var mobiYoutubeDown = 0, vinaYoutubeDown = 0, viettelYoutubeDown = 0;
    // for (var i = 0; i < youtubeDownloadData.length; i++) {
    //     mobiYoutubeDown += youtubeDownloadData[i].mobiAvgValue;
    //     vinaYoutubeDown += youtubeDownloadData[i].vinaphoneAvgValue;
    //     viettelYoutubeDown += youtubeDownloadData[i].viettelAvgValue;
    // }
    //
    // var mobiSpeedtestUp = 0, vinaSpeedtestUp = 0, viettelSpeedtestUp = 0;
    // for (var i = 0; i < speedtestUpData.length; i++) {
    //     mobiSpeedtestUp += speedtestUpData[i].mobiAvgValue;
    //     vinaSpeedtestUp += speedtestUpData[i].vinaphoneAvgValue;
    //     viettelSpeedtestUp += speedtestUpData[i].viettelAvgValue;
    // }
    //
    // var mobiSpeedtestDown = 0, vinaSpeedtestDown = 0, viettelSpeedtestDown = 0;
    // for (var i = 0; i < speedtestDownData.length; i++) {
    //     mobiSpeedtestDown += speedtestDownData[i].mobiAvgValue;
    //     vinaSpeedtestDown += speedtestDownData[i].vinaphoneAvgValue;
    //     viettelSpeedtestDown += speedtestDownData[i].viettelAvgValue;
    // }
    //
    // var mobiDelay = 0, vinaDelay = 0, viettelDelay = 0;
    // for (var i = 0; i < delayDownloadData.length; i++) {
    //     mobiDelay += delayDownloadData[i].mobiAvgValue;
    //     vinaDelay += delayDownloadData[i].vinaphoneAvgValue;
    //     viettelDelay += delayDownloadData[i].viettelAvgValue;
    // }
    //
    // var mobiGame = 0, vinaGame = 0, viettelGame = 0;
    // for (var i = 0; i < gameData.length; i++) {
    //     mobiGame += gameData[i].mobiAvgValue;
    //     vinaGame += gameData[i].vinaphoneAvgValue;
    //     viettelGame += gameData[i].viettelAvgValue;
    // }
    //
    // var label = ["Mobifone", "Vinaphone", "Viettel"];
    // var color = Chart.helpers.color;
    // var config = {
    //     type: 'radar',
    //     data: {
    //         labels: [
    //             "Down Speed", "Up Speed", "Youtube Down", "Facebook Up", "Delay", "Game Delay"],
    //         datasets: [{
    //             label: label[0],
    //             backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
    //             borderColor: window.chartColors.red,
    //             pointBackgroundColor: window.chartColors.red,
    //             data: [
    //                 Math.round(mobiSpeedtestDown / total),
    //                 Math.round(mobiSpeedtestUp / total),
    //                 Math.round(mobiYoutubeDown / total),
    //                 Math.round(mobiFaceUp / total),
    //                 Math.round(mobiDelay / total),
    //                 Math.round(mobiGame / total)
    //             ]
    //         }, {
    //             label: label[1],
    //             backgroundColor: color(window.chartColors.blue).alpha(0.2).rgbString(),
    //             borderColor: window.chartColors.blue,
    //             pointBackgroundColor: window.chartColors.blue,
    //             data: [
    //                 Math.round(vinaSpeedtestDown / total),
    //                 Math.round(vinaSpeedtestUp / total),
    //                 Math.round(vinaYoutubeDown / total),
    //                 Math.round(vinaFaceUp / total),
    //                 Math.round(vinaDelay / total),
    //                 Math.round(vinaGame / total)
    //             ]
    //         }, {
    //             label: label[2],
    //             backgroundColor: color(window.chartColors.purple).alpha(0.2).rgbString(),
    //             borderColor: window.chartColors.purple,
    //             pointBackgroundColor: window.chartColors.purple,
    //             data: [
    //                 Math.round(viettelSpeedtestDown / total),
    //                 Math.round(viettelSpeedtestUp / total),
    //                 Math.round(viettelYoutubeDown / total),
    //                 Math.round(viettelFaceUp / total),
    //                 Math.round(viettelDelay / total),
    //                 Math.round(viettelGame / total)
    //             ],
    //         }]
    //     },
    //     options: {
    //         maintainAspectRatio: false,
    //         legend: {
    //             position: 'top',
    //         },
    //         tooltips: {
    //             enabled: true,
    //             callbacks: {
    //                 label: function (tooltipItem, data) {
    //                     var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
    //                     return datasetLabel + ': ' + tooltipItem.yLabel;
    //                 },
    //             }
    //         }
    //     }
    // };
    var radarChart = new Chart(document.getElementById("radarChart"), config);
}

function showPieChart(faceUploadData, faceDownloadData, youtubeDownloadData, delayDownloadData, webloadDownloadData,
                      speedtestUpData, speedtestDownData, speedtestDelayData, gameLienQuanData, gamePubgData) {
    var resultArr = [];
    resultArr.push(getTopNet(faceUploadData));
    resultArr.push(getTopNet(faceDownloadData));
    resultArr.push(getTopNet(youtubeDownlodData));
    resultArr.push(getTopNet(delayDownloadData));
    resultArr.push(getTopNet(webloadDownloadData));
    resultArr.push(getTopNet(speedtestUpData));
    resultArr.push(getTopNet(speedtestDownData));
    resultArr.push(getTopNet(speedtestDelayData));
    resultArr.push(getTopNet(gameLienQuanData));
    resultArr.push(getTopNet(gamePubgData));
    var youtubeData = [];
    var netName = ["Vinaphone", "Mobifone", "Viettel"];
    var valueList = [];
    valueList.push(countNumber(resultArr, 'vina'));
    valueList.push(countNumber(resultArr, 'mobi'));
    valueList.push(countNumber(resultArr, 'viettel'));
    for (var z = 0; z < netName.length; z++) {
        var element = {
            "netName": netName[z],
            "topTotal": valueList[z]
        };
        youtubeData.push(element);
    }
    var chart = am4core.create("pieChart", am4charts.PieChart);
    chart.logo.disabled = true;
    chart.data = youtubeData;
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "topTotal";
    pieSeries.dataFields.category = "netName";
    chart.innerRadius = am4core.percent(30);
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.colors.list = [
        new am4core.color('#0288D1'),
        new am4core.color('#ff6a5d'),
        new am4core.color('#994af9')
    ]
    pieSeries.alignLabels = false;
    pieSeries.labels.template.bent = true;
    pieSeries.labels.template.radius = 3;
    pieSeries.labels.template.padding(0, 0, 0, 0);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;
    var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
    shadow.opacity = 0;
    var hoverState = pieSeries.slices.template.states.getKey("hover");
    var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
    hoverShadow.opacity = 0.7;
    hoverShadow.blur = 5;
}

function showAvgNetTable(faceUploadData, faceDownloadData, youtubeDownloadData, delayDownloadData, webloadDownloadData,
                         speedtestUpData, speedtestDownData, speedtestDelayData, gameLienQuanData, gamePubgData) {
    var faceUploadAvgArr = getAvgNet(faceUploadData);
    var faceDownloadAvgArr = getAvgNet(faceDownloadData);
    var youtubeDownloadAvgArr = getAvgNet(youtubeDownloadData);
    var delayDownloadAvgArr = getAvgNet(delayDownloadData);
    var webloadDownloadAvgArr = getAvgNet(webloadDownloadData);
    var speedtestUpAvgArr = getAvgNet(speedtestUpData);
    var speedtestDownAvgArr = getAvgNet(speedtestDownData);
    var speedtestDelayAvgArr = getAvgNet(speedtestDelayData);
    var gameLienQuanAvgArr = getAvgNet(gameLienQuanData);
    var gamePubgAvgArr = getAvgNet(gamePubgData);

    var avgArr = [faceUploadAvgArr, faceDownloadAvgArr, youtubeDownloadAvgArr, delayDownloadAvgArr, webloadDownloadAvgArr,
        speedtestUpAvgArr, speedtestDownAvgArr, speedtestDelayAvgArr, gameLienQuanAvgArr, gamePubgAvgArr
    ];
    var serviceArr = ["Facebook Upload", "Facebook Download", "Youtube Download",
        "Delay Download", "Webload Download", "Speedtest Upload",
        "Speedtest Download", "Speedtest Delay", "Game liên quân", "Game PUBG"];

    var contentString = "";
    for (var i = 0; i < serviceArr.length; i++) {
        contentString = contentString
            + '<tr class="noBorder">'
            + '<td>' + serviceArr[i] + '</td>';
        contentString = contentString + rowAvg(avgArr[i]) + '</tr>';
    }
    $("#avg_service_body_table").html(contentString);


    showMarkTable(faceUploadAvgArr, faceDownloadAvgArr, youtubeDownloadAvgArr, delayDownloadAvgArr, webloadDownloadAvgArr,
        speedtestUpAvgArr, speedtestDownAvgArr, speedtestDelayAvgArr, gameLienQuanAvgArr, gamePubgAvgArr);

}

function showMarkTable(faceUploadAvgArr, faceDownloadAvgArr, youtubeDownloadAvgArr, delayDownloadAvgArr, webloadDownloadAvgArr,
                       speedtestUpAvgArr, speedtestDownAvgArr, speedtestDelayAvgArr, gameLienQuanAvgArr, gamePubgAvgArr) {
    let vinaPoint, mobiPoint, viettelPoint;
    let vinaTopArr = [], mobiTopArr = [], viettelTopArr = [];

    let faceUpSort = arrangeByValue(faceUploadAvgArr);
    let faceDownSort = arrangeByValue(faceDownloadAvgArr);
    let youtubeDownSort = arrangeByValue(youtubeDownloadAvgArr);
    let delayDownSort = arrangeByValue(delayDownloadAvgArr);
    let webloadDownSort = arrangeByValue(webloadDownloadAvgArr);
    let speedtestUpSort = arrangeByValue(speedtestUpAvgArr);
    let speedtestDownSort = arrangeByValue(speedtestDownAvgArr);
    let speedtestDelaySort = arrangeByValue(speedtestDelayAvgArr);
    let gameLienQuannSort = arrangeByValue(gameLienQuanAvgArr);
    let gamePubgSort = arrangeByValue(gamePubgAvgArr);

    let top1 = [faceUpSort[0], faceDownSort[0], youtubeDownSort[0], delayDownSort[0], webloadDownSort[0], speedtestUpSort[0], speedtestDownSort[0], speedtestDelaySort[0], gameLienQuannSort[0], gamePubgSort[0]];
    let top2 = [faceUpSort[1], faceDownSort[1], youtubeDownSort[1], delayDownSort[1], webloadDownSort[1], speedtestUpSort[1], speedtestDownSort[1], speedtestDelaySort[1], gameLienQuannSort[1], gamePubgSort[1]];
    let top3 = [faceUpSort[2], faceDownSort[2], youtubeDownSort[2], delayDownSort[2], webloadDownSort[2], speedtestUpSort[2], speedtestDownSort[2], speedtestDelaySort[2], gameLienQuannSort[2], gamePubgSort[2]];

    vinaTopArr.push(countNumber(top1, "vina"));
    vinaTopArr.push(countNumber(top2, "vina"));
    vinaTopArr.push(countNumber(top3, "vina"));

    mobiTopArr.push(countNumber(top1, "mobi"));
    mobiTopArr.push(countNumber(top2, "mobi"));
    mobiTopArr.push(countNumber(top3, "mobi"));

    viettelTopArr.push(countNumber(top1, "viettel"));
    viettelTopArr.push(countNumber(top2, "viettel"));
    viettelTopArr.push(countNumber(top3, "viettel"));

    vinaPoint = 3 * vinaTopArr[0] + 2.5 * vinaTopArr[1] + 2 * vinaTopArr[2];
    mobiPoint = 3 * mobiTopArr[0] + 2.5 * mobiTopArr[1] + 2 * mobiTopArr[2];
    viettelPoint = 3 * viettelTopArr[0] + 2.5 * viettelTopArr[1] + 2 * viettelTopArr[2];

    $("#vinaphone_mark").html(vinaPoint);
    $("#mobifone_mark").html(mobiPoint);
    $("#viettel_mark").html(viettelPoint);
}

function arrangeByValue(valueArr) {
    let myMap = new Map();
    myMap.set("vina", valueArr[0]);
    myMap.set("mobi", valueArr[1]);
    myMap.set("viettel", valueArr[2]);
    let mapSort1 = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));
    return Array.from(mapSort1.keys());
}

function checkLevel(array) {
    let resultArr = [];
    if (array[0] == "mobi") {
        resultArr[0] = 3;
    } else if (array[0] == "vina") {
        resultArr[1] = 3;
    } else if (array[0] == "viettel") {
        resultArr[2] = 3;
    }

    if (array[1] == "mobi") {
        resultArr[0] = 2.5;
    } else if (array[1] == "vina") {
        resultArr[1] = 2.5;
    } else if (array[1] == "viettel") {
        resultArr[2] = 2.5;
    }

    if (array[2] == "mobi") {
        resultArr[0] = 2;
    } else if (array[2] == "vina") {
        resultArr[1] = 2;
    } else if (array[2] == "viettel") {
        resultArr[2] = 2;
    }

    return resultArr;
}

function getAvgNet(data) {
    var vinaValueArr = [];
    var mobiValueArr = [];
    var viettelValueArr = [];
    data.forEach(element => {
        vinaValueArr.push(element.vinaphoneAvgValue);
        mobiValueArr.push(element.mobiAvgValue);
        viettelValueArr.push(element.viettelAvgValue);
    });
    var avgArr = [];
    avgArr.push(Math.round(vinaValueArr.reduce((previous, current) => current += previous) / vinaValueArr.length));
    avgArr.push(Math.round(mobiValueArr.reduce((previous, current) => current += previous) / mobiValueArr.length));
    avgArr.push(Math.round(viettelValueArr.reduce((previous, current) => current += previous) / viettelValueArr.length));
    return avgArr;
}

function getTopNet(data) {
    var vinaValueArr = [];
    var mobiValueArr = [];
    var viettelValueArr = [];
    data.forEach(element => {
        vinaValueArr.push(element.vinaphoneAvgValue);
        mobiValueArr.push(element.mobiAvgValue);
        viettelValueArr.push(element.viettelAvgValue);
    });
    let vinaAvg = vinaValueArr.reduce((previous, current) => current += previous) / vinaValueArr.length;
    let mobiAvg = mobiValueArr.reduce((previous, current) => current += previous) / mobiValueArr.length;
    let viettelAvg = viettelValueArr.reduce((previous, current) => current += previous) / viettelValueArr.length;

    if (vinaAvg > mobiAvg && vinaAvg > viettelAvg) {
        return "vina";
    }

    if (mobiAvg > vinaAvg && mobiAvg > viettelAvg) {
        return "mobi";
    }

    if (viettelAvg > vinaAvg && viettelAvg > mobiAvg) {
        return "viettel";
    }
}

let countNumber = (array, specificNumber) => {
    return array.filter(n => n == specificNumber).length
}

function rowAvg(data) {
    var str;
    for (var j = 0; j < data.length; j++) {
        str = str
            + '<td>' + data[j] + '</td>';
    }
    return str;
}

