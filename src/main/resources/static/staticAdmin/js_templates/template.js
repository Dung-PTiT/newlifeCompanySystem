function showNotification() {
    $.ajax({
        url: "/get-event-notification",
        type: "POST",
        dataType: "json",
        success: function (data) {
            if (data.length > 0) {
                var contentString = '';
                for (var i = 0; i < data.length; i++) {
                    var eventType = data[i][2];
                    if (eventType == 1) {
                        contentString = contentString +
                            "                            <li class=\"media\">\n" +
                            "                                <div class=\"mr-3 position-relative\">\n" +
                            "                                    <i class=\"icon-bell2\" style=\"color: yellow\" data-toggle=\"tooltip\"\n" +
                            "                                       title=\"Warning\"></i>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"media-body\">\n" +
                            "                                    <div class=\"media-title\">\n" +
                            "                                        <a href=\"#\">\n" +
                            "                                            <span class=\"font-weight-semibold\">" + data[i][0] + "</span>\n" +
                            "                                            <span class=\"text-muted float-right font-size-sm\">" + subTime(data[i][1]) + "</span>\n" +
                            "                                        </a>\n" +
                            "                                    </div>\n" +
                            "                                    <span class=\"text-muted\">Dịch vụ: " + data[i][3] + "</span>\n" +
                            "                                    <span class=\"text-muted\">, Giá trị: " + data[i][4] + "</span>\n" +
                            "                                    <span class=\"text-muted\">" + data[i][5] + "</span>\n" +
                            "                                </div>\n" +
                            "                            </li>";
                    } else if (eventType == 2) {
                        contentString = contentString +
                            "                            <li class=\"media\">\n" +
                            "                                <div class=\"mr-3 position-relative\">\n" +
                            "                                    <i class=\"icon-bell2\" style=\"color: #ff8e1e\" data-toggle=\"tooltip\"\n" +
                            "                                       title=\"Alarm\"></i>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"media-body\">\n" +
                            "                                    <div class=\"media-title\">\n" +
                            "                                        <a href=\"#\">\n" +
                            "                                            <span class=\"font-weight-semibold\">" + data[i][0] + "</span>\n" +
                            "                                            <span class=\"text-muted float-right font-size-sm\">" + subTime(data[i][1]) + "</span>\n" +
                            "                                        </a>\n" +
                            "                                    </div>\n" +
                            "                                    <span class=\"text-muted\">Dịch vụ: " + data[i][3] + "</span>\n" +
                            "                                    <span class=\"text-muted\">, Giá trị: " + data[i][4] + "</span>\n" +
                            "                                    <span class=\"text-muted\">" + data[i][5] + "</span>\n" +
                            "                                </div>\n" +
                            "                            </li>";
                    } else if (eventType == 3) {
                        contentString = contentString +
                            "                            <li class=\"media\">\n" +
                            "                                <div class=\"mr-3 position-relative\">\n" +
                            "                                    <i class=\"icon-bell2\" style=\"color: red\" data-toggle=\"tooltip\"\n" +
                            "                                       title=\"Critical\"></i>\n" +
                            "                                </div>\n" +
                            "                                <div class=\"media-body\">\n" +
                            "                                    <div class=\"media-title\">\n" +
                            "                                        <a href=\"#\">\n" +
                            "                                            <span class=\"font-weight-semibold\">" + data[i][0] + "</span>\n" +
                            "                                            <span class=\"text-muted float-right font-size-sm\">" + subTime(data[i][1]) + "</span>\n" +
                            "                                        </a>\n" +
                            "                                    </div>\n" +
                            "                                    <span class=\"text-muted\">Dịch vụ: " + data[i][3] + "</span>\n" +
                            "                                    <span class=\"text-muted\">, Giá trị: " + data[i][4] + "</span>\n" +
                            "                                    <span class=\"text-muted\">" + data[i][5] + "</span>\n" +
                            "                                </div>\n" +
                            "                            </li>";
                    }
                }
                $("#notification_event").append(contentString);
            } else if (data.length == 0) {
                $("#notification_event").append('                            <li class="media">\n' +
                    '                                <div class="mr-3 position-relative">\n' +
                    '                                </div>\n' +
                    '                                <div class="media-body">\n' +
                    '                                    <div class="media-title">\n' +
                    '                                        <a href="#">\n' +
                    '                                            <span class="font-weight-semibold" style="color: red">Không có dữ liệu</span>\n' +
                    '                                        </a>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </li>');
            }
        }
    });
}

function getRangeSum(arr, from, to) {
    return arr.slice(from, to).reduce((p, c) => {
        return p + c;
    }, 0);
}

