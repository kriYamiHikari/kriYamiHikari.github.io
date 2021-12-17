function main() {
    setInterval(hiddenAnimation,5)
    setInterval(loop,8)
    let topPosition,getMinScrollHeight,getWindowHeight=0
    let scrollBarExists=false

    let mainBarItem=document.getElementById('mainBarContainerBox')
    let barIsHidden=false

    function loop(){
        //如果浏览器窗口的高度小于滚动条出现的最小高度则必定会出现滚动条
        //即滚动条存在 反之滚动条不存在
        if (getWindowHeight<getMinScrollHeight){
            scrollBarExists=true //滚动条存在
        }else{
            scrollBarExists=false //滚动条不存在
        }

        topPosition=Math.abs(document.body.getBoundingClientRect().top)

        getMinScrollHeight=document.body.scrollHeight //获取出现滑动条时的最小窗口高度
        getWindowHeight=window.innerHeight //获取浏览器窗口高度
    }

    //滚动页面时判断是向上还是向下 做出相应动画修改
    window.onscroll=function () {
        let b=Math.abs(document.body.getBoundingClientRect().top)
        if (scrollBarExists===true){ //如果滚动条存在时才执行隐藏动画
            if (b-topPosition<0){ //鼠标向上滚动
                barIsHidden=false
            }
            if (b-topPosition>0){ //鼠标向下滚动
                if (topPosition>20){ //页面要向下到一定程度才会隐藏
                    barIsHidden=true
                }
            }
        }
    }

    function hiddenAnimation() {
        if (barIsHidden===true){
            if (mainBarItem.offsetTop>-100){
                mainBarItem.style.top=Number(mainBarItem.offsetTop-2).toString()+"px"
            }
        }else {
            if (mainBarItem.offsetTop<0){
                mainBarItem.style.top=Number(mainBarItem.offsetTop+2).toString()+"px"
            }
        }
    }
}
main()
