$(document).ready(function () {
    getAllEvents();
    getAllGroupProbe();
});

function getAllEvents() {
    $("#eventTable").empty();
    $.ajax({
        url: "/event-config/getAll",
        type: "POST",
        dataType: "json",
        success: function (data) {
            showEventTable(data);
        }
    });
}

function add_event() {
    $('#exampleModalLabel').html("Thêm Event");
    $('#kpi').attr("readonly", false);
    $("#kpi").val("");
    $('#critical').val("");
    $('#alarm').val("");
    $('#warning').val("");
    $('#groupProbeId').selectpicker('deselectAll');
    $('#groupProbeId').selectpicker('render');
    $('#add_edit_popup').modal('show');
    $('#form_add_edit_event').attr('action', '/event-config/add-edit');
    $('#form_add_edit_event').attr('method', 'post');
}

function edit_event(eventID, kpi, critical, alarm, warning, groupProbeID) {
    $.ajax({
        url: "/event-config/check-edit",
        type: "POST",
        data: {
            "groupProbeID": groupProbeID
        },
        success: function () {
            $('#exampleModalLabel').html("Cập nhật Event");
            $('#kpi').attr("readonly", true);
            $("#eventID").val(eventID);
            $("#kpi").val(kpi);
            $('#critical').val(critical);
            $('#alarm').val(alarm);
            $('#warning').val(warning);
            $('#groupProbeId').selectpicker('render');
            $('#add_edit_popup').modal('show');
            $('#form_add_edit_event').attr('action', '/event-config/add-edit');
            $('#form_add_edit_event').attr('method', 'put');
        },
        error: function (data) {
            swal("Fail", data.responseText, "warning");
        }
    });
}

function submitForm(form) {
    var url = '/event-config/add-edit';
    var formData = $(form).serialize();
    var method = $(form).attr('method');
    $.ajax({
        url: url,
        type: method,
        data: formData,
        success: function (data) {
            $('#add_edit_popup').modal('hide');
            swal("Done", data, "success");
            getAllEvents();
        },
        error: function (data) {
            swal("Fail", data.responseText, "warning");
        }
    });
}

function delete_event(eventID, groupProbeID) {
    $.ajax({
        url: "/event-config/check-delete",
        type: "POST",
        data: {
            "groupProbeID": groupProbeID
        },
        success: function () {
            swal({
                    title: "Xác nhận",
                    text: "Thực hiện xóa dự kiện này?",
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
                            url: "/event-config/delete",
                            type: "DELETE",
                            data: {
                                "eventID": eventID
                            },
                            success: function (data) {
                                swal("Done", data, "success");
                                getAllEvents();
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

function getAllGroupProbe() {
    $.ajax({
        url: "/group-probe/get-all",
        type: "POST",
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var optionText = data[i][1];
                var optionValue = data[i][0];
                $('#groupProbeId').append(`<option value="${optionValue}">${optionText}</option>`);
                $('#groupProbeIDFilter').selectpicker('deselectAll');
                $('#groupProbeIDFilter').selectpicker('render');
                $('#groupProbeIDFilter').append(`<option value="${optionValue}">${optionText}</option>`);
            }
        }
    });
}

function getEventByGroup(groupProbeID) {
    if (groupProbeID == 0) {
        getAllEvents();
    } else {
        $("#eventTable").empty();
        $.ajax({
            url: "/group-probe/get-by-group",
            type: "POST",
            dataType: 'json',
            data: {
                "groupProbeID": groupProbeID
            },
            success: function (data) {
                showEventTable(data);
            },
            error: function (data) {
                swal("Fail", data.responseText, "warning");
            }
        });
    }
}

function showEventTable(data) {
    var tr_event_table = '<tr class="row-user-table"><td colspan="3"><table class="table table-bordered">'
        + '<tr class="bg-light" style="text-align: center;">'
        + '<th>STT</th>'
        + '<th>KPI</th>'
        + '<th style="text-align: center;">Critical</th>'
        + '<th style="text-align: center;">Alarm</th>'
        + '<th style="text-align: center;">Warning</th>'
        + '<th style="text-align: center;">Group</th>'
        + '<th style="text-align: center;">Tác Vụ</th>'
        + '</tr>';
    var stt = 0;
    for (var element in data) {
        stt++;
        tr_event_table = tr_event_table +
            '<tr>'
            + '<td style="text-align: center;">' + stt + '</td>'
            + '<td style="text-align: center;">' + data[element][1] + '</td>'
            + '<td style="text-align: center;">' + data[element][2] + '</td>'
            + '<td style="text-align: center;">' + data[element][3] + '</td>'
            + '<td style="text-align: center;">' + data[element][4] + '</td>'
            + '<td style="text-align: center;">' + data[element][6] + '</td>'
            + '<td><div class="list-icons" style="margin-left: 30%">\n' +
            '<button class="btn-group list-icons-item text-primary-600" data-toggle="tooltip" title="Sửa" onclick="edit_event(' + data[element][0] + ',' + data[element][1] + ',' + data[element][2] + ',' + data[element][3] + ',' + data[element][4] + ',' + data[element][5] + ')" style="border: none"><i class="icon-pencil7"></i></button>\n' +
            '<button class="btn-group list-icons-item text-danger-600" data-toggle="tooltip" title="Xóa" onclick="delete_event(' + data[element][0] + ',' + data[element][5] + ')"  style="border: none"><i class="icon-trash"></i></button>\n' +
            '</div></td>'
    }
    tr_event_table = tr_event_table + '</table></td></tr>';
    $("#eventTable").append(tr_event_table);

}
