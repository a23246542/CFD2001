(function ($) {
    function scrollTop() {
        $(function () {
            // scroll body to 0px on click
            $('#scroll-toparr').click(function () {
                $('body,html').animate({
                    scrollTop: 0
                }, 800);
                return false;
            });

        });

    }

    function showMenu() {
        $(function () {//??写这个的必要性

            $(window).scroll(function () {
                if ($(this).scrollTop() > 500) {
                    $('.pcst-megamenu').addClass('active');
                    $('.mobilest-megamenu').addClass('active');
                    // $("#megamenu-show").fadeOut();
                } else {
                    $('.pcst-megamenu').removeClass('active');
                    $('.mobilest-megamenu').removeClass('active');
                    // $("#megamenu-show").fadeIn();
                }
            });


        });
    }

    /* ----------------------------------------------- */
    /* ----------------------------------------------- */
    /* OnLoad Page */
    $(document).ready(function ($) {
        scrollTop(); //往上滑 手机版才有??
        showMenu(); //上面白色选单
        getNumberOfNewMessages();//通知数量
        appendQueryStringToElements();//更换template连结网址
    });

    /* OnLoad Window */
    var init = function () {};
    window.onload = init;

    // 用户的通知数量
    function getNumberOfNewMessages() {
        $.getJSON(api_url + "/public/message/getNumberOfNewMessages", function (response) {
            var number = response.result;
            if (number != 0) {
                if (number > 9) {
                    $('.bell i').html('N');
                } else {
                    $('.bell i').html(number);
                }

            } else {
                $('.bell').hide();
            }
        });
    }

    // 传入原本html页面的url 跟 ?后面的东西
    // return  url+?+ 现在网址问号后面的东西
    function appendQueryString(url, queryString) {
        // 如果url为空就直接回传 有#就做处理
        if (url == null || url == '#' || url.startsWith("javascript")) {
            return url;
        }

        var hash = "";
        // 如果template网址存在#
        if (url.indexOf("#") !== -1) {
            hash = url.substring(url.indexOf('#'));//#后面的部份
            url = url.substring(0, url.indexOf('#'));//#前面的部份
        }
        // #前面的部份?不存在 就等于? 不然等于&
        var separator = (url.indexOf("?") === -1) ? "?" : "&";
        return url + separator + queryString + hash;
    }

    // 看有没有问号后面的东西 有就取得代入a
    function appendQueryStringToElements() {
        if (location.href.indexOf('?') === -1) {//先看有没有?
            return;
        }

        // 取得?后面的内容
        var queryString = location.search.slice(location.search.indexOf('?') + 1);
        if (!queryString) {
            return;
        }

        $("a").each(function () {
            var that = this;
            var old = $(that).attr("href");
            $(that).attr("href", appendQueryString(old, queryString));
        });

    }


})(jQuery);