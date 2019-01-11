function tap(dom,callback) {
    if(typeof dom!="object") {
        return;
    }
    dom.addEventListener("touchstart", function (e) {
        if (e.targetTouches.length > 1) {
            return;
        }
        startTime = new Date();
        startX = e.targetTouches[0].clientX;
        startY = e.targetTouches[0].clientY;
    })
    dom.addEventListener("touchend", function (e) {
        var currX=e.changedTouches[0].clientX;
        var currY=e.changedTouches[0].clientY;
        var currTime=new Date();
        if (e.changedTouches.length > 1|| currTime-startTime>300) {
            return;
        }
        if(Math.abs(currX-startX)<6&&Math.abs(currY-startY)<6) {
            callback(e);  
        }
    })
}