function showAllNotification() {
    $("#notifications_content").empty();
    $.ajax({
        url: "/get-all-notifications",
        type: "POST",
        dataType: "json",
        success: function (data) {
            var allDateArr = [];
            for (var i = 0; i < data.length; i++) {
                allDateArr.push(data[i][1].substring(0, 10));
            }
            var counts = {};
            allDateArr.forEach(el => counts[el] = 1 + (counts[el] || 0));
            var size = Object.values(counts);
            var indexDateArr = [];
            for (var p = 0; p < size.length; p++) {
                indexDateArr.push(getRangeSum(size, 0, p));
            }
            var dateArr = Array.from(new Set(allDateArr));
            var contentString = "";
            for (var index = 0; index < indexDateArr.length;) {
                for (var i = 0; i < data.length; i++) {
                    if ((indexDateArr[index]) == i) {
                        contentString = contentString +
                            "<div class=\"mt-4\" style=\"margin-left: 10%\">\n" +
                            "            <h6 class=\"mb-0 font-weight-semibold\">" + dateArr[index] + "</h6>\n" +
                            "        </div>";
                        index++;
                    }
                    var noACK = "        <div class=\"header-elements d-none\">\n" +
                        "            <div class=\"breadcrumb justify-content-center\">\n" +
                        "                <div class=\"breadcrumb-elements-item dropdown p-0\">\n" +
                        "                    <div class=\"list-icons\">\n" +
                        "                        <div class=\"dropdown\">\n" +
                        "                            <a href=\"#\" class=\"list-icons-item dropdown-toggle caret-0\" data-toggle=\"dropdown\"\n" +
                        "                               aria-expanded=\"false\"><i class=\"icon-menu9\"></i></a>\n" +
                        "                            <div class=\"dropdown-menu dropdown-menu-right\" x-placement=\"bottom-end\"\n" +
                        "                                 style=\"position: absolute; will-change: transform; top: 0; left: 0; transform: translate3d(-159px, 19px, 0px);\">\n" +
                        "                                <a href=\"#\" class=\"dropdown-item\" onclick=\"ackEvent(" + data[i][6] + "," + data[i][9] + ")\"><i class=\"icon-pencil7 text-info\"></i> ACK</a>\n" +
                        "                                <div class=\"dropdown-divider\"></div>\n" +
                        "                                 <a href=\"#\" class=\"dropdown-item\" onclick=\"deleteEvent(" + data[i][6] + "," + data[i][9] + ")\"><i class=\"icon-cross2 text-danger\"></i> Xóa</a>\n" +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "    </div>";
                    var ACK = "        <div class=\"header-elements d-none\">\n" +
                        "            <div class=\"breadcrumb justify-content-center\">\n" +
                        "                <div class=\"breadcrumb-elements-item dropdown p-0\">\n" +
                        "                    <div class=\"list-icons\">\n" +
                        "                        <div class=\"dropdown\">\n" +
                        "                            <a href=\"#\" class=\"list-icons-item dropdown-toggle caret-0\" data-toggle=\"dropdown\"\n" +
                        "                               aria-expanded=\"false\"><i class=\"icon-menu9\" style=\"color: #ddd\"></i></a>\n" +
                        "                            <div class=\"dropdown-menu dropdown-menu-right\" x-placement=\"bottom-end\"\n" +
                        "                                 style=\"position: absolute; will-change: transform; top: 0; left: 0; transform: translate3d(-159px, 19px, 0px);\">\n" +
                        "                                 <a href=\"#\" class=\"dropdown-item\" onclick=\"deleteEvent(" + data[i][6] + "," + data[i][9] + ")\"><i class=\"icon-cross2 text-danger\"></i> Xóa</a>\n" +
                        "                            </div>\n" +
                        "                        </div>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "    </div>";
                    var eventType = data[i][2];
                    var checkACK = data[i][7];
                    if (eventType == 1) {
                        if (checkACK == null) {
                            contentString = contentString +
                                "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                "         style=\"width: 80%; margin-left: 10%\">\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\"></i></span>\n" +
                                "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\">" + data[i][1] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: yellow\" data-toggle=\"tooltip\"\n" +
                                "                                                     title=\"Warning\"></i>\n" +
                                "                        <span class=\"breadcrumb-item font-weight-bold\">" + data[i][0] + "</span>\n" +
                                "                    </span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][3] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][4] + "</span>\n" +
                                "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\">" + data[i][5] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                noACK;
                        }
                        if (checkACK == 1) {
                            contentString = contentString +
                                "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                "         style=\"width: 80%; margin-left: 10%\">\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\" style=\"color: #ddd\"></i></span>\n" +
                                "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\" style=\"color: #ddd\">" + data[i][1] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: #ddd\" data-toggle=\"tooltip\"\n" +
                                "                                                     title=\"Warning\"></i>\n" +
                                "                        <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][0] + "</span>\n" +
                                "                    </span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][3] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][4] + "</span>\n" +
                                "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\" style=\"color: #ddd\">" + data[i][5] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                ACK;
                        }

                    } else if (eventType == 2) {
                        if (checkACK == null) {
                            contentString = contentString +
                                "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                "         style=\"width: 80%; margin-left: 10%\">\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\"></i></span>\n" +
                                "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\">" + data[i][1] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: #ff8e1e\" data-toggle=\"tooltip\"\n" +
                                "                                                     title=\"Alarm\"></i>\n" +
                                "                        <span class=\"breadcrumb-item font-weight-bold\">" + data[i][0] + "</span>\n" +
                                "                    </span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][3] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][4] + "</span>\n" +
                                "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\">" + data[i][5] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                noACK;
                        }
                        if (checkACK == 1) {
                            contentString = contentString +
                                "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                "         style=\"width: 80%; margin-left: 10%\">\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\" style=\"color: #ddd\"></i></span>\n" +
                                "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\" style=\"color: #ddd\">" + data[i][1] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: #ddd\" data-toggle=\"tooltip\"\n" +
                                "                                                     title=\"Alarm\"></i>\n" +
                                "                        <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][0] + "</span>\n" +
                                "                    </span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][3] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][4] + "</span>\n" +
                                "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\" style=\"color: #ddd\">" + data[i][5] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                ACK;
                        }
                    } else if (eventType == 3) {
                        if (checkACK == null) {
                            contentString = contentString +
                                "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                "         style=\"width: 80%; margin-left: 10%\">\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\"></i></span>\n" +
                                "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\">" + data[i][1] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: red\" data-toggle=\"tooltip\"\n" +
                                "                                                     title=\"Critical\"></i>\n" +
                                "                        <span class=\"breadcrumb-item font-weight-bold\">" + data[i][0] + "</span>\n" +
                                "                    </span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][3] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][4] + "</span>\n" +
                                "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\">" + data[i][5] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                noACK;
                        }
                        if (checkACK == 1) {
                            contentString = contentString +
                                "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                "         style=\"width: 80%; margin-left: 10%\">\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\" style=\"color: #ddd\"></i></span>\n" +
                                "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\" style=\"color: #ddd\">" + data[i][1] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: #ddd\" data-toggle=\"tooltip\"\n" +
                                "                                                     title=\"Critical\"></i>\n" +
                                "                        <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][0] + "</span>\n" +
                                "                    </span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][3] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                "        <div class=\"d-flex\">\n" +
                                "            <div class=\"breadcrumb\">\n" +
                                "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][4] + "</span>\n" +
                                "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\" style=\"color: #ddd\">" + data[i][5] + "</span>\n" +
                                "            </div>\n" +
                                "        </div>\n" +
                                ACK;
                        }
                    }
                }
            }
            $("#notifications_content").append(contentString);
        }
    });
}

