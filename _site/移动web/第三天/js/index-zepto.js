$(function () {
    //在首尾添加clone;
    //获取jd-banner盒子和他的宽度
    var banner = $(".jd_banner");
    var bannerWidth = banner.width();

    //获取图片盒子
    var imgBox = $(".jd_bannerImg");
    //获取点标记
    var arrow = $(".jd_bannerArrow").find("li")
    arrow.eq(0).addClass("active")
    //获取图片盒子中的首尾图片
    var first = imgBox.find("li:first");
    var last = imgBox.find("li:last");
    //克隆放到首尾
    imgBox.append(first.clone());
    last.clone().insertBefore(first);
    //获取图片的个数
    var count = imgBox.find("li").length;
    //给图片盒子和其中的li设置宽度;
    imgBox.width(count * bannerWidth);
    imgBox.find("li").width(bannerWidth);
    //图片冲第一张开始
    var index = 1;
    //图片盒子向左位移一个盒子宽度
    imgBox.css("left", -index * bannerWidth);
    //图片自动轮播
    var imganimate = function () {
        imgBox.animate(
            { "left": -index * bannerWidth },
            200,
            "ease-in-out",
            function () {
                console.log(1);
                
                if (index == count - 1) {
                    index = 1;
                    imgBox.css("left", -index * bannerWidth)
                }
                if (index == 0) {
                    index = count - 2;
                    imgBox.css("left", -index * bannerWidth);
                }
                //改变点标记的位置
                arrow.removeClass("active").eq(index - 1).addClass("active")
            })
    }
    //开启定时器
    var timerID = setInterval(function () {
        index++;
        imganimate();
    }, 2000)
    //添加滑动
    imgBox.on(
        //向左滑动
        'swipeLeft', function () {
            console.log(1);

            clearInterval(timerID);
            index++;
            imganimate();
        })
    imgBox.on(
        //向右滑动
        'swipeRight', function () {
            clearInterval(timerID);
            index--;
            imganimate();
        })


})




