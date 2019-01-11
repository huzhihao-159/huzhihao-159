window.onload = function () {
    timeBack();
    bannerimg();
    jd_searchMove();

}
function jd_searchMove() {
    //首先获取banner盒子高度
    var jd_banner = document.querySelector(".jd_banner");
    var jd_bannerHeight = jd_banner.offsetHeight;
    var jd_search = document.querySelector(".jd_search")
    var scrollTopGet = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTopGet > jd_bannerHeight - jd_search.offsetHeight) {
        jd_search.style.backgroundColor = "rgba(234, 35, 34,1)";
    } else {
        window.scroll();

    }
    //触发scrool事件
    window.onscroll = function () {
        //获取页面滚动的scrollTop
        var scrollTopGet = document.documentElement.scrollTop || document.body.scrollTop;
        var opacity = 0;
        if (scrollTopGet <= jd_bannerHeight) {
            opacity = scrollTopGet / jd_bannerHeight;
            jd_search.style.backgroundColor = "rgba(234, 35, 34," + opacity + ")";
        }
    }
}
function timeBack() {
    var jd_sk_time = document.querySelector(".jd_sk_time");
    var span = jd_sk_time.children;
    var timeleft = 4000 /*以秒为单位*/
    var timer = setInterval(function () {
        timeleft--;
        if (timeleft < 0) {
            clearInterval(timer)
        }
        var hour = Math.floor(timeleft / 3600);
        var minute = Math.floor(timeleft % 3600 / 60);
        var second = Math.floor(timeleft % 3600 % 60);
        span[0].innerHTML = Math.floor(hour / 10);
        span[1].innerHTML = Math.floor(hour % 10);
        span[3].innerHTML = Math.floor(minute / 10);
        span[4].innerHTML = Math.floor(minute % 10);
        span[6].innerHTML = Math.floor(second / 10);
        span[7].innerHTML = Math.floor(second % 10);
    }, 1000)
}
function bannerimg() {
    var jd_banner = document.querySelector(".jd_banner");
    var jd_bannerImg = document.querySelector('.jd_bannerImg');
    var firstImage = jd_bannerImg.querySelector('li:first-of-type');
    var lastImage = jd_bannerImg.querySelector('li:last-of-type');
    jd_bannerImg.appendChild(firstImage.cloneNode(true));
    jd_bannerImg.insertBefore(lastImage.cloneNode(true), jd_bannerImg.firstChild);
    //获取bannerimg中li的个数
    var count = jd_bannerImg.children.length;
    //获取图片宽度值
    var imgWidth = jd_banner.offsetWidth;
    jd_bannerImg.style.width = count * imgWidth + 'px';
    for (let i = 0; i < count; i++) {
        jd_bannerImg.children[i].style.width = imgWidth + 'px';
    }
    jd_bannerImg.style.left = -imgWidth + 'px';
    //当屏幕改变时
    //默认冲第一张图片（索引1）开始
    var index = 1;
    window.onresize = function () {
        imgWidth = jd_banner.offsetWidth;
        jd_bannerImg.style.width = count * imgWidth + 'px';
        for (let i = 0; i < count; i++) {
            jd_bannerImg.children[i].style.width = imgWidth + 'px';
        }
        jd_bannerImg.style.transition = 'none';
        jd_bannerImg.style.left = -index * imgWidth + 'px';

    }
    //白点移动
    function arrowMove(index) {
        for (let i = 0; i < jd_bannerArrow.children.length; i++) {
            jd_bannerArrow.children[i].classList.remove("active");
        }
        jd_bannerArrow.children[index - 1].classList.add("active");
    }
    //实现自动偏移
    var timer = null;
    var jd_bannerArrow = document.querySelector(".jd_bannerArrow");
    function autoMove() {
        timer = setInterval(function () {
            index++;
            jd_bannerImg.style.transition = 'left 0.5s linear'
            jd_bannerImg.style.left = -index * imgWidth + 'px';
            if (index === count - 1) {
                //等上面过度的0.5秒延迟
                setTimeout(function () {
                    index = 1;
                    jd_bannerImg.style.transition = 'none';
                    jd_bannerImg.style.left = -index * imgWidth + 'px';
                    arrowMove(index);
                }, 500)
            }
        }, 2000)
    }
    autoMove();
    //实现手动偏移
    var startX, moveX, distanceX;
    jd_bannerImg.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startX = e.targetTouches[0].clientX;
        currX = e.target.offsetLeft;
    })
    var flag = true;
    jd_bannerImg.addEventListener("touchmove", function (e) {
        if (flag) {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            jd_bannerImg.style.transition = 'none';
            jd_bannerImg.style.left = -index * imgWidth + distanceX + "px";
        }
    })
    jd_bannerImg.addEventListener("touchend", function () {
        flag = false;
        if (Math.abs(distanceX) > 100) {
            if (distanceX > 0) {
                index--;
                jd_bannerImg.style.transition = 'left 0.5s linear';
                jd_bannerImg.style.left = -index * imgWidth + "px";
                autoMove();
            } else {
                index++;
                jd_bannerImg.style.transition = 'left 0.5s linear';
                jd_bannerImg.style.left = -index * imgWidth + "px";
                autoMove();
            }
        } else if (Math.abs(distanceX) > 0) {
            jd_bannerImg.style.transition = 'left 0.5s linear';
            jd_bannerImg.style.left = -index * imgWidth + "px";
            autoMove();
        }
        moveX = 0;
        startX = 0;
        distanceX = 0;
        clearInterval(timer);
        autoMove();
    })
    jd_bannerImg.addEventListener("webkitTransitionEnd", function () {
        if (index === 0) {
            index = count - 2;
            jd_bannerImg.style.transition = 'none';
            jd_bannerImg.style.left = -index * imgWidth + 'px';         
        }
        else if (index === count - 1) {
            index = 1;
            jd_bannerImg.style.transition = 'none';
            jd_bannerImg.style.left = -index * imgWidth + 'px';
        }
        arrowMove(index);
        setTimeout(function () {
            flag = true;
        }, 500)
    })

}