function showEventByEventType() {
    $("#notifications_content").empty();
    var eventType = $("#event_type option:selected").val();
    if (eventType == "all") {
        showAllNotification();
    } else {
        $.ajax({
            url: "/get-event-by-type",
            type: "POST",
            dataType: "json",
            data: {
                "eventType": eventType
            },
            success: function (data) {
                var allDateArr = [];
                for (var i = 0; i < data.length; i++) {
                    allDateArr.push(data[i][1].substring(0, 10));
                }
                var counts = {};
                allDateArr.forEach(el => counts[el] = 1 + (counts[el] || 0));
                var size = Object.values(counts);
                var indexDateArr = [];
                for (var p = 0; p < size.length; p++) {
                    indexDateArr.push(getRangeSum(size, 0, p));
                }
                var dateArr = Array.from(new Set(allDateArr));
                var contentString = "";
                for (var index = 0; index < indexDateArr.length;) {
                    for (var i = 0; i < data.length; i++) {
                        if ((indexDateArr[index]) == i) {
                            contentString = contentString +
                                "<div class=\"mt-4\" style=\"margin-left: 10%\">\n" +
                                "            <h6 class=\"mb-0 font-weight-semibold\">" + dateArr[index] + "</h6>\n" +
                                "        </div>";
                            index++;
                        }
                        var noACK = "        <div class=\"header-elements d-none\">\n" +
                            "            <div class=\"breadcrumb justify-content-center\">\n" +
                            "                <div class=\"breadcrumb-elements-item dropdown p-0\">\n" +
                            "                    <div class=\"list-icons\">\n" +
                            "                        <div class=\"dropdown\">\n" +
                            "                            <a href=\"#\" class=\"list-icons-item dropdown-toggle caret-0\" data-toggle=\"dropdown\"\n" +
                            "                               aria-expanded=\"false\"><i class=\"icon-menu9\"></i></a>\n" +
                            "                            <div class=\"dropdown-menu dropdown-menu-right\" x-placement=\"bottom-end\"\n" +
                            "                                 style=\"position: absolute; will-change: transform; top: 0; left: 0; transform: translate3d(-159px, 19px, 0px);\">\n" +
                            "                                <a href=\"#\" class=\"dropdown-item\" onclick=\"ackEvent(" + data[i][6] + "," + data[i][9] + ")\"><i class=\"icon-pencil7 text-info\"></i> ACK</a>\n" +
                            "                                <div class=\"dropdown-divider\"></div>\n" +
                            "                                 <a href=\"#\" class=\"dropdown-item\" onclick=\"deleteEvent(" + data[i][6] + "," + data[i][9] + ")\"><i class=\"icon-cross2 text-danger\"></i> Xóa</a>\n" +
                            "                            </div>\n" +
                            "                        </div>\n" +
                            "                    </div>\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "        </div>\n" +
                            "    </div>";
                        var ACK = "        <div class=\"header-elements d-none\">\n" +
                            "            <div class=\"breadcrumb justify-content-center\">\n" +
                            "                <div class=\"breadcrumb-elements-item dropdown p-0\">\n" +
                            "                    <div class=\"list-icons\">\n" +
                            "                        <div class=\"dropdown\">\n" +
                            "                            <a href=\"#\" class=\"list-icons-item dropdown-toggle caret-0\" data-toggle=\"dropdown\"\n" +
                            "                               aria-expanded=\"false\"><i class=\"icon-menu9\" style=\"color: #ddd\"></i></a>\n" +
                            "                            <div class=\"dropdown-menu dropdown-menu-right\" x-placement=\"bottom-end\"\n" +
                            "                                 style=\"position: absolute; will-change: transform; top: 0; left: 0; transform: translate3d(-159px, 19px, 0px);\">\n" +
                            "                                 <a href=\"#\" class=\"dropdown-item\" onclick=\"deleteEvent(" + data[i][6] + "," + data[i][9] + ")\"><i class=\"icon-cross2 text-danger\"></i>Xóa</a>\n" +
                            "                            </div>\n" +
                            "                        </div>\n" +
                            "                    </div>\n" +
                            "                </div>\n" +
                            "            </div>\n" +
                            "        </div>\n" +
                            "    </div>";
                        var eventType = data[i][2];
                        var checkACK = data[i][7];
                        if (eventType == 1) {
                            if (checkACK == null) {
                                contentString = contentString +
                                    "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                    "         style=\"width: 80%; margin-left: 10%\">\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\"></i></span>\n" +
                                    "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\">" + data[i][1] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: yellow\" data-toggle=\"tooltip\"\n" +
                                    "                                                     title=\"Warning\"></i>\n" +
                                    "                        <span class=\"breadcrumb-item font-weight-bold\">" + data[i][0] + "</span>\n" +
                                    "                    </span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][3] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][4] + "</span>\n" +
                                    "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\">" + data[i][5] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    noACK;
                            }
                            if (checkACK == 1) {
                                contentString = contentString +
                                    "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                    "         style=\"width: 80%; margin-left: 10%\">\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\" style=\"color: #ddd\"></i></span>\n" +
                                    "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\" style=\"color: #ddd\">" + data[i][1] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: #ddd\" data-toggle=\"tooltip\"\n" +
                                    "                                                     title=\"Warning\"></i>\n" +
                                    "                        <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][0] + "</span>\n" +
                                    "                    </span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][3] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][4] + "</span>\n" +
                                    "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\" style=\"color: #ddd\">" + data[i][5] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    ACK;
                            }
                        } else if (eventType == 2) {
                            if (checkACK == null) {
                                contentString = contentString +
                                    "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                    "         style=\"width: 80%; margin-left: 10%\">\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\"></i></span>\n" +
                                    "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\">" + data[i][1] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: #ff8e1e\" data-toggle=\"tooltip\"\n" +
                                    "                                                     title=\"Alarm\"></i>\n" +
                                    "                        <span class=\"breadcrumb-item font-weight-bold\">" + data[i][0] + "</span>\n" +
                                    "                    </span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][3] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][4] + "</span>\n" +
                                    "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\">" + data[i][5] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    noACK;
                            }
                            if (checkACK == 1) {
                                contentString = contentString +
                                    "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                    "         style=\"width: 80%; margin-left: 10%\">\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\" style=\"color: #ddd\"></i></span>\n" +
                                    "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\" style=\"color: #ddd\">" + data[i][1] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: #ddd\" data-toggle=\"tooltip\"\n" +
                                    "                                                     title=\"Alarm\"></i>\n" +
                                    "                        <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][0] + "</span>\n" +
                                    "                    </span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][3] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][4] + "</span>\n" +
                                    "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\" style=\"color: #ddd\">" + data[i][5] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    ACK;
                            }
                        } else if (eventType == 3) {
                            if (checkACK == null) {
                                contentString = contentString +
                                    "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                    "         style=\"width: 80%; margin-left: 10%\">\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\"></i></span>\n" +
                                    "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\">" + data[i][1] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: red\" data-toggle=\"tooltip\"\n" +
                                    "                                                     title=\"Critical\"></i>\n" +
                                    "                        <span class=\"breadcrumb-item font-weight-bold\">" + data[i][0] + "</span>\n" +
                                    "                    </span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][3] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\">" + data[i][4] + "</span>\n" +
                                    "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\">" + data[i][5] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    noACK;
                            }
                            if (checkACK == 1) {
                                contentString = contentString +
                                    "<div class=\"breadcrumb-line breadcrumb-line-light bg-white breadcrumb-line-component header-elements-md-inline mt-1 mb-1 pt-2 pb-2\"\n" +
                                    "         style=\"width: 80%; margin-left: 10%\">\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item\"><i class=\"icon-alarm mr-2\" style=\"color: #ddd\"></i></span>\n" +
                                    "                <span class=\"breadcrumb-elements-item ml-1 font-weight-bold\" style=\"color: #ddd\">" + data[i][1] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                    <span class=\"breadcrumb-item\"><i class=\"icon-bell2 mr-2\" style=\"color: #ddd\" data-toggle=\"tooltip\"\n" +
                                    "                                                     title=\"Critical\"></i>\n" +
                                    "                        <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][0] + "</span>\n" +
                                    "                    </span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][3] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    "        <div class=\"d-flex\">\n" +
                                    "            <div class=\"breadcrumb\">\n" +
                                    "                <span class=\"breadcrumb-item font-weight-bold\" style=\"color: #ddd\">" + data[i][4] + "</span>\n" +
                                    "                <span class=\"breadcrumb-elements-item font-weight-bold pl-1\" style=\"color: #ddd\">" + data[i][5] + "</span>\n" +
                                    "            </div>\n" +
                                    "        </div>\n" +
                                    ACK;
                            }
                        }
                    }
                }
                $("#notifications_content").append(contentString);
            }
        });
    }
}

