$(function () {

    //找到所有item类
    var bannerItem = $(".carousel-inner").find(".item");
    var lis = $(".wjs_nav").find("li");
    //页面设置resize事件
    $(window).resize(function () {
        //获取window高度
        var width = $(this).width();
        //循环遍历item  
        if (width < 768) {
            bannerItem.each(function (index, value) {
                //页面小768px
                //获取768以下的页面图片地址
                var smallImg = $(this).data("smallImages");
                //动态添加图片
                $(this).html('<a href="javascript:;" class="mobileImg"><img src="' + smallImg + '" alt=""></a>')
            })
        } else {
            //li a 变回初始的值
            lis.css("margin-right", "0px");
            $(".nav>li>a").css("padding", "15px 15px")
            bannerItem.each(function (index, value) {
                //页面小768px
                var largeImg = $(this).data("largeImages");
                $(this).html('<a href="javascript:;" class="pcImg" style="background:url(' + largeImg + ') center center; background-size:cover " ></a>')
            })
        }
        if (width > 768 && width < 992) {
            //改变 li a 的样式使得在768-992能显示li
            lis.css("margin-right", "10px");
            $(".nav>li>a").css("padding", "15px 0")
        }
        var tabLi = $(".wjs_navTabs").find("li");
        var ulTotalWidth = 0;
        tabLi.each(function (index, value) {
            ulTotalWidth += $(this).outerWidth(true);
        })
        $(".wjs_navTabs").find("ul").width(ulTotalWidth);
    }).trigger("resize");

    //自调用下resize使得打开页面页进行判断宽度

    //手机端能进行触控
    var startX = 0, endX = 0;
    // 获取wjs_banner盒子
    var wjsBanner = document.querySelector(".wjs_banner");
    //为banner盒子添加触摸开始和结束事件
    wjsBanner.addEventListener("touchstart", function (e) {
        startX = e.targetTouches[0].clientX;
    })
    wjsBanner.addEventListener("touchend", function (e) {
        //touchend中只能用e.changedTouches
        endX = e.changedTouches[0].clientX;
        if (endX > startX) {
            //往左滑动
            $(".carousel").carousel('prev');
        } else if (endX < startX) {
            //往右滑动
            $(".carousel").carousel('next');
        }
    })
    //产品快标签手机端滑动
    //计算导航栏ul的宽度

    //工具栏提示初始化
    $('[data-toggle="tooltip"]').tooltip();
    //iscroll初始化
    var myScroll = new IScroll('.wjs_navTabs', {
        /*设置水平滑动，不允许垂直滑动*/
        scrollX: true, scrollY: false
    });
})  