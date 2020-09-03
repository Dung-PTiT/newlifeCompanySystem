function initMap() {
    map = new google.maps.Map(document.getElementById('map_1'), {
        zoom: 10,
        center: {lat: 21.027763, lng: 105.834160},
        disableDefaultUI: true,
        zoomControl: true

    });
}

function GetData() {
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();
    var groupID = $("#groupID option:selected").attr("value");

    $('body').append('<div style="" id="loadingDiv"><div class="loader"></div></div>');
    $(document).ajaxStart(function () {
        $('#loadingDiv').show();
    }).ajaxStop(function () {
        $('#loadingDiv').remove();
    });
    showInfoMarker();
    showYoutubePieChart(dateStart, dateEnd, groupID);
    showFacebookPieChart(dateStart, dateEnd, groupID);
    showSpeedtestPieChart();
    showDelayMap(dateStart, dateEnd, groupID);
    showGameLineChart(dateStart, dateEnd, groupID);
    showFacebookAverageValue(dateStart, dateEnd, groupID);
    showYoutubeAverageValue(dateStart, dateEnd, groupID);
    showSpeedtestAverageValue(dateStart, dateEnd, groupID);
    showWebloadAverageValue(dateStart, dateEnd, groupID);
}


function showInfoMarker() {
    $.ajax({
        url: "/get-data-group-result-probe-map",
        type: "POST",
        dataType: "json",
        data: {
            "groupID": $("#groupID").val()
        },
        success: function (data) {
            var locations = data;
            var map = new google.maps.Map(document.getElementById('map_1'), {
                zoom: 10,
                center: new google.maps.LatLng(locations[0][1], locations[0][2]),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var infowindow = new google.maps.InfoWindow;

            var marker, i;

            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map
                });

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent("Tên: " + locations[i][0] + "<br>Vĩ độ: " + locations[i][1] + "<br>Kinh độ: " + locations[i][2]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
    });
}

function showDelayMap(dateStart, dateEnd, groupID) {
    $.ajax({
        url: "/get-data-group-result-delay-map",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "groupID": groupID
        },
        success: function (data) {

            var chart = am4core.create("delay_map", am4maps.MapChart);

            chart.logo.disabled = true;

            var interfaceColors = new am4core.InterfaceColorSet();

            chart.geodata = am4geodata_worldLow;

            chart.projection = new am4maps.projections.Mercator();

            chart.exporting.menu = new am4core.ExportMenu();

            chart.zoomControl = new am4maps.ZoomControl();

            var originCities = [];
            var j = 0;
            for (var i = 0; i < data.length - 1; i = i + 2) {
                var city = {
                    "id": data[i][0],
                    "title": data[i][0],
                    "destinations": data[i + 1],
                    "latitude": data[i][1],
                    "longitude": data[i][2],
                    "scale": 1.5,
                    "zoomLevel": 1,
                    "zoomLongitude": 23.7166,
                    "zoomLatitude": 37.9792
                };
                originCities.push(city);
                j++;
            }

            var destinationCities = data[data.length - 1];

            var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

            // The world
            var worldPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
            worldPolygonSeries.useGeodata = true;
            worldPolygonSeries.fillOpacity = 0.6;
            worldPolygonSeries.exclude = ["AQ"];

            // Origin series (big targets, London and Vilnius)
            var originImageSeries = chart.series.push(new am4maps.MapImageSeries());

            var originImageTemplate = originImageSeries.mapImages.template;

            originImageTemplate.propertyFields.latitude = "latitude";
            originImageTemplate.propertyFields.longitude = "longitude";
            originImageTemplate.propertyFields.id = "id";

            originImageTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;
            originImageTemplate.nonScaling = true;
            originImageTemplate.tooltipText = "{title}";

            originImageTemplate.setStateOnChildren = true;
            originImageTemplate.states.create("hover");

            originImageTemplate.horizontalCenter = "middle";
            originImageTemplate.verticalCenter = "middle";

            var originHitCircle = originImageTemplate.createChild(am4core.Circle);
            originHitCircle.radius = 5;
            originHitCircle.fill = interfaceColors.getFor("background");

            var originTargetIcon = originImageTemplate.createChild(am4core.Sprite);
            originTargetIcon.fill = interfaceColors.getFor("alternativeBackground");
            originTargetIcon.strokeWidth = 0;
            originTargetIcon.scale = 1.3;
            originTargetIcon.horizontalCenter = "middle";
            originTargetIcon.verticalCenter = "middle";
            originTargetIcon.path = targetSVG;

            var originHoverState = originTargetIcon.states.create("hover");
            originHoverState.properties.fill = chart.colors.getIndex(1);

            // when hit on city, change lines
            originImageTemplate.events.on("hit", function (event) {
                showLines(event.target.dataItem);
            })

            // destination series (small targets)
            var destinationImageSeries = chart.series.push(new am4maps.MapImageSeries());
            var destinationImageTemplate = destinationImageSeries.mapImages.template;

            destinationImageTemplate.nonScaling = true;
            destinationImageTemplate.tooltipText = "{server_name}\n{avgValue}";
            destinationImageTemplate.fill = interfaceColors.getFor("alternativeBackground");
            destinationImageTemplate.setStateOnChildren = true;
            destinationImageTemplate.states.create("hover");

            destinationImageTemplate.propertyFields.latitude = "latitude";
            destinationImageTemplate.propertyFields.longitude = "longitude";
            destinationImageTemplate.propertyFields.id = "server_id";

            var destinationHitCircle = destinationImageTemplate.createChild(am4core.Circle);
            destinationHitCircle.radius = 3;
            destinationHitCircle.fillOpacity = 1;
            destinationHitCircle.fill = interfaceColors.getFor("background");

            var destinationTargetIcon = destinationImageTemplate.createChild(am4core.Sprite);
            destinationTargetIcon.scale = 0.7;
            destinationTargetIcon.path = targetSVG;
            destinationTargetIcon.horizontalCenter = "middle";
            destinationTargetIcon.verticalCenter = "middle";

            originImageSeries.data = originCities;
            destinationImageSeries.data = destinationCities;

            // Line series
            var lineSeries = chart.series.push(new am4maps.MapLineSeries());
            lineSeries.mapLines.template.line.strokeOpacity = 0.5;

            chart.events.on("ready", function () {
                for (var j = 0; j < originCities.length; j++) {
                    showLines(originImageSeries.dataItems.getIndex(j));
                }
            })

            var currentOrigin;

            function showLines(origin) {

                var dataContext = origin.dataContext;
                var destinations = dataContext.destinations;
                // clear old
                // lineSeries.mapLines.clear();
                // lineSeries.toBack();
                // worldPolygonSeries.toBack();
                lineSeries.mapLines.stroke = am4core.color("#ff0000"); // red;

                currentOrigin = origin;
                if (destinations) {
                    for (var i = 0; i < destinations.length; i++) {
                        var line = lineSeries.mapLines.create();
                        line.imagesToConnect = [origin.mapImage.id, destinations[i]];
                        line.tooltipText = origin.mapImage.id;
                    }
                }
                chart.zoomToGeoPoint({
                    latitude: dataContext.zoomLatitude,
                    longitude: dataContext.zoomLongitude
                }, dataContext.zoomLevel, true);
            }

            var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
            graticuleSeries.mapLines.template.line.strokeOpacity = 0.05;
        }
    });
}

function showYoutubePieChart(dateStart, dateEnd, groupID) {

    $.ajax({
        url: "/get-data-group-result-youtube",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "groupID": groupID
        },
        success: function (data) {
            var youtubeData = [];
            var sumValueList = [];
            for (var i = 0; i < data.length; i++) {
                var arr = data[i].countLevelValue;
                var sum = 0;
                for (var j = 0; j < arr.length; j++) {
                    sum = sum + arr[j];
                }
                sumValueList.push(sum);
            }
            for (var z = 0; z < data.length; z++) {
                var element = {
                    "valueLevel": data[z].valueLevel,
                    "sumValue": sumValueList[z]
                };
                youtubeData.push(element);
            }
            var chart = am4core.create("youtube_pie_chart", am4charts.PieChart);

            chart.logo.disabled = true;

            chart.data = youtubeData;

            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "sumValue";
            pieSeries.dataFields.category = "valueLevel";

            chart.innerRadius = am4core.percent(30);

            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.slices.template.cursorOverStyle = [
                {
                    "property": "cursor",
                    "value": "pointer"
                }
            ];

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

            // var colorSet = new am4core.ColorSet();
            // colorSet.list = ["#525cff", "#00820a", "#91ffbf", "#f4ef5f", "red", "black"].map(function (color) {
            //     return new am4core.color(color);
            // });
            // pieSeries.colors = colorSet;
        }
    });
}

