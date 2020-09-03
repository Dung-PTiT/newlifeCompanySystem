function getData() {
    $('body').append('<div style="" id="loadingDiv"><div class="loader"></div></div>');
    $(document).ajaxStart(function () {
        $('#loadingDiv').show();
    }).ajaxStop(function () {
        $('#loadingDiv').remove();
    });
    var facebook_type_select = $("#facebook_type_select option:selected").attr("value");
    var youtube_type_select = $("#youtube_type_select option:selected").attr("value");
    var delay_type_select = $("#delay_type_select option:selected").attr("value");
    var webload_type_select = $("#webload_type_select option:selected").attr("value");
    var speedtest_type_select = $("#speedtest_type_select option:selected").attr("value");
    var game_type_select = $("#game_type_select option:selected").attr("value");

    showFacebookChart(facebook_type_select);
    showYoutubeChart(youtube_type_select);
    showDelayChart(delay_type_select);
    showWebloadChart(webload_type_select);
    showSpeedtestChart(speedtest_type_select);
    showGameChart(game_type_select);
}

function showFacebookChart(typeSelect) {
    showChart("facebook", "facebook_chart", typeSelect);
}

function showYoutubeChart(typeSelect) {
    showChart("youtube", "youtube_chart", typeSelect);
}

function showDelayChart(typeSelect) {
    showChart("delay", "delay_chart", typeSelect);
}

function showWebloadChart(typeSelect) {
    showChart("webload", "webload_chart", typeSelect);
}

function showSpeedtestChart(typeSelect) {
    showChart("speedtest", "speedtest_chart", typeSelect);
}

function showGameChart(typeSelect) {
    showChart("game", "game_chart", typeSelect);
}

function showChart(serviceName, chartName, typeSelect) {
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();
    $.ajax({
        url: "/get-data-benchmark-" + serviceName + "-by-type-select",
        type: "POST",
        dataType: "json",
        data: {
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "typeSelect": typeSelect
        },
        success: function (data) {
            var chart = am4core.create(chartName, am4charts.XYChart);
            chart.logo.disabled = true;
            chart.colors.step = 9;
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

            createAxisAndSeries1("vinaphoneAvgValue", "Vinaphone", false);
            createAxisAndSeries2("mobiAvgValue", "Mobi", false);
            createAxisAndSeries3("viettelAvgValue", "Viettel", true);

            chart.legend = new am4charts.Legend();
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.lineY.opacity = 0;
            chart.scrollbarX = new am4core.Scrollbar();
            // chart.scrollbarY = new am4core.Scrollbar();
            categoryAxis.start = 0.3;
            categoryAxis.keepSelection = true;
        }
    });
}
