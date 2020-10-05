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
    $.ajax({
        type: "GET",
        url: "/api/public/post/getAll",
        dataType: "json",
        success: function (data) {
            var postList = data.data;
            var postKeyBenefitList = [];
            var postFeatureList = [];
            for (var index in postList) {
                var post = postList[index];
                if (post.category.id == 2 && post.tag.id == 8 && post.active == true) {
                    createProductOverview(postList[index]);
                }
                if (post.category.id == 2 && post.tag.id == 9 || post.tag.id == 10 || post.tag.id == 11 || post.tag.id == 12 && post.active == true) {
                    postKeyBenefitList.push(post);
                }
                if (post.category.id == 2 && post.tag.id == 13 || post.tag.id == 14 || post.tag.id == 15 && post.active == true) {
                    postFeatureList.push(post);
                }
            }
            createKeyBenefit(postKeyBenefitList);
            createFeature(postFeatureList);
        }
    });
}

// post.imagePostUrl
// post.title
// post.content


function createProductOverview(post) {
    var divProductOverview =
        ' <div class="col-12 col-sm-6 col-md-6 col-lg-6">\n' +
        '                    <h1 class="text-danger">' + post.title + '</h1>\n' +
        '                    <br><br>\n' +
        '                    <span style="margin-top: 21px;">' + post.content + '</span>\n' +
        '                </div>\n' +
        '                <div class="col-12 col-sm-6 col-md-6 col-lg-6" style="text-align: center;">\n' +
        '                    <img src="/staticClient/newlife/images/' + post.imagePostUrl + '"/>\n' +
        '                </div>';
    $("#productOverview").append(divProductOverview);
}

function createKeyBenefit(postKeyList) {
    var divKeyBenefitStr = '';
    for (var i = 0; i < postKeyList.length; i++) {
        var post = postKeyList[i];
        var divElement =
            '<div class="col-md-6 card-fade-in-scroll">\n' +
            '                    <div class="row">\n' +
            '                        <div class="col-md-3" style="text-align: center;">\n' +
            '                            <img src="/api/image/upload/' + post.imagePostUrl + '" atl="slider-image"/>\n' +
            '                        </div>\n' +
            '                        <div class="col-md-9">\n' +
            '                            <h2 style="color: #000000">' + post.title + '</h2>\n' +
            '                            <br>\n' +
            '                            <h6>' + post.content + '</h6>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>';
        divKeyBenefitStr = divKeyBenefitStr + divElement;
    }
    $("#keyBenefit").append(divKeyBenefitStr);
}


function createFeature(postFeatureList) {
    var divFeatureStr = '';
    for (var i = 0; i < postFeatureList.length; i++) {
        var post = postFeatureList[i];
        var divElement =
            '<div class="col-xs-12 col-md-4">\n' +
            '                    <div class="iconbox images card-feature">\n' +
            '                        <div class="div-image">\n' +
            '                            <img src="/api/image/upload/' + post.imagePostUrl + '" alt="icon"\n' +
            '                                 class="img-holder">\n' +
            '                        </div>\n' +
            '                        <div class="box-content div-content-service">\n' +
            '                            <div class="box-title div-title-service">\n' +
            '                                <span>' + post.title + '</span>\n' +
            '                            </div>\n' +
            '                            <p>' + post.content + '</p>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>';
        divFeatureStr = divFeatureStr + divElement;
    }
    $("#featureDiv").append(divFeatureStr);
}