function showFacebookPieChart(dateStart, dateEnd, groupID) {
    $.ajax({
        url: "/get-data-group-result-facebook",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "groupID": groupID
        },
        success: function (data) {

            var facebookData = [];
            var sumValueList = [];
            for (var i = 0; i < data.length; i++) {
                var arr = data[i].countLevelValue;
                var sum = 0;
                for (var j = 0; j < arr.length; j++) {
                    sum = sum + arr[j];
                }
                sumValueList.push(sum);
            }
            for (var z = 0; z < data.length; z++) {
                var element = {
                    "valueLevel": data[z].valueLevel,
                    "sumValue": sumValueList[z]
                };
                facebookData.push(element);
            }
            var chart = am4core.create("facebook_pie_chart", am4charts.PieChart);

            chart.logo.disabled = true;

            chart.data = facebookData;

            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "sumValue";
            pieSeries.dataFields.category = "valueLevel";

            chart.innerRadius = am4core.percent(30);

            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.slices.template.cursorOverStyle = [
                {
                    "property": "cursor",
                    "value": "pointer"
                }
            ];

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

            // var colorSet = new am4core.ColorSet();
            // colorSet.list = ["#525cff", "#00820a", "#91ffbf", "#f4ef5f", "red", "black"].map(function (color) {
            //     return new am4core.color(color);
            // });
            // pieSeries.colors = colorSet;
        }
    });
}

