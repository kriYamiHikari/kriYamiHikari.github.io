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
    let t=-1 //用于比较当前行
    let nextRealTime,wordRender=0
    let playing=false
    let newTimeLine,newTextLine,mergeLine,newLine="" //转为div元素 新时间行 新歌词行 合并再次替换部分内容 完整行

    xmlHttpLyric.onreadystatechange=function () { //获取歌词源文件
        if (this.readyState===4 && this.status===200){
            text=this.responseText
            setInterval(timeTextFix,1) //获取播放时间 转换文本格式
            setInterval(getLyricColumn,1) //获取歌词所在行
            setInterval(setFontColor,1) //实时修改字体颜色
            setInterval(realTimeDiff,1) //实时获取字相差时间
            initLyricText() //初始化歌词文本 载入到页面
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
        debug()
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
        //lineLyricText=text.replace(/[0-9][0-9]:[0-9][0-9]\.[0-9][0-9].*?\[/g,"<div>"+"$&"+"</div>")
        musicLyricOriginText.innerHTML=lineLyricText //写入行歌词到一个隐藏的元素用于比对

        for (i=0;i<musicLyricOriginText.getElementsByTagName("div").length;i++){
            cutLine=musicLyricOriginText.getElementsByTagName("div")[i].innerHTML.replace(/[0-9].*?\[/g,"<div>"+"$&"+"</div>")
            cutLineLyric=cutLine.replace(/[0-9].*?]|\[/g,"").replace(/<div>/g,"<div style='opacity: 95%;'>")
            cutLineTime=cutLine.replace(/].*?\[|\[|]/g,"").replace(/<div>|<\/div>/g,"").replace(/[0-9][0-9].*?\.[0-9][0-9]/g,"<div>"+"$&"+"</div>")

            newTimeLine=cutLineTime.replace(/.*<\/div>/g,"<div style='display: none;justify-content: center'>"+"$&"+"</div>")//时间行初始样式 隐藏 布局一定要是flex
            newTextLine=cutLineLyric.replace(/.*<\/div>/g,"<div style='display: flex;justify-content: center'>"+"$&"+"</div>")//歌词初始样式 布局一定要是flex
            mergeLine=newTimeLine+newTextLine
            newLine=mergeLine.replace(/.*<\/div>/g,"<div>"+"$&"+"</div>")

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
                restoreLyricFontColor() //调用还原函数
                timeDifference()
                for (let q=0;q<=n;q++){
                    //musicLyricMainText.children[c].children[1].getElementsByTagName("div")[q].style.color="red"
                    //musicLyricMainText.children[c].children[1].getElementsByTagName("div")[q].style.background="-webkit-linear-gradient(left,red "+wordRender+'%,white 0%)'
                }
            }
        }
    }
    function setFontColor() {
        if (playing===true){
            try{
                musicLyricMainText.children[c].children[1].getElementsByTagName("div")[n].setAttribute('style',"background: -webkit-linear-gradient(left,#bcfe74 "+wordRender+"%,white 0%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;-webkit-text-stroke-width: 0.56px;-webkit-text-stroke-color: rgba(255,255,255,0.1);")
                try{
                    for (let q=0;q<=n-1;q++){
                        musicLyricMainText.children[c].children[1].getElementsByTagName("div")[q].setAttribute('style',"background: -webkit-linear-gradient(left,#bcfe74 "+100+"%,white 0%);-webkit-background-clip: text;-webkit-text-fill-color: transparent;-webkit-text-stroke-width: 0.56px;-webkit-text-stroke-color: rgba(255,255,255,0.1);")
                        //musicLyricMainText.children[c].children[1].getElementsByTagName("div")[q].style.color="red"
                        //musicLyricMainText.children[c].children[1].getElementsByTagName("div")[q].style.background="-webkit-linear-gradient(left,red "+wordRender+'%,white 0%)'
                    }
                }catch (e) {

                }
            }catch (e) {

            }
        }
    }
    function restoreLyricFontColor(){ //如果当前行改变则将当前行歌词之前的歌词全部还原为原始样式
        if (t!==c){
            for (let b=0;b<i;b++){
                if (b!==c){
                    for (let q=0;q<musicLyricMainText.children[b].children[1].children.length;q++){
                        musicLyricMainText.children[b].children[1].getElementsByTagName("div")[q].setAttribute('style',"color:white;opacity: 95%;")
                        //musicLyricMainText.children[b].children[1].getElementsByTagName("div")[q].style.color="white"
                    }
                }
            }
            t=c
        }
    }
    function debug(){
        //debug文本 调试用

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
            let max=musicLyricMainText.children[c].children[0].getElementsByTagName("div").length
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
    }
    musicBodyMusicControlBar.getElementsByTagName("audio")[0].onplaying=function () {
        playing=true
    }
    musicBodyMusicControlBar.getElementsByTagName("audio")[0].onpause=function () {
        playing=false
    }
    musicBodyMusicControlBar.getElementsByTagName("audio")[0].onseeked=function(){ //检测跳转事件 如果跳转音频播放点则刷新全部歌词为默认样式
        for (let b=0;b<i;b++){
            for (let q=0;q<musicLyricMainText.children[b].children[1].children.length;q++){
                musicLyricMainText.children[b].children[1].getElementsByTagName("div")[q].setAttribute('style',"color:white;opacity: 95%")
            }
        }
    }
    musicBodyMusicControlBar.getElementsByTagName("audio")[0].onended=function () { //歌词播放完毕后刷新全部歌词为默认样式
        playing=false
        for (let b=0;b<i;b++){
            for (let q=0;q<musicLyricMainText.children[b].children[1].children.length;q++){
                musicLyricMainText.children[b].children[1].getElementsByTagName("div")[q].setAttribute('style',"color:white;opacity: 95%")
            }
        }
    }
    function timeDifference() { //计算下个字与上个字相差时间
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
}
main()
