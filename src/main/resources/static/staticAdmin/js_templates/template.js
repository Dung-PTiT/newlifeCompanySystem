$(document).ready(function () {
    getCurrentUser();
});

function getCurrentUser() {
    $.ajax({
        type: "POST",
        url: "/admin/manage/user/getCurrentUser",
        dataType: "json",
        success: function (data) {
            showUserInfo(data);
        }
    });
}

function showUserInfo(user) {
    var modalStr =
        '<div class="form-group row"><label class="col-md-4 col-form-label">Tên đăng nhập</label>\n' +
        '                                <div class="col-md-8">\n' +
        '                                    <input type="text" class="form-control" readonly value="' + user.username + '">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row"><label class="col-md-4 col-form-label">Tên tài khoản</label>\n' +
        '                                <div class="col-md-8">\n' +
        '                                    <input type="text" class="form-control" readonly value="' + user.name + '">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row"><label class="col-md-4 col-form-label">Quyền</label>\n' +
        '                                <div class="col-md-8">\n' +
        '                                    <input type="text" class="form-control" readonly value="' + user.role + '">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row"><label class="col-md-4 col-form-label">Email</label>\n' +
        '                                <div class="col-md-8">\n' +
        '                                    <input type="text" class="form-control" readonly value="' + user.email + '">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row"><label class="col-md-4 col-form-label">Số điện thoại</label>\n' +
        '                                <div class="col-md-8">\n' +
        '                                    <input type="text" class="form-control" readonly value="' + user.phoneNumber + '">\n' +
        '                                </div>\n' +
        '                            </div>\n' +
        '                            <div class="form-group row"><label class="col-md-4 col-form-label">Địa chỉ</label>\n' +
        '                                <div class="col-md-8">\n' +
        '                                    <textarea class="form-control" readonly>' + user.address + '</textarea>\n' +
        '                                </div>\n' +
        '                            </div>';
    $("#modal-body-user-info").append(modalStr);
    $("#user-name").html(user.name);
}