function showSpeedtestPieChart() {
    $.ajax({
        url: "/get-data-group-result-speedtest",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": $("#dateStart").val(),
            "dateEnd": $("#dateEnd").val(),
            "groupID": $("#groupID").val(),
            "speedtestType": $("#speedtestType").val()
        },
        success: function (data) {

            var speedtestData = [];
            var sumValueList = [];
            for (var i = 0; i < data.length; i++) {
                var arr = data[i].countLevelValue;
                var sum = 0;
                for (var j = 0; j < arr.length; j++) {
                    sum = sum + arr[j];
                }
                sumValueList.push(sum);
            }
            for (var z = 0; z < data.length; z++) {
                var element = {
                    "valueLevel": data[z].valueLevel,
                    "sumValue": sumValueList[z]
                };
                speedtestData.push(element);
            }
            var chart = am4core.create("speedtest_pie_chart", am4charts.PieChart);

            chart.logo.disabled = true;

            chart.data = speedtestData;

            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "sumValue";
            pieSeries.dataFields.category = "valueLevel";

            chart.innerRadius = am4core.percent(30);

            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.slices.template.cursorOverStyle = [
                {
                    "property": "cursor",
                    "value": "pointer"
                }
            ];

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

            // var colorSet = new am4core.ColorSet();
            // colorSet.list = ["#525cff", "#00820a", "#91ffbf", "#f4ef5f", "red", "black"].map(function (color) {
            //     return new am4core.color(color);
            // });
            // pieSeries.colors = colorSet;
        }
    });
}

function showGameLineChart(dateStart, dateEnd, groupID) {
    $.ajax({
        url: "/get-data-group-result-game",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "groupID": groupID
        },
        success: function (data) {
            var avgLienQuanValue;
            var avgPUBGValue;
            var lienQuanArr = [];
            var PUBGArr = [];
            for (var i = 0; i < data.length; i++) {
                lienQuanArr.push(data[i].uploadValue);
                PUBGArr.push(data[i].downloadValue);
            }
            avgLienQuanValue = Math.round(calculateAverageArr(lienQuanArr));
            avgPUBGValue = Math.round(calculateAverageArr(PUBGArr));
            $("#avg_lienquan_value").text(avgLienQuanValue);
            $("#avg_pubg_value").text(avgPUBGValue);

            var chart = am4core.create("line_chart_4", am4charts.XYChart);

            chart.logo.disabled = true;

            chart.data = data;

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "time";
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.ticks.template.disabled = false;
            categoryAxis.renderer.ticks.template.strokeOpacity = 1;
            categoryAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
            categoryAxis.renderer.ticks.template.strokeWidth = 2;
            categoryAxis.renderer.ticks.template.length = 10;
            categoryAxis.renderer.labels.template.adapter.add("text", function (text) {
                return text.match(/~~/) ? "" : "";
            });

            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;
            valueAxis.title.text = "ms";

            var series = chart.series.push(new am4charts.LineSeries());
            series.stroke = am4core.color("#47a4ff");
            series.strokeWidth = 1;
            series.dataFields.valueY = "uploadValue";
            series.dataFields.categoryX = "time";
            series.tooltipText = "Liên quân: {categoryX}\nValue: {valueY}";
            series.fillOpacity = 0.2;
            series.name = "Liên quân";
            series.tensionX = 0.8;

            var series2 = chart.series.push(new am4charts.LineSeries());
            series2.stroke = am4core.color("#af7817");
            series2.strokeWidth = 1;
            series2.dataFields.valueY = "downloadValue";
            series2.dataFields.categoryX = "time";
            series2.tooltipText = "PUBG: {categoryX}\nValue: {valueY}";
            series2.fillOpacity = 0.2;
            series2.name = "PUBG";
            series.tensionX = 0.8;

            chart.legend = new am4charts.Legend();
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineY.opacity = 0;
            chart.scrollbarX = new am4core.Scrollbar();
            // chart.scrollbarX = new am4charts.XYChartScrollbar();
            // chart.scrollbarX.series.push(series);

            categoryAxis.start = 0.88;
            categoryAxis.keepSelection = true;
        }
    });
}