function ackEvent(eventID, groupProbeID) {
    $.ajax({
        url: "/event-notification/check-ack-event",
        type: "POST",
        data: {
            "groupProbeID": groupProbeID
        },
        success: function () {
            swal({
                    title: "Xác nhận",
                    text: "Thực hiện ACK sự kiện này ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "ACK",
                    cancelButtonText: "Hủy",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        $.ajax({
                            url: "/ack-event",
                            type: "PUT",
                            data: {
                                "eventID": eventID
                            },
                            success: function (data) {
                                swal("Done", data, "success");
                                showAllNotification();
                            },
                            error: function (data) {
                                swal("Fail", data.responseText, "warning");
                            }
                        });
                    }
                });
        },
        error: function (data) {
            swal("Fail", data.responseText, "warning");
        }
    });
}

function deleteEvent(eventID, groupProbeID) {
    $.ajax({
        url: "/event-notification/check-delete-event",
        type: "POST",
        data: {
            "groupProbeID": groupProbeID
        },
        success: function () {
            swal({
                    title: "Xác nhận",
                    text: "Thực hiện xóa sự kiện này ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Xóa",
                    cancelButtonText: "Hủy",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {
                        $.ajax({
                            url: "/delete-event",
                            type: "DELETE",
                            data: {
                                "eventID": eventID
                            },
                            success: function (data) {
                                swal("Done", data, "success");
                                showAllNotification();
                            },
                            error: function (data) {
                                swal("Fail", data.responseText, "warning");
                            }
                        });

                    }
                });
        },
        error: function (data) {
            swal("Fail", data.responseText, "warning");
        }
    });
}

function subTime(time) {
    return time.substring(11, 16);
}

