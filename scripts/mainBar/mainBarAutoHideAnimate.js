setInterval(main,8)
let abc=true
function main() {
    let t=document.documentElement.scrollTop||document.body.scrollTop
    let backGroundItem=document.getElementById('backGroundContainerBox')
    let topPosition=backGroundItem.getBoundingClientRect().top-document.documentElement.clientTop||document.body.clientTop

    let getMinScrollHeight=document.documentElement.scrollHeight||document.body.scrollHeight //获取出现滑动条时的最小窗口高度
    let getWindowHeight=window.innerHeight //获取浏览器窗口高度
    let scrollBarExists=false

    let mainBarItem=document.getElementById('mainBarContainerBox')

    //如果浏览器窗口的高度小于滚动条出现的最小高度则必定会出现滚动条
    //即滚动条存在 反之滚动条不存在
    if (getWindowHeight<getMinScrollHeight){
        scrollBarExists=true //滚动条存在
    }else{
        scrollBarExists=false //滚动条不存在
    }

    //滚动页面时判断是向上还是向下 做出相应动画修改
    window.onscroll=function () {
        let b=document.documentElement.scrollTop||document.body.scrollTop
        if (scrollBarExists===true){ //如果滚动条存在时才执行隐藏动画
            if (b-t<0){ //鼠标向上滚动
                if (mainBarItem.className!=="mainBarContainer"){ //如果标题条不是默认css
                    if (abc===true){
                        mainBarItem.className="mainBarContainerStart"
                        abc=false
                        setTimeout(go,300)
                    }
                }
            }else if (b-t>0){ //鼠标向下滚动
                if (topPosition<50){ //页面要向下到一定程度才会隐藏
                    if (abc===true){
                        mainBarItem.className="mainBarContainerExit"
                        abc=false
                        setTimeout(go,300)
                    }
                }
            }
        }
    }
    if (scrollBarExists===false){ //如果滚动条不存在或其他情况则强制保持显示 并保持动画允许播放
        mainBarItem.className="mainBarContainer"
        abc=true
    }
}
function go() { //允许动画播放
    abc=true
}