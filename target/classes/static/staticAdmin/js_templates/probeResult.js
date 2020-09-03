function GetData() {
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();
    var probeID = $("#probeID option:selected").attr("value");
    $('body').append('<div style="" id="loadingDiv"><div class="loader"></div></div>');
    $(document).ajaxStart(function () {
        $('#loadingDiv').show();
    }).ajaxStop(function () {
        $('#loadingDiv').remove();
    });
    showLineChart1(dateStart, dateEnd, probeID);
    showBarChart1(dateStart, dateEnd, probeID);
    showMap1(dateStart, dateEnd, probeID);
    showLineChart2(dateStart, dateEnd, probeID);
    showLineChart3(dateStart, dateEnd, probeID);
    showLineChart4(dateStart, dateEnd, probeID);

}

function getGroupProbeID() {
    var groupID = $("#groupID option:selected").attr("value");
    $.ajax({
        url: "/get-probeInfo-by-groupProbeID",
        type: "POST",
        dataType: "json",
        data: {
            "groupID": groupID
        },
        success: function (data) {
            var contentString;
            for (var i = 0; i < data.length; i++) {
                contentString += "<option value='"
                    + data[i][0] + "'>"
                    + data[i][1] +
                    "</option>";
            }
            $("#probeID").html(contentString);
        }
    });
}