function showFacebookAverageValue(dateStart, dateEnd, groupID) {
    $.ajax({
        url: "/get-data-group-result-facebook-average-value",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "groupID": groupID
        },
        success: function (data) {
            var avgUploadValue;
            var avgDownloadValue;
            var upArr = [];
            var downArr = [];
            for (var i = 0; i < data.length; i++) {
                upArr.push(data[i].uploadValue);
                downArr.push(data[i].downloadValue);
            }
            avgUploadValue = Math.round(calculateAverageArr(upArr));
            avgDownloadValue = Math.round(calculateAverageArr(downArr));
            $("#avg_facebook_upload").text(avgUploadValue);
            $("#avg_facebook_download").text(avgDownloadValue);
        }
    });
}

function showYoutubeAverageValue(dateStart, dateEnd, groupID) {
    $.ajax({
        url: "/get-data-group-result-youtube-average-value",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "groupID": groupID
        },
        success: function (data) {
            var avgDownloadValue;
            var minDownloadValue;
            var valueDownloadArr = [];
            var downArr = [];
            for (var i = 0; i < data.length; i++) {
                downArr.push(data[i].downloadValue);
                valueDownloadArr.push(parseFloat(data[i].downloadValue));
            }
            avgDownloadValue = Math.round(calculateAverageArr(downArr));
            minDownloadValue = Math.min.apply(Math, valueDownloadArr);

            $("#avg_youtube_download").text(Math.round(avgDownloadValue));
            $("#avg_youtube_minValue").text(Math.round(minDownloadValue));

        }
    });
}

function showSpeedtestAverageValue(dateStart, dateEnd, groupID) {
    $.ajax({
        url: "/get-data-group-result-speedtest-average-value",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "groupID": groupID
        },
        success: function (data) {
            var avgUploadValue;
            var avgDownloadValue;
            var minDelayValue;
            var maxDelayValue;
            var upArr = [];
            var downArr = [];
            var delayArr = [];
            for (var i = 0; i < data.length; i++) {
                upArr.push(data[i].uploadValue);
                downArr.push(data[i].downloadValue);
                delayArr.push(data[i].delayValue);
            }
            avgUploadValue = Math.round(calculateAverageArr(upArr));
            avgDownloadValue = Math.round(calculateAverageArr(downArr));
            $("#avg_speedtest_upload").text(avgUploadValue);
            $("#avg_speedtest_download").text(avgDownloadValue);

            minDelayValue = Math.min.apply(Math, delayArr);
            maxDelayValue = Math.max.apply(Math, delayArr);
            $("#min_delay_value").text(minDelayValue);
            $("#max_delay_value").text(maxDelayValue);

        }
    });
}

function showWebloadAverageValue(dateStart, dateEnd, groupID) {
    $.ajax({
        url: "/get-data-group-result-webload-average-value",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "groupID": groupID
        },
        success: function (data) {
            var valueArr = [];
            var minValueWebload;
            var maxValueWebload;
            for (var i = 0; i < data.length; i++) {
                valueArr.push(parseInt(data[i].downloadValue));
            }
            minValueWebload = Math.min.apply(Math, valueArr);
            maxValueWebload = Math.max.apply(Math, valueArr);

            $("#min_webload_value").text(Math.round(minValueWebload));
            $("#max_webload_value").text(Math.round(maxValueWebload));
        }
    });
}

function calculateAverageArr(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum = sum + parseFloat(array[i]);
    }
    return sum / array.length;
}
