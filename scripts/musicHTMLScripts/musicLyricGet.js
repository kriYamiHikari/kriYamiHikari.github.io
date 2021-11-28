function main() {
    let xmlHttpLyric=new XMLHttpRequest()
    let xmlHttpMusicInfo=new XMLHttpRequest()

    //调用元素
    let musicLyricOriginText=document.getElementById('musicLyricOriginText')
    let musicLyricMainText=document.getElementById('musicLyricMainText')
    let musicBodyMusicControlBar=document.getElementById('musicBodyMusicControlBar')

    let timeText,text="" //时间线文本 歌词原文本
    let lineLyricText=""
    let cutLine,cutLineLyric,cutLineTime="" //分割歌词为一行行 行中分割歌词单字 行中分割单字对应时间
    let i,c,n,timeDiff,nextWordTime=0 //最大行 当前行 当前字 下个字与上个字的时间相差值
    let nextRealTime,wordRender=0
    let playing=false
    let t=-1

    let delayTimeScroll=0 //延迟执行
    let isPositionEnd=false,isAutoScroll=false,disableAutoScroll=false

    let nowLyricLineTopPosition,lyricLineScrollOffset=0
    let newTimeLine,newTextLine,mergeLine,newLine="" //转为div元素 新时间行 新歌词行 合并再次替换部分内容 完整行

    let lyricTextNormal="color:white;opacity: 93%;cursor: pointer" //默认字体颜色
    let color=[252,254,116] //着色歌词字体颜色
    let colorText="rgb("+color[0]+","+color[1]+","+color[2]+")"
    let lyricTextRender="color:"+colorText+";opacity: 93%;cursor: pointer"

    xmlHttpLyric.onreadystatechange=function () { //获取歌词源文件
        if (this.readyState===4 && this.status===200){
            text=this.responseText
            setInterval(timeTextFix,1) //获取播放时间 转换文本格式
            setInterval(setFontColor,30) //实时修改字体颜色

            setInterval(getLyricColumn,1) //获取歌词所在行

            setInterval(realTimeDiff,1) //实时获取字相差时间

            setInterval(compare,40)
            setInterval(resetLyricContainerHeight,40)//歌词框高度自适应
            setInterval(delaySecond,1000) //定时器
            setInterval(scrollAnimation,10)

            initLyricText() //初始化歌词文本 载入到页面
            tapJumpColumn() //点击某行歌词 时间跳转到对应行首字开始播放
            xmlHttpMusicInfo.open("get","info.xml",true)
            xmlHttpMusicInfo.send()
        }
    }
    xmlHttpLyric.open("get","lyric.lrc",true)
    xmlHttpLyric.send()

    xmlHttpMusicInfo.onreadystatechange=function () { //修改页面说明 修改歌词时间偏移
        if (this.readyState===4 && this.status===200){
            let xml=this.responseXML

            let musicTitle=document.getElementById('musicIndexTextTitle')
            let musicArtist=document.getElementById('musicIndexTextArtist')
            let musicInfo=document.getElementById('musicIndexTextInfo')

            musicTitle.innerHTML=xml.getElementsByTagName("title")[0].childNodes[0].nodeValue
            musicArtist.innerHTML=xml.getElementsByTagName("artist")[0].childNodes[0].nodeValue
            musicInfo.innerHTML=xml.getElementsByTagName("text")[0].childNodes[0].nodeValue
            offsetTime=Number(xml.getElementsByTagName("offset")[0].childNodes[0].nodeValue)
            document.title=xml.getElementsByTagName("artist")[0].childNodes[0].nodeValue+" - "+xml.getElementsByTagName("title")[0].childNodes[0].nodeValue
        }
    }

    function timeTextFix() { //获取歌曲播放时间并转换格式供正则表达式匹配事件
        timeText=musicTimeMinuteText+":"+musicTimeSecondText.replace(".","\\.")
        showDebug()
    }
    function delaySecond() {
        delayTimeScroll++
        if (delayTimeScroll>=5){
            disableAutoScroll=false
        }
    }
    function showDebug() {
        if (document.getElementById('debugTextContainer').style.display==="block"){
            debug()
        }
        document.getElementById('subText').onclick=function () {
            if (document.getElementById('debugTextContainer').style.display==="none"){
                document.getElementById('debugTextContainer').style.display="block"
            }else{
                document.getElementById('debugTextContainer').style.display="none"
            }
        }
    }
    function realTimeDiff() {
        nextRealTime=Number(nextWordTime-newTimeWithOffset).toFixed(2)
        let wordRenderS=0
        if (nextRealTime>0){
            wordRenderS=nextRealTime/timeDiff.toFixed(2)*100
        }
        wordRender=Number(100-wordRenderS).toFixed(0)
    }
    function initLyricText(){ //初始化歌词文件加载到页面
        lineLyricText=text.replace(/\[.*/g,"<div>"+"$&"+"</div>") //将原歌词分割成行
        musicLyricOriginText.innerHTML=lineLyricText //写入行歌词到一个隐藏的元素用于比对
        document.getElementsByClassName('musicBodyRemindText')[0].innerHTML="点击播放按钮播放<br>点击歌词可跳转进度"

        for (i=0;i<musicLyricOriginText.getElementsByTagName("div").length;i++){
            cutLine=musicLyricOriginText.getElementsByTagName("div")[i].innerHTML.replace(/[0-9].*?\[/g,"<div>"+"$&"+"</div>")
            cutLineLyric=cutLine.replace(/[0-9].*?]|\[/g,"").replace(/<div>/g,"<div style='"+lyricTextNormal+"'>")
            cutLineTime=cutLine.replace(/].*?\[|\[|]/g,"").replace(/<div>|<\/div>/g,"").replace(/[0-9][0-9].*?\.[0-9][0-9]/g,"<div>"+"$&"+"</div>")

            newTimeLine=cutLineTime.replace(/.*<\/div>/g,"<div class='newTimeLine'>"+"$&"+"</div>") //时间行初始样式 隐藏 布局一定要是flex
            newTextLine=cutLineLyric.replace(/.*<\/div>/g,"<div class='newTextLine'>"+"$&"+"</div>") //歌词初始样式 布局一定要是flex
            mergeLine=newTimeLine+newTextLine
            newLine=mergeLine.replace(/.*<\/div>/g,"<div class='newLine'>"+"$&"+"</div>")

            musicLyricMainText.innerHTML+=newLine
        }
    }
    function getLyricColumn() { //获取歌词当前所在行
        for (i=0;i<musicLyricOriginText.getElementsByTagName("div").length;i++){
            if (musicLyricOriginText.getElementsByTagName("div")[i].innerHTML.match(timeText)!==null){
                c=i
                getLyricNumber()
            }
        }
    }
    function getLyricNumber() { //获取歌词当前的单个字所在点
        for (let b=0;b<musicLyricMainText.children[c].children[1].children.length;b++){
            if (musicLyricMainText.children[c].children[0].children[b].innerHTML.match(timeText)!=null){
                n=b
                timeDifference()
            }
        }
    }
    function setFontColor() { //设置歌词字体颜色
        if (playing===true){
            try{
                musicLyricMainText.children[c].children[1].getElementsByTagName("div")[n].setAttribute('style',"background: -webkit-linear-gradient(left,"+colorText+" "+wordRender+"%,white 0%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;-webkit-text-stroke-width: 0.56px;-webkit-text-stroke-color: rgba(255,255,255,0.1);cursor: pointer")
                try{
                    for (let q=0;q<=n-1;q++){
                        //musicLyricMainText.children[c].children[1].getElementsByTagName("div")[q].setAttribute('style',"background: -webkit-linear-gradient(left,#bcfe74 "+100+"%,white 0%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;-webkit-text-stroke-width: 0.56px;-webkit-text-stroke-color: rgba(255,255,255,0.1);cursor: pointer")
                        musicLyricMainText.children[c].children[1].getElementsByTagName("div")[q].setAttribute('style',lyricTextRender)
                    }
                }catch (e) {

                }
            }catch (e) {

            }
        }
    }
    function restoreLyricFontColor(){
        //修改已播放的行为白色
        for (let b=0;b<c;b++){
            for (let q=0;q<musicLyricMainText.children[b].children[1].children.length;q++){
                musicLyricMainText.children[b].children[1].getElementsByTagName("div")[q].setAttribute('style',lyricTextNormal)
            }
        }
        //修改未播放的行为白色
        for (let b=c+1;b<i;b++){
            for (let q=0;q<musicLyricMainText.children[b].children[1].children.length;q++){
                musicLyricMainText.children[b].children[1].getElementsByTagName("div")[q].setAttribute('style',lyricTextNormal)
            }
        }
    }
    function debug(){
        //debug文本 调试用

        document.getElementById('debugTextContainer').style.top=Number(window.innerHeight-500)+"px"

        //歌词时间偏移
        document.getElementById('lyricTimeOffset').innerHTML=offsetTime+"s"
        //歌词最大行
        document.getElementById('maxLyricColumn').innerHTML=i
        //当前所在行
        document.getElementById('nowLyricColumn').innerHTML="(数组序号)"+c+" 第"+Number(c+1)+"行"
        //当前歌词文本
        try {
            document.getElementById('nowLyricText').innerHTML=musicLyricMainText.children[c].children[1].innerHTML
        }catch (e) {
            document.getElementById('nowLyricText').innerHTML="null"
        }
        //当前行最大字数
        try {
            document.getElementById('nowLyricColumnMaxWordAmount').innerHTML=musicLyricMainText.children[c].children[1].children.length.toString()
        }catch (e) {
            document.getElementById('nowLyricColumnMaxWordAmount').innerHTML="null"
        }
        //当前所在字 字的数组序号
        try{
            document.getElementById('nowLyricWordText').innerHTML=musicLyricMainText.children[c].children[1].getElementsByTagName("div")[n].innerHTML +" (数组序号)"+n +" 第"+Number(n+1)+"字"
        }catch (e) {
            document.getElementById('nowLyricWordText').innerHTML="null"
        }
        //当前字出现时间
        try {
            document.getElementById('nowLyricWordTime').innerHTML=musicLyricMainText.children[c].children[0].getElementsByTagName("div")[n].innerHTML
        }catch (e) {
            document.getElementById('nowLyricWordTime').innerHTML="null"
        }
        //获取下个字
        try {
            document.getElementById('nextLyricWord').innerHTML=musicLyricMainText.children[c].children[1].getElementsByTagName("div")[n+1].innerHTML
        }catch (e) {
            document.getElementById('nextLyricWord').innerHTML="null"
        }
        //下个字出现时间
        try {
            document.getElementById('nextLyricWordTime').innerHTML=musicLyricMainText.children[c].children[0].getElementsByTagName("div")[n+1].innerHTML
        }catch (e) {
            document.getElementById('nextLyricWordTime').innerHTML="null"
        }
        //下个字与上个字相差时间
        try{
            document.getElementById('lyricWordTimeDifference').innerHTML=timeDiff.toFixed(2).toString()+"s"
        }catch (e) {
            document.getElementById('lyricWordTimeDifference').innerHTML="null"
        }
        //下个字与上个字相差时间(实时)
        try {
            document.getElementById('lyricWordTimeDiffReal').innerHTML=nextRealTime.toString()+" "+wordRender
        }catch (e) {
            document.getElementById('lyricWordTimeDiffReal').innerHTML="null"
        }
        //当前行div所在Y坐标(容器内)
        try{
            document.getElementById('nowLyricLinePosition').innerHTML=nowLyricLineTopPosition + " "+lyricLineScrollOffset
        }catch (e) {
            document.getElementById('nowLyricLinePosition').innerHTML="null"
        }
        //当前歌词框滚动条所在坐标
        try {
            document.getElementById('nowLyricContainerScrollContainer').innerHTML=musicLyricMainText.scrollTop.toString()
        }catch (e) {
            document.getElementById('nowLyricContainerScrollContainer').innerHTML="null"
        }
        //当前歌词框容器最大高度
        try {
            document.getElementById('nowLyricContainerMaxHeight').innerHTML=musicLyricMainText.getBoundingClientRect().height.toString()
        }catch (e) {
            document.getElementById('nowLyricContainerMaxHeight').innerHTML="null"
        }
        //计时器（用于复原自动滚动歌词）
        try{
            document.getElementById('delayTimeScrollNow').innerHTML=delayTimeScroll.toString()
        }catch (e) {
            document.getElementById('delayTimeScrollNow').innerHTML="null"
        }
        //是否正在播放
        try {
            document.getElementById('isPlaying').innerHTML=playing
        }catch (e) {
            document.getElementById('isPlaying').innerHTML="null"
        }
        //是否禁止自动滚动
        try{
            document.getElementById('isDisableAutoScroll').innerHTML=disableAutoScroll
        }catch (e) {
            document.getElementById('isDisableAutoScroll').innerHTML="null"
        }
        //是否正在自动滚动
        try{
            document.getElementById('isAutoScroll').innerHTML=isAutoScroll
        }catch (e) {
            document.getElementById('isAutoScroll').innerHTML="null"
        }
    }
    musicBodyMusicControlBar.getElementsByTagName("audio")[0].onplaying=function () {
        playing=true
    }
    musicBodyMusicControlBar.getElementsByTagName("audio")[0].onpause=function () {
        playing=false
    }
    //检测跳转事件 如果跳转音频播放点则刷新全部歌词为默认样式
    musicBodyMusicControlBar.getElementsByTagName("audio")[0].onseeked=function(){
        n=0
        for (let b=0;b<i;b++){
            for (let q=0;q<musicLyricMainText.children[b].children[1].children.length;q++){
                musicLyricMainText.children[b].children[1].getElementsByTagName("div")[q].setAttribute('style',lyricTextNormal)
            }
        }
        disableAutoScroll=false //如果跳转解除禁用自动滚动
    }
    //歌词播放完毕后刷新全部歌词为默认样式
    musicBodyMusicControlBar.getElementsByTagName("audio")[0].onended=function () {
        playing=false
        for (let b=0;b<i;b++){
            for (let q=0;q<musicLyricMainText.children[b].children[1].children.length;q++){
                musicLyricMainText.children[b].children[1].getElementsByTagName("div")[q].setAttribute('style',lyricTextNormal)
            }
        }
    }
    //点击某行歌词 时间跳转到对应行首字开始播放
    function tapJumpColumn() {
        for (let b=0;b<i;b++){
            let firstTimeText=musicLyricMainText.children[b].children[0].getElementsByTagName("div")[0].innerHTML
            let firstTimeS=Number(firstTimeText.split(":")[1])
            let firstTimeM=Number(firstTimeText.split(":")[0])
            let firstTime=firstTimeM*60+firstTimeS
            for (let q=0;q<musicLyricMainText.children[b].children[1].children.length;q++){
                musicLyricMainText.children[b].children[1].getElementsByTagName("div")[q].onclick=function () {
                    musicBodyMusicControlBar.getElementsByTagName("audio")[0].currentTime=firstTime
                    musicBodyMusicControlBar.getElementsByTagName("audio")[0].play().then()
                    disableAutoScroll=false //在自动滚动禁用期间如果点击歌词导致跳转则直接解开滚动禁用
                }
            }
        }
    }
    //计算下个字与上个字相差时间
    function timeDifference() {
        let nowWordTimeText=musicLyricMainText.children[c].children[0].getElementsByTagName("div")[n].innerHTML
        let nextWordTimeText=musicLyricMainText.children[c].children[0].getElementsByTagName("div")[n+1].innerHTML

        let nowWordTimeS=Number(nowWordTimeText.split(":")[1])
        let nowWordTimeM=Number(nowWordTimeText.split(":")[0])
        let nowWordTime=nowWordTimeM*60+nowWordTimeS

        let nextWordTimeS=Number(nextWordTimeText.split(":")[1])
        let nextWordTimeM=Number(nextWordTimeText.split(":")[0])
        nextWordTime=nextWordTimeM*60+nextWordTimeS

        timeDiff=nextWordTime-nowWordTime
    }

    function divPosition() { //获取居中位置
        try{
            nowLyricLineTopPosition=musicLyricMainText.children[c].offsetTop
            lyricLineScrollOffset=nowLyricLineTopPosition-134-Number(musicLyricMainText.getBoundingClientRect().height/2).toFixed(0)+27
            //musicLyricMainText.scrollTo(0,lyricLineScrollOffset)
        }catch (e) {

        }
    }
    window.onresize=function(){ //如果改变了浏览器的窗口大小 重新计算中心坐标并允许自动滚动
        divPosition()
        disableAutoScroll=false
    }

    function resetLyricContainerHeight() { //歌词框高度自适应
        let height=window.innerHeight-522-62-20
        musicLyricMainText.style.height=height.toString()+"px"
        divPosition()
    }

    function compare() { //如果当前行发生改变
        if (t!==c){
            t=c
            restoreLyricFontColor()
            divPosition()
        }
    }
    function scrollAnimation() { //自动滚动 动画效果
        //判断滚动条是否到了最底处
        if (musicLyricMainText.scrollTop===musicLyricMainText.scrollHeight-musicLyricMainText.getBoundingClientRect().height){
            isPositionEnd=true
        }else {
            isPositionEnd=false
        }

        if (disableAutoScroll===false){ //如果没有禁止自动滚动
            if (lyricLineScrollOffset<0 && musicLyricMainText.scrollTop!==0){ //特殊情况 如果居中值是负数则直接滚动到首
                let number2=Math.ceil(musicLyricMainText.scrollTop/0.3/1000*10)
                musicLyricMainText.scrollBy(0,-number2)
                isAutoScroll=true
            }else if (musicLyricMainText.scrollTop<lyricLineScrollOffset && lyricLineScrollOffset>0 && isPositionEnd===false){ //歌词向下滚动 特殊情况 如果到底不继续向下滚动
                let number1=lyricLineScrollOffset-musicLyricMainText.scrollTop
                let number2=Math.ceil(number1/0.3/1000*10)
                musicLyricMainText.scrollBy(0,number2)
                isAutoScroll=true
            }else if (musicLyricMainText.scrollTop>lyricLineScrollOffset && lyricLineScrollOffset>0){ //歌词向上滚动
                let number1=musicLyricMainText.scrollTop-lyricLineScrollOffset
                let number2=Math.ceil(number1/0.3/1000*10)
                musicLyricMainText.scrollBy(0,-number2)
                isAutoScroll=true
            }else{ //如果以上条件都不成立则判断自动滚动结束
                isAutoScroll=false
            }
        }
    }
    musicLyricMainText.onscroll=function () {
        if (isAutoScroll===false && playing===true){ //如果滚动事件触发时自动滚动不为真则判断为非自动滚动触发的时间
            delayTimeScroll=0 //计时器归零 在上面有指定过几秒后恢复自动滚动
            disableAutoScroll=true //禁止自动滚动
        }
        if (musicLyricMainText.scrollTop===0){ //如果在最顶部时滚动也直接禁止自动滚动 避免卡死在顶部
            delayTimeScroll=0
            disableAutoScroll=true
        }
    }

}
main()
