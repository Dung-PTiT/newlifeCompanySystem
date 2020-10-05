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
                if (post.category.id == 1 && post.active == true) {
                    postDashboardList.push(post);
                }
            }
            showPostTable(postDashboardList);
        }
    });
}

function showPostTable(postList) {
    var tr_post_table = '<table class="table table-bordered">'
        + '<tr class="bg-light" style="text-align: center;">'
        + '<th><h6>Số</h6></th>'
        + '<th style="display: none">ID</th>'
        + '<th><h6>Thông tin bài viết</h6></th>'
        + '<th><h6>Sửa</h6></th>'
        + '</tr>';
    var stt = 0;
    for (var index in postList) {
        stt++;
        var postStatus = '';
        if (postList[index].active == true) {
            postStatus = '<span class="badge badge-success">Active</span>';
        }
        if (postList[index].active == false) {
            postStatus = '<span class="badge badge-secondary">Inactive</span>';
        }
        var imgName = postList[index].imagePostUrl;
        tr_post_table = tr_post_table +
            '<tr style="text-align: center;" id="' + stt + '">'
            + '<td>' + stt + '</td>'
            + '<td style="display: none">' + postList[index].id + '</td>'
            + '<td style="text-align: center"><h6><span class="text-primary mr-2">Tên ảnh:</span>' + postList[index].imagePostUrl + '</h6>' +
            '<img class="mb-2" src="/api/image/upload/' + imgName + '" width="200" height="200"/>' +
            '<h6><span class="text-primary mr-2">Tiêu đề:</span>' + postList[index].title + '</h6>' +
            '<h6><span class="text-primary mr-2">Nội dung:</span>' + postList[index].content + '</h6>' +
            '<h6><span class="text-primary mr-2">Ngày tạo:</span>' + postList[index].createdDate + ' ---- <span class="text-primary mr-2" >Người tạo:</span>' + postList[index].user.name + '</h6>' +
            '<h6><span class="text-primary mr-2">Ngày sửa gần nhất:</span>' + postList[index].lastModifiedDate + '</h6>' +
            '<h6><span class="text-primary mr-2">Vị trí trong trang:</span>' + postList[index].tag.name + '</h6>' +
            '<h6><span class="text-primary mr-2">Trạng thái:</span>' + postStatus + '</h6></td>'
            + '<td><div class="list-icons">' +
            '<button class="btn-group list-icons-item text-primary-600 bg-white" data-toggle="tooltip" title="Sửa" onclick="edit_post(\'' + postList[index].id + '\',\'' + postList[index].title + '\',\'' + postList[index].content + '\')" style="border: none"><i class="icon-pencil7"></i></button>\n' +
            // '<button class="btn-group list-icons-item text-danger-600 bg-white" data-toggle="tooltip" title="Xóa" onclick="delete_post(' + postList[index].id + ')"  style="border: none"><i class="icon-trash"></i></button>\n' +
            '</div></td>';
    }
    tr_post_table = tr_post_table + '</table>';
    $("#postTable").append(tr_post_table);

}
