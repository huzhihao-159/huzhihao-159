$(function () {
    //获取ct_left ul
    var ctLeft_ul = $(".ct_left>ul:first");
    //获取ul中的li及其高度；
    var ctLeft_li = $(".ct_left>ul>li");
    var liHeight = ctLeft_li.height();
    var currY = 0;
    var startY = 0;
    var moveY = 0;
    var flag = true;
    ctLeft_li.click(function () {
        //当前li添加active
        if (flag) {
            flag = false;
            var moveY = $(this).offset().top;
            currY = currY + moveY - liHeight;
            $(this).addClass("active").siblings("li").removeClass("active");
            ctLeft_ul.animate({ "top": -currY },
                1000,
                "ease-in-out",
                function () {
                    flag = true;
                    console.log(currY);

                })
        }
    })
    ctLeft_ul.on("touchstart",function(e) {
         startY=e.targetTouches[0].clientX;
    })
    ctLeft_ul.on("touchmove",function(e) {
         moveY=e.targetTouches[0].clientX;
        
    })
    ctLeft_ul.on("swipeTop", function () {
        currY=currY+ startY- moveY;
        $(this).animate({ "top": -currY },
        1000,
        "ease-in-out",
        function () {
            flag = true;
            console.log(currY);

        })
    })

})