function showMap1(dateStart, dateEnd, probeID) {
    $.ajax({
        url: "/get-data-map",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "probeID": probeID
        }, success: function (data) {

            var chart = am4core.create("map_1", am4maps.MapChart);

            chart.logo.disabled = true;

            var interfaceColors = new am4core.InterfaceColorSet();

            chart.geodata = am4geodata_worldLow;

            chart.projection = new am4maps.projections.Mercator();

            chart.exporting.menu = new am4core.ExportMenu();

            chart.zoomControl = new am4maps.ZoomControl();

            var originCities = [
                {
                    "id": "1",
                    "title": data[0][0],
                    "destinations": data[2],
                    "latitude": data[0][1],
                    "longitude": data[0][2],
                    "scale": 1.5,
                    "zoomLevel": 1,
                    "zoomLongitude": 23.7166,
                    "zoomLatitude": 37.9792
                }
            ];

            var destinationCities = data[1];

            var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

            var labelsContainer = chart.createChild(am4core.Container);
            labelsContainer.isMeasured = false;
            labelsContainer.x = 80;
            labelsContainer.y = 27;
            labelsContainer.layout = "horizontal";
            labelsContainer.zIndex = 10;


            var title = labelsContainer.createChild(am4core.Label);
            title.fill = am4core.color("#cc0000");
            title.fontSize = 20;
            title.valign = "middle";
            title.dy = 2;
            title.marginLeft = 15;

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
            originHitCircle.radius = 11;
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
            destinationHitCircle.radius = 7;
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
                showLines(originImageSeries.dataItems.getIndex(0));
            })

            var currentOrigin;

            function showLines(origin) {

                var dataContext = origin.dataContext;
                var destinations = dataContext.destinations;
                // clear old
                lineSeries.mapLines.clear();
                lineSeries.toBack();
                worldPolygonSeries.toBack();

                currentOrigin = origin;
                if (destinations) {
                    for (var i = 0; i < destinations.length; i++) {
                        var line = lineSeries.mapLines.create();
                        line.imagesToConnect = [origin.mapImage.id, destinations[i]];
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

function showBarChart1(dateStart, dateEnd, probeID) {

    $.ajax({
        url: "/get-data-webload",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "probeID": probeID
        },
        success: function (data) {
            var valueArr = [];
            var minValueWebload;
            var maxValueWebload;
            for (var i = 0; i < data.length; i++) {
                valueArr.push(parseInt(data[i].avgValue));
            }
            minValueWebload = Math.min.apply(Math, valueArr);
            maxValueWebload = Math.max.apply(Math, valueArr);

            $("#min_webload_value").text(Math.round(minValueWebload));
            $("#max_webload_value").text(Math.round(maxValueWebload));

            var chart = am4core.create("bar_chart_1", am4charts.XYChart);

            chart.logo.disabled = true;

            chart.data = data;

            var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.title.text = "Miền";
            categoryAxis.dataFields.category = "domainName";
            categoryAxis.renderer.inversed = true;
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.ticks.template.strokeOpacity = 1;
            categoryAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
            categoryAxis.renderer.ticks.template.strokeWidth = 2;
            categoryAxis.renderer.ticks.template.length = 10;

            var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.renderer.opposite = true;
            valueAxis.title.text = "Value";

            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.categoryY = "domainName";
            series.dataFields.valueX = "avgValue";
            series.columns.template.fillOpacity = 0.8;
            series.columns.template.strokeOpacity = 0;
            series.tooltipText = "Domain: {categoryY}\n Average Value: {valueX.value}";

            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "zoomY";
            chart.scrollbarY = new am4core.Scrollbar();
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

function showLineChart1(dateStart, dateEnd, probeID) {

    $.ajax({
        url: "/get-data-facebook",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "probeID": probeID
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

            var chart = am4core.create("line_chart_1", am4charts.XYChart);

            chart.logo.disabled = true;

            chart.data = data;

            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "time";
            // categoryAxis.title.text = "Date";
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
            valueAxis.title.text = "Giá trị";

            var series = chart.series.push(new am4charts.LineSeries());
            series.stroke = am4core.color("#4caf50");
            series.strokeWidth = 1;
            series.dataFields.valueY = "uploadValue";
            series.dataFields.categoryX = "time";
            series.tooltipText = "Upload: {categoryX}\nValue: {valueY}";
            series.fillOpacity = 0.2;
            series.name = "Upload";
            series.tensionX = 0.8;

            var series2 = chart.series.push(new am4charts.LineSeries());
            series2.stroke = am4core.color("#af7817");
            series2.strokeWidth = 1;
            series2.dataFields.valueY = "downloadValue";
            series2.dataFields.categoryX = "time";
            series2.tooltipText = "Download: {categoryX}\nValue: {valueY}";
            series2.fillOpacity = 0.2;
            series2.name = "Download";
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

function showLineChart2(dateStart, dateEnd, probeID) {

    $.ajax({
        url: "/get-data-youtube",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "probeID": probeID
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

            var chart = am4core.create("line_chart_2", am4charts.XYChart);

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
            valueAxis.title.text = "Giá trị";

            var series2 = chart.series.push(new am4charts.LineSeries());
            series2.stroke = am4core.color("#4ca1af");
            series2.strokeWidth = 1;
            series2.dataFields.valueY = "downloadValue";
            series2.dataFields.categoryX = "time";
            series2.tooltipText = "Download: {categoryX}\nValue: {valueY}";
            series2.fillOpacity = 0.2;
            series2.name = "Download";
            series2.tensionX = 0.8;

            chart.legend = new am4charts.Legend();
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineY.opacity = 0;
            chart.scrollbarX = new am4core.Scrollbar();

            categoryAxis.start = 0.88;
            categoryAxis.keepSelection = true;
        }
    });
}

function showLineChart3(dateStart, dateEnd, probeID) {

    $.ajax({
        url: "/get-data-speedtest",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "probeID": probeID
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
                delayArr.push(parseInt(data[i].delayValue));
            }
            avgUploadValue = Math.round(calculateAverageArr(upArr));
            avgDownloadValue = Math.round(calculateAverageArr(downArr));
            $("#avg_speedtest_upload").text(avgUploadValue);
            $("#avg_speedtest_download").text(avgDownloadValue);

            minDelayValue = Math.min.apply(Math,delayArr);
            maxDelayValue = Math.max.apply(Math,delayArr);
            $("#min_delay_value").text(minDelayValue);
            $("#max_delay_value").text(maxDelayValue);

            var chart = am4core.create("line_chart_3", am4charts.XYChart);
            chart.logo.disabled = true;
            chart.colors.step = 8;
            chart.data = data;
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "time";
            categoryAxis.tooltip.disabled = true;
            categoryAxis.renderer.cellStartLocation = 0.1
            categoryAxis.renderer.cellEndLocation = 0.9
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

            function createAxisAndSeries1(field, name, opposite) {
                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.tooltip.disabled = true;
                if (chart.yAxes.indexOf(valueAxis) != 0) {
                    valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
                }

                var series = chart.series.push(new am4charts.ColumnSeries());
                series.dataFields.valueY = field;
                series.dataFields.categoryX = "time";
                series.strokeWidth = 2;
                series.yAxis = valueAxis;
                series.name = name;
                series.tooltipText = "{name}: {categoryX}\nValue: {valueY}";
                series.tensionX = 0.8;

                valueAxis.renderer.line.strokeOpacity = 1;
                valueAxis.renderer.line.strokeWidth = 2;
                valueAxis.renderer.line.stroke = series.stroke;
                valueAxis.renderer.labels.template.fill = series.stroke;
                valueAxis.renderer.opposite = opposite;
            }

            function createAxisAndSeries2(field, name, opposite) {
                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.tooltip.disabled = true;
                if (chart.yAxes.indexOf(valueAxis) != 0) {
                    valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
                }

                var series = chart.series.push(new am4charts.ColumnSeries());

                series.dataFields.valueY = field;
                series.dataFields.categoryX = "time";
                series.strokeWidth = 2;
                series.yAxis = valueAxis;
                series.name = name;
                series.tooltipText = "{name}: {categoryX}\nValue: {valueY}";
                series.tensionX = 0.8;

                valueAxis.renderer.line.strokeOpacity = 1;
                valueAxis.renderer.line.strokeWidth = 2;
                valueAxis.renderer.line.stroke = series.stroke;
                valueAxis.renderer.labels.template.fill = series.stroke;
                valueAxis.renderer.opposite = opposite;
                valueAxis.renderer.labels.template.adapter.add("text", function (text) {
                    return text.match(/~~/) ? "" : "";
                });
            }

            function createAxisAndSeries3(field, name, opposite) {
                var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.tooltip.disabled = true;
                if (chart.yAxes.indexOf(valueAxis) != 0) {
                    valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
                }

                var series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.valueY = field;
                series.dataFields.categoryX = "time";
                series.strokeWidth = 3;
                series.yAxis = valueAxis;
                series.name = name;
                series.tooltipText = "{name}: {categoryX}\nValue: {valueY}";
                series.tensionX = 0.8;
                series.showOnInit = true;

                valueAxis.renderer.line.strokeOpacity = 1;
                valueAxis.renderer.line.strokeWidth = 2;
                valueAxis.renderer.line.stroke = series.stroke;
                valueAxis.renderer.labels.template.fill = series.stroke;
                valueAxis.renderer.opposite = opposite;
            }

            createAxisAndSeries1("uploadValue", "Upload", false);
            createAxisAndSeries2("downloadValue", "Download", false);
            createAxisAndSeries3("delayValue", "Delay", true);

            chart.legend = new am4charts.Legend();
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineY.opacity = 0;
            chart.scrollbarX = new am4core.Scrollbar();
            // chart.scrollbarY = new am4core.Scrollbar();
            categoryAxis.start = 0.95;
            categoryAxis.keepSelection = true;

        }
    });
}

function showLineChart4(dateStart, dateEnd, probeID) {

    $.ajax({
        url: "/get-data-game",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "probeID": probeID
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
