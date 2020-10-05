$(document).ready(function () {
    getAllUsers();
});

function getAllUsers() {
    $("#usersTable").empty();
    $.ajax({
        url: "/admin/manage/user/get-all",
        type: "POST",
        dataType: "json",
        success: function (data) {
            showUserTable(data);
        }
    });
}

function add_user() {
    $('#exampleModalLabel').html("Thêm tài khoản");
    $('#username').val("");
    $("#password").val("");
    $('#name').val("");
    $('#role').selectpicker('deselectAll');
    $('#role').selectpicker('render');
    $('#address').val("");
    $('#email').val("");
    $('#phoneNumber').val("");
    $('#add_edit_popup').modal('show');
    $('#form_add_edit_user').attr('action', '/admin/manage/user/add-edit');
    $('#form_add_edit_user').attr('method', 'post');
}

function edit_user(userID, username, password, name, role, email, phoneNumber, address) {
    $('#exampleModalLabel').html("Cập nhật thông tin tài khoản");
    $('#id').attr("readonly", true);
    $("#id").val(userID);
    $("#username").val(username);
    $("#name").val(name);
    $("#password").val(password);
    $('#email').val(email);
    $('#phoneNumber').val(phoneNumber);
    $('#address').val(address);
    $('#role').selectpicker('render');
    $('#add_edit_popup').modal('show');
    $('#form_add_edit_event').attr('action', '/admin/manage/user/add-edit');
    $('#form_add_edit_event').attr('method', 'put');
}

function submitForm(form) {
    var url = '/admin/manage/user/add-edit';
    var formData = $(form).serialize();
    var method = $(form).attr('method');
    $.ajax({
        url: url,
        type: method,
        data: formData,
        success: function (data) {
            $('#add_edit_popup').modal('hide');
            swal("Done", data, "success");
            getAllUsers();
        },
        error: function (data) {
            swal("Fail", data.responseText, "warning");
        }
    });
}

function delete_user(userID) {
    swal({
            title: "Xóa tài khoản này?",
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
                    url: "/admin/manage/user/delete",
                    type: "DELETE",
                    data: {
                        "userID": userID
                    },
                    success: function (data) {
                        swal("Done", data, "success");
                        getAllUsers();
                    },
                    error: function (data) {
                        swal("Fail", data.responseText, "warning");
                    }
                });
            }
        });
}

function getUserByRole(roleUser) {
    if (roleUser == "All") {
        getAllUsers();
    } else {
        $("#usersTable").empty();
        $.ajax({
            url: "/admin/manage/user/filter-by-role",
            type: "POST",
            dataType: 'json',
            data: {
                "roleUser": roleUser
            },
            success: function (data) {
                showUserTable(data);
            },
            error: function (data) {
                swal("Fail", data.responseText, "warning");
            }
        });
    }
}

function showUserTable(data) {
    var tr_user_table = '<tr class="row-user-table"><td colspan="3"><table class="table table-bordered">'
        + '<tr class="bg-light" style="text-align: center;">'
        + '<th>STT</th>'
        + '<th>Tên tài khoản</th>'
        + '<th>Tên người dùng</th>'
        + '<th>Quyền</th>'
        + '<th>Email</th>'
        + '<th>Số điện thoại</th>'
        + '<th>Địa chỉ</th>'
        + '<th>Tác vụ</th>'
        + '</tr>';
    var stt = 0;
    for (var element in data) {
        stt++;
        var roleUser = "";
        if (data[element].role == "ROLE_ADMIN") {
            roleUser = "Admin";
        }
        if (data[element].role == "ROLE_USER") {
            roleUser = "Tác giả";
        }
        tr_user_table = tr_user_table +
            '<tr style="text-align: center;">'
            + '<td>' + stt + '</td>'
            + '<td>' + data[element].username + '</td>'
            + '<td>' + data[element].name + '</td>'
            + '<td>' + roleUser + '</td>'
            + '<td>' + data[element].email + '</td>'
            + '<td>' + data[element].phoneNumber + '</td>'
            + '<td>' + data[element].address + '</td>'
            + '<td><div class="list-icons">' +
            '<button class="btn-group list-icons-item text-primary-600 bg-white" data-toggle="tooltip" title="Sửa" onclick="edit_user(\'' + data[element].id + '\',\'' + data[element].username + '\',\'' + data[element].password + '\',\'' + data[element].name + '\',\'' + data[element].role + '\',\'' + data[element].email + '\',\'' + data[element].phoneNumber + '\',\'' + data[element].address + '\')" style="border: none"><i class="icon-pencil7"></i></button>\n' +
            '<button class="btn-group list-icons-item text-danger-600 bg-white" data-toggle="tooltip" title="Xóa" onclick="delete_user(' + data[element].id + ')"  style="border: none"><i class="icon-trash"></i></button>\n' +
            '</div></td>'
    }
    tr_user_table = tr_user_table + '</table></td></tr>';
    $("#usersTable").append(tr_user_table);

}
