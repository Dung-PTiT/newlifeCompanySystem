$(document).on("scroll", function () {
    var pageTop = $(document).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var tags = $(".card-fade-in-scroll");

    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];

        if ($(tag).position().top < pageBottom) {
            $(tag).addClass("visible");
        } else {
            $(tag).removeClass("visible");
        }
    }
});

$(document).ready(function () {
    getAllPost();

    $("#submitButton").click(function (event) {
        // Stop default form Submit.
        event.preventDefault();
        // Call Ajax Submit.
        ajaxSubmitForm();

    });
});

function getAllPost() {
    $("#postTable").empty();
    $.ajax({
        type: "GET",
        url: "/api/public/post/getAll",
        dataType: "json",
        success: function (data) {
            var postDashboardList = [];
            for (var i = 0; i < data.data.length; i++) {
                var post = data.data[i];
                if (post.category.id == 1) {
                    postDashboardList.push(post);
                }
            }
            showPostTable(postDashboardList);
        }
    });
}

function showPostTable(postList) {
    var tr_post_table = '<table class="table" data-aos="zoom-out-up">'
        + '<tr class="bg-light" style="text-align: center;">'
        + '<th class="pb-0"><h6>Số</h6></th>'
        + '<th class="pb-0" style="display: none">ID</th>'
        + '<th class="pb-0">Ảnh</th>'
        + '<th class="pb-0"><h6>Thông tin bài viết</h6></th>'
        + '<th class="pb-0"><h6>Sửa</h6></th>'
        + '</tr>';
    var stt = 0;
    for (var index in postList) {
        stt++;
        var postStatus = '';
        if (postList[index].active == true) {
            postStatus = '<span class="badge badge-success">Kích hoạt</span>';
        }
        if (postList[index].active == false) {
            postStatus = '<span class="badge badge-secondary">Chưa kích hoạt</span>';
        }
        var imgName = postList[index].imagePostUrl;
        tr_post_table = tr_post_table +
            '<tr style="text-align: center;" id="' + stt + '">'
            + '<td>' + stt + '</td>'
            + '<td style="display: none">' + postList[index].id + '</td>'
            + '<td style="text-align: center"><h6><span class="text-primary mr-2">Tên ảnh:</span>' + postList[index].imagePostUrl + '</h6>' +
            '<img class="card mb-2" src="/api/image/upload/' + imgName + '" width="150" height="150"/>' +
            '<button type="button" class="btn btn-info legitRipple mt-2" onclick="setPostIdUploaded(' + postList[index].id + ')" data-toggle="modal" data-target="#modal-upload-file" style="padding: 1px 5px 0px 5px;">\n' +
            '<i class="icon-file-upload2" data-toggle="tooltip" title="Thay ảnh"></i></button></td>' +
            '<td><h6><span class="text-primary mr-2">Tiêu đề:</span>' + postList[index].title + '</h6>' +
            '<h6><span class="text-primary mr-2">Nội dung:</span>' + postList[index].content + '</h6>' +
            '<h6><span class="text-primary mr-2">Ngày tạo:</span>' + postList[index].createdDate + ' ---- <span class="text-primary mr-2" >Người tạo:</span>' + postList[index].user.name + '</h6>' +
            '<h6><span class="text-primary mr-2">Ngày sửa gần nhất:</span>' + postList[index].lastModifiedDate + '</h6>' +
            '<h6><span class="text-primary mr-2">Vị trí trong trang:</span>' + postList[index].tag.name + '</h6>' +
            '<h6><span class="text-primary mr-2">Trạng thái:</span>' + postStatus + '</h6></td>'
            + '<td><div class="list-icons">' +
            '<button class="btn btn-group list-icons-item text-primary-600" data-toggle="modal" data-target="#modal-update-post" onclick="injectTextEditPostModal(\'' + postList[index].id + '\',\'' + postList[index].title + '\',\'' + postList[index].content + '\',\'' + postList[index].active + '\')" style="border: none">' +
            '<i class="icon-pencil7" data-toggle="tooltip" title="Sửa"></i></button>\n' +
            // '<button class="btn-group list-icons-item text-danger-600 bg-white" data-toggle="tooltip" title="Xóa" onclick="delete_post(' + postList[index].id + ')"  style="border: none"><i class="icon-trash"></i></button>\n' +
            '</div></td>';
    }
    tr_post_table = tr_post_table + '</table>';
    $("#postTable").append(tr_post_table);
}

var loadFile = function (event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById('img_current_show');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
};

function ajaxSubmitForm() {
    var form = $('#fileUploadForm')[0];
    var data = new FormData(form);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "/api/admin/update-image-post",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function (data) {
            swal("Xong", data, "success");
            $('#fileUploadForm')[0].reset();
            $('#modal-upload-file').modal('hide');
            $('#img_current_show').attr('src', '');
            getAllPost();
        },
        error: function (jqXHR) {
            swal("Lỗi", jqXHR.responseText, "warning");
            $('#modal-upload-file').modal('hide');
        }
    });
}

function setPostIdUploaded(postId) {
    $("#postId").val(postId);
}

function injectTextEditPostModal(postId, postTitle, postContent, postStatus) {
    $("#postUpdateId").val(postId);
    $("#title").val(postTitle);
    $("#content").val(postContent);
    if (postStatus == 'true') {
        $('input:radio[name="postStatus"][value="true"]').prop('checked', true);
    }
    if (postStatus == 'false') {
        $('input:radio[name="postStatus"][value="false"]').prop('checked', true);
    }
}

function updatePost() {
    var postIdUpdate = $("#postUpdateId").val();
    var postTitleUpdate = $("#title").val();
    var postContentUpdate = $("#content").val();
    var postStatusUpdate = $("input[name='postStatus']:checked").val();

    $.ajax({
        type: "POST",
        url: "/api/admin/update-post",
        dataType: "text",
        data: {
            "postIdUpdate": postIdUpdate,
            "postTitleUpdate": postTitleUpdate,
            "postContentUpdate": postContentUpdate,
            "postStatusUpdate": postStatusUpdate
        },
        success: function (data) {
            swal("Xong", data, "success");
            $('#modal-update-post').modal('hide');
            getAllPost();
        },
        error: function (jqXHR) {
            swal("Lỗi", jqXHR.responseText, "warning");
            $('#modal-update-post').modal('hide');
            getAllPost();
        }
    });